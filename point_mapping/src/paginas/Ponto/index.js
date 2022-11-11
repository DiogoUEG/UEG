import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import styles from './style';

export default function Ponto({ navigation, route }) {
  const resultado = route.params.resultado;
  return (

    <KeyboardAvoidingView style={styles.background}>

      <View style={styles.container}>
        {resultado === true
          ?
          <View>
            <TouchableOpacity style={styles.btnEntrada}>
              <Text style={styles.submitText} onPress={() => console.log("Entrada " + resultado)}>Entrada</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnSaida}>
              <Text style={styles.submitText}  onPress={() => console.log("Saida " + resultado)}>Saida</Text>
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
