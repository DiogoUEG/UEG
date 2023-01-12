import React from "react";
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Usuarios from "./src/paginas/Usuarios";
import NovoUsuario from "./src/paginas/NovoUsuario";
import Detalhes from "./src/paginas/Detalhes";
import Login from "./src/paginas/Login";
import Local from "./src/paginas/TelaEmpresas";
import Ponto from "./src/paginas/Ponto";
import LoginEmpresa from "./src/paginas/LoginEmpresa";
//Ola
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">

        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name="LoginEmpresa"
          component={LoginEmpresa}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name="Empresa"
          component={Local}
          options={{
            headerTintColor: "#F92E6A"
          }}
        />

        <Stack.Screen
          name="Usuarios"
          component={Usuarios}
          options={{
            headerTintColor: "#F92E6A"
          }}
        />

        <Stack.Screen
          name="NovoUsuario"
          component={NovoUsuario}
          options={{
            headerTintColor: "#F92E6A",
            title: "Novo Usuario"
          }}
        />

        <Stack.Screen
          name="Detalhes"
          component={Detalhes}
          options={{
            headerTintColor: "#F92E6A"
          }}
        />

        <Stack.Screen
          name="Ponto"
          component={Ponto}
          options={{
            headerTintColor: "#F92E6A"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
