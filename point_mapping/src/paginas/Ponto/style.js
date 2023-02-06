import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    background: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerlogo: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: Platform.OS === "ios" ? 0 : 50
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '60%',
      paddingBottom: 50,
    },
  
    btnEntrada: {
      backgroundColor: '#09BD1B',
      width: 200,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      marginTop: 30,
    },
  
    btnSaida: {
      backgroundColor: '#F21818',
      width: 200,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      marginTop: 30,
    },
    submitText: {
      color: '#FFF',
      fontSize: 20,
    },
    btnRegister: {
      marginTop: 10,
  
    },
    registertext: {
      color: '#FFF',
    }
  
  });

  export default styles