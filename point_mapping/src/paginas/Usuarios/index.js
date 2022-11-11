import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, } from "react-native";
import firebase from "../../config/firebase";

import styles from "./style";
import { FontAwesome } from "@expo/vector-icons";

export default function Usuarios({ navigation }) {
    const [tarefa, setTarefa] = useState([]);
    const database = firebase.firestore()

    useEffect(() => {
    }, []);


    return(
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={tarefa}
                renderItem={ ( { item }) => {
                    return (
                        <View style={styles.Tasks}>

                            <TouchableOpacity  style={styles.deleteTask}
                            >
                                <FontAwesome
                                name="trash"
                                size={20}
                                color="#F92e6A"
                                >
                                </FontAwesome>
                            </TouchableOpacity>

                            <Text style={styles.DescriptionTask}
                                onPress={() => {}}
                                > {item.descricao}
                            </Text>
                        </View>
                    )
                }}
            />

            <TouchableOpacity
            style={styles.buttonNewTask} 
            onPress={() => navigation.navigate("NovoUsuario") }>
                <Text style={styles.iconButton}>+</Text>
            </TouchableOpacity>    

        </View>
    )
}