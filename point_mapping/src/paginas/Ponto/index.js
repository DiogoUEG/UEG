import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import styles from './style';
import { collection, query, where, getDocs, orderBy, onSnapshot, serverTimestamp, addDoc, doc } from "firebase/firestore";
import db from '../../config/firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { format, compareAsc } from 'date-fns'

export default function Ponto({ navigation, route }) {
  const resultado = route.params.resultado;
  const empresa = route.params.empresa
  const [user, setUser] = useState("")

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user.uid)
    } else {
    }
  });

  const onAddButtonPress = async (tp) => {
    const timestamp = format(new Date(), 'MM/dd/yyyy');
    const time = format(new Date(), 'HH:mm:ss');
    const data = {
      lat: route.params.lat,
      lng: route.params.lng,
      IdEmpresa: route.params.empresa,
      IdUsuario: user,
      data: timestamp,
      hora: time,
      tipo: tp
    };
    const list = []


    const q = await getDocs(query(collection(db, "Ponto"), where("data", "==", timestamp), where("IdEmpresa", "==", empresa), orderBy("hora", 'asc')))
    q.forEach(element => {
      list.push(element.data())

    });
    console.log(list)
    var num = list[list.length - 1]
    
    if (tp == "Saida") {
      if (list == 0) {
        return alert("Não é possivel registrar o ponto de saida, pois não existe uma entrada")
      }
      if (list.length != 0) {
        if (num.tipo == "Saida") {
          return alert("Não é possivel registrar o ponto de saida, pois já existe um registro de saida")
        }
        if (num.tipo == "Entrada") {
          addDoc(collection(db, 'Ponto'), data)
            .then(() => {
              return alert("Resgistrado com sucesso!")
            })
            .catch((error) => {
              return alert(error)
            })
        }
      }
    }
    if (tp == "Entrada") {
      if (list == 0) {
        addDoc(collection(db, 'Ponto'), data)
          .then(() => {
            return alert("Resgistrado com sucesso!")
          })
          .catch((error) => {
            return alert(error)
          })
      }
      if (num.tipo == "Entrada") {
        return alert("Não é possivel registrar o ponto de entrada, pois já existe um registro de entrada.")
      }
      if (num.tipo == "Saida") {
        return alert("Não é possivel registrar o ponto de entrada, pois já foi registrado a entrada e saida.")
      }

    }
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
              <Text style={styles.submitText} onPress={() => alert("Local muito distante da localização da empresa")}>Entrada</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnSaida} disabled={true}>
              <Text style={styles.submitText} onPress={() => alert("Local muito distante da localização da empresa")}>Saida</Text>
            </TouchableOpacity>
          </View>
        }

      </View>
    </KeyboardAvoidingView>

  );
}
