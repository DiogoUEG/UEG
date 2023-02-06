import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore"
import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, DatePickerIOSBase } from "react-native"
import db from '../../config/firebase';
import styles from "./style"
import api from "../../service/api";
import { format, compareAsc } from 'date-fns'

export default function Relatorio({ navigation, route }) {
    const [modo, setModo] = useState(null)
    const [user, setUser] = useState(null)
    const [email, setEmail] = useState(null)
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user.uid)
            setEmail(user.email)
        } else {
        }
    });

    async function Diario() {
        const timestamp = format(new Date(), 'MM/dd/yyyy');
        const list = []
        const q = await getDocs(query(collection(db, 'Ponto'), where('IdUsuario', '==', user),where('data', '==', timestamp)))

        q.forEach((doc) => {
            list.push({...doc.data()})
        });

        const nome = email.split("@")
        const rep = {
            nome: nome[0],
            email: email,
            mensagem: list,
        }
        console.log("Diario")
        console.log(list)
        api.post('/send', rep)
    }
    async function Mensal() {
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
        const q = await getDocs(query(collection(db, 'Ponto'), where('IdUsuario', '==', user), where('data', '>=', inicial), where('data', '<=', final),orderBy("data"), orderBy("hora", "asc")))

        q.forEach((doc) => {
            list.push({...doc.data()})
        });

        const nome = email.split("@")
        const rep = {
            nome: nome[0],
            email: email,
            mensagem: list,
        }
        console.log("Mensal")
        console.log(list)
        api.post('/send', rep)

    }

    return (
        <View style={styles.container}>
            <View style={styles.buttons}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { setModo('Diario') }}>
                    <Text style={styles.iconButton}>Diario</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { setModo('Mensal') }}>
                    <Text style={styles.iconButton}>Mensal</Text>
                </TouchableOpacity>
            </View>

            {modo == "Diario"
                ?
                <TouchableOpacity
                    style={styles.buttonGerar}
                    onPress={() => { Diario() }}>
                    <Text style={styles.iconButton}>Gerar</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity
                    style={styles.buttonGerar}
                    onPress={() => { Mensal() }}>
                    <Text style={styles.iconButton}>Gerar</Text>
                </TouchableOpacity>
            }
        </View>
    )
}
