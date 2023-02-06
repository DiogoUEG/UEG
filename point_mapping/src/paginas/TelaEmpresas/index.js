import React, { useState, useEffect } from 'react';
import { Platform, Text, View, KeyboardAvoidingView, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import styles from './style';
import * as Location from 'expo-location';
import db from '../../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { EvilIcons } from '@expo/vector-icons'

export default function Empresa({ route, navigation }) {
    const [refreshing, setRefreshing] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [empresa, setEmpresa] = useState(null);
    const [User, setUser] = useState(null);
    const auth = getAuth();
    const days = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"]
    const d = new Date()
    const dayName = days[d.getDay()]
    const useremp = query(collection(db, 'Usuario-Empresa'), where("IdUsuario", "==", User), where("Nome_do_dia", "==", dayName))
    useEffect(() => {

        (async () => {
            CarregarEmpresa();
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLatitude(location.coords.latitude);
            setLongitude(location.coords.longitude);
        })();


    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        CarregarEmpresa();
    }

    function CarregarEmpresa() {
        onSnapshot(useremp, (query) => {
            const list = [];
            query.forEach((doc) => {
                list.push({ ...doc.data(), id: doc.id });
            });
            setEmpresa(list);
        })
        setRefreshing(false);
    }
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user.uid)
        } else {
        }
    });

    async function getDistanceFromLatLonInKm(IdEmpresa) {
        var position2 = { lat: latitude, lng: longitude }
        var p = query(collection(db, 'Empresa'), where("Nome", "==", IdEmpresa))
        const querySnapshot = await getDocs(p);
        var position1
        querySnapshot.forEach((doc) => position1 = doc.data());
        var deg2rad = function (deg) { return deg * (Math.PI / 180); },
            R = 6371,
            dLat = deg2rad(position2.lat - position1.lat),
            dLng = deg2rad(position2.lng - position1.lng),
            a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(deg2rad(position1.lat))
                * Math.cos(deg2rad(position1.lat))
                * Math.sin(dLng / 2) * Math.sin(dLng / 2),
            c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var resultado = (R * c * 1000).toFixed();
        console.log(resultado)
        var resposta;
        if (resultado > 100) {
            resposta = false;
        } else {
            resposta = true;
        }
        return (navigation.navigate("Ponto", { resultado: resposta, lat: position2.lat, lng: position2.lng, empresa: IdEmpresa }));
    }

    let text = '';
    if (errorMsg) {
        text = errorMsg;
    }

    return (
        <View style={styles.container}>
            <View style={styles.Tasks2}>
                <TouchableOpacity style={styles.refreshButton} onPress={() => CarregarEmpresa()}>
                    <EvilIcons name="refresh" color={'black'} size={35} />
                </TouchableOpacity>
                <Text style={styles.refreshButton2}>Agenda do Dia</Text>
            </View>
            <View>
            {text !== ''
                ?
                <View>
                    <MaterialCommunityIcons
                        name={"alert-circle"}
                        size={24}
                        color="#bdbdbd"
                    />
                    <Text style={styles.warningAlert}>{text}</Text>
                </View>
                :
                <View />
            }
            {latitude === null && longitude === null
                ?
                <View style={styles.contentAlert}>
                    <MaterialCommunityIcons
                        name={"alert-circle"}
                        size={24}
                        color="#bdbdbd"
                    />
                    <Text style={styles.warningAlert}>Waiting..</Text>
                </View>
                :
                <View style={styles.flat}>
                    
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        extraData={empresa}
                        showsVerticalScrollIndicator={false}
                        data={empresa}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.Tasks}>
                                    <Text style={styles.DescriptionTask}
                                        onPress={() => getDistanceFromLatLonInKm(item.IdEmpresa)}
                                    > {item.IdEmpresa}
                                    </Text>
                                </View>
                            )
                        }}
                    />
                </View>
            }
            </View>
        </View>
    );
}