import React, { useState, useEffect } from 'react';
import { Platform, Text, View, KeyboardAvoidingView, FlatList } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import styles from './style';
import * as Location from 'expo-location';
import firebase from "../../config/firebase";
import {useNavigation} from '@react-navigation/native';

export default function Local() {
    const [errorMsg, setErrorMsg] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [empresa, setEmpresa] = useState(null);
    const database = firebase.firestore();
    const navigation = useNavigation();

    database.collection('Empresa').onSnapshot((query) => {
        const list = [];
        query.forEach((doc) => {
            list.push({ ...doc.data(), id: doc.id });
        });
        setEmpresa(list);
    });

    useEffect(() => {
        (async () => {

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

    function getDistanceFromLatLonInKm(position1, position2) {
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
        console.log(resultado);
        var resposta;
        if (resultado > 100) {
            resposta = false;
        }else{
            resposta = true;
        }
        return (navigation.navigate("Ponto", {resultado: resposta}));
    }

    let text = '';
    if (errorMsg) {
        text = errorMsg;
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}>
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
                <View style={styles.container}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={empresa}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.Tasks}>
                                    <Text style={styles.DescriptionTask}
                                        onPress={() => getDistanceFromLatLonInKm({ lat: item.lat, lng: item.lng }, { lat: latitude, lng: longitude })}
                                    > {item.Nome}
                                    </Text>
                                </View>
                            )
                        }}
                    />
                </View>
            }

        </KeyboardAvoidingView>
    );
}