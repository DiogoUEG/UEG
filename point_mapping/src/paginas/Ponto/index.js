import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import styles from './style';
import { collection, query, where, getDocs, orderBy, onSnapshot, serverTimestamp, addDoc } from "firebase/firestore";
import app from "../../config/firebase";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Ponto({ navigation, route }) {
  const resultado = route.resultado;
  const db = getFirestore(app);
  const [user, setUser] = useState("")

  const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
        } else {
        }
    });

  const onAddButtonPress = (tp) => {
        const timestamp = serverTimestamp();
        const data = {
            lang: route.lang,
            lng: route.lng,
            IdEmpresa: route.empresa,
            IdUsuario: user,
            data: timestamp,
            tipo: tp
        };
        addDoc(collection(db, 'ponto'), data)
            .then(_doc => {
            })
            .catch((error) => {
                alert(error)
            });
}

  return (

    <KeyboardAvoidingView style={styles.background}>

      <View style={styles.container}>
        {resultado === true
          ?
          <View>
            <TouchableOpacity style={styles.btnEntrada}>
              <Text style={styles.submitText} onPress={() => onAddButtonPress("Entrada")}>Entrada</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnSaida}>
              <Text style={styles.submitText}  onPress={() => onAddButtonPress("Saida")}>Saida</Text>
            </TouchableOpacity>
          </View>
          :
          <View>
            <TouchableOpacity style={styles.btnEntrada} disabled={true}>
              <Text style={styles.submitText} onPress={() => console.log("Desabilitado " + resultado)}>Entrada</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnSaida} disabled={true}>
              <Text style={styles.submitText} onPress={() => console.log("Desabilitado " + resultado)}>Saida</Text>
            </TouchableOpacity>
          </View>
        }

      </View>
    </KeyboardAvoidingView>

  );
}
