import React from "react";
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TelaInicial from "./TelaInicial";
import Login from "./src/paginas/Login";
import Empresa from "./src/paginas/TelaEmpresas";
import Ponto from "./src/paginas/Ponto";
import Relatorio from "./src/paginas/Relatorio";
import { BottomTabBar, createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createStackNavigator();

export default function App() {
  return ( 
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
    <Stack.Screen
        name="TelaInicial"
        component={TelaInicial}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
    </NavigationContainer>
    
  )
}
