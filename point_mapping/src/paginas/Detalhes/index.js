import React, { useState } from "react"
import {View, Text, TextInput, TouchableOpacity} from "react-native"

import firebase from "../../config/firebase"
import styles from "./style"

export default function Detalhes({navigation, route}){
    const [descricaoEdit, setDescricaoEdit] = useState(route.params.descricao)
    const idTarefa = route.params.id
    const database = firebase.firestore()

    function alterarTarefa(descricao, id){
        database.collection("Tarefas").doc(id).update({
            descricao: descricao,})
        navigation.navigate("Tarefa")
    }

    return(
        <View style={styles.container}> 
            <Text style={styles.label}>Descrição</Text>
            <TextInput  
                style={styles.input}
                type="text"
                placeholder="Digite aqui a tarefa"
                onChangeText={setDescricaoEdit}
                value={descricaoEdit}
            />

            <TouchableOpacity 
                style={styles.buttonNewTask}
                onPress={() =>{
                alterarTarefa(descricaoEdit, idTarefa)
            }}>
                <Text style={styles.iconButton}>Salvar</Text>
            </TouchableOpacity>
        </View>
    )
}
