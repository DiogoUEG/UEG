import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import styles from './style';
import { collection, query, where, getDocs, orderBy, onSnapshot, serverTimestamp, addDoc } from "firebase/firestore";
import db from '../../config/firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { format, compareAsc } from 'date-fns'

export default function Ponto({ navigation, route }) {
  const resultado = route.params.resultado;
  const [user, setUser] = useState("")

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user.uid)
    } else {
    }
  });

  const onAddButtonPress = (tp) => {
    const timestamp = format(new Date(), 'MM/dd/yyyy,HH:mm:ss');
    const data = {
      lat: route.params.lat,
      lng: route.params.lng,
      IdEmpresa: route.params.empresa,
      IdUsuario: user,
      data: timestamp,
      tipo: tp
    };
    addDoc(collection(db, 'Ponto'), data)

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
              <Text style={styles.submitText} onPress={() => onAddButtonPress("Saida")}>Saida</Text>
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
