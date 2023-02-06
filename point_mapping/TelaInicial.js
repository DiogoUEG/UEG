import React from "react";
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/paginas/Login";
import Empresa from "./src/paginas/TelaEmpresas";
import Ponto from "./src/paginas/Ponto";
import Relatorio from "./src/paginas/Relatorio";
import { BottomTabBar, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Detalhes = createStackNavigator();

function HomeScreen() {
  return (
    <Stack.Navigator initialRouteName="Empresa">
      <Stack.Screen
        name="Empresa"
        component={Empresa}
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

  )
}

function DetalhesScreen() {
  return (
    <Detalhes.Navigator>
      <Detalhes.Screen
        name="Relatorio"
        component={Relatorio}
        options={{
          headerTintColor: "#F92E6A"
        }}
      />
    </Detalhes.Navigator>

  )
}

export default function TelaInicial() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }} />
      <Tab.Screen name="Relatório" component={DetalhesScreen} 
      options={{
        tabBarLabel: 'Report',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="clock-check-outline" color={color} size={size} />
        ),
      }}/>
    </Tab.Navigator>

  )
}
