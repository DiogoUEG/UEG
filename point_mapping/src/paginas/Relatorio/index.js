import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore"
import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, DatePickerIOSBase } from "react-native"
import db from '../../config/firebase';
import styles from "./style"
import api from "../../service/api";


export default function Relatorio({ navigation, route }) {
    const [modo, setModo] = useState(null)
    const [user, setUser] = useState(null)
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user.uid)
        } else {
        }
    });

    function Diario(){
        const timestamp = format(new Date(), 'MM/dd/yyyy');
        const list = []
        var q = getDocs(query(collection(db, 'Ponto'), where('IdUsuario','==', user), where('data', '==',timestamp)))
    
        q.forEach((doc) => {
            list.push(doc.data())
        });

        api.post('/send', list)
    }
    function Mensal() {
        var ano = new Date().getFullYear();
        var mes = new Date().getMonth - 1;
        var diafinal, inicial, final
        const list = []
        if (mes == ['01', '03', '05', '07', '08', '10', '12']) {
            diafinal = 31;
        }
        if (mes == ['04', '06', '09', '11']) {
            diafinal = 30;
        }
        if (mes == '02') {
            diafinal = 28;
        }

        inicial = '01/' + mes + '/' + ano
        final = diafinal + '/' + mes + '/' + ano
        var q = getDocs(query(collection(db, 'Ponto'), where('IdUsuario','==', user), where('data', '>=',inicial), where('data', '<=', final)))
    
        q.forEach((doc) => {
            list.push(doc.data())
        });
        api.post('/send', list)

    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Descrição</Text>

            <TouchableOpacity
                style={styles.buttonNewTask}
                onPress={() => { setModo('Diario') }}>
                <Text style={styles.iconButton}>Diario</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonNewTask}
                onPress={() => { setModo('Mensal') }}>
                <Text style={styles.iconButton}>Mensal</Text>
            </TouchableOpacity>
            {modo == "Diario"
                ?
                <TouchableOpacity
                    style={styles.buttonNewTask}
                    onPress={() => {Diario()}}>
                    <Text style={styles.iconButton}>Gerar</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity
                    style={styles.buttonNewTask}
                    onPress={() => {Mensal()}}>
                    <Text style={styles.iconButton}>Gerar</Text>
                </TouchableOpacity>
            }
        </View>
    )
}
