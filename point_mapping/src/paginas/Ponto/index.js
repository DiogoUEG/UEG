import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import styles from './style';
import firebase from "../../config/firebase";
import { collection, query, where, getDocs, orderBy, onSnapshot, serverTimestamp, addDoc } from "firebase/firestore";

export default function Ponto({ navigation, route }) {
  const resultado = route.resultado;
  const database = firebase.firestore();
  
  const onAddButtonPress = (tp) => {
    const timestamp = serverTimestamp();
    const data = {
      lang: route.lang,
      lng: route.lng,
      data: timestamp,
      tipo: tp
    };
    database.collection('ponto').add(data)
      .then(_doc => {
        console.log("registrado")
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
              <Text style={styles.submitText} onPress={() => {}}>Entrada</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnSaida}>
              <Text style={styles.submitText} onPress={() => {}}>Saida</Text>
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
