import React, { useState } from "react"
import {View, Text, TextInput, TouchableOpacity} from "react-native"
import firebase from "../../config/firebase";
import styles from "./style";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function NovoUsuario({navigation}, props){

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const incluirUsuario = ()=>{

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                navigation.navigate("Usuarios");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    return(
        <View style={styles.container}> 
            <Text style={styles.label}>E-mail</Text>
            <TextInput 
                style={styles.input}
                type="text"
                placeholder="Digite o E-mail"
                onChangeText={setEmail}
                value={email}
            />
            <Text style={styles.label}>Senha</Text>
            <TextInput 
                style={styles.input}
                type="text"
                placeholder="Digite a senha"
                onChangeText={setPassword}
                value={password}
            />
            <TouchableOpacity style={styles.buttonNewTask} onPress={incluirUsuario}>
                <Text style={styles.iconButton}>Salvar</Text>
            </TouchableOpacity>
        </View>
    )
}