import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === "ios" ? 0 : 50
  },
  label: {
    width: "90%",
    marginTop: 20,
    fontSize: 16,
    marginLeft: 20,
    color: "#F92E6A"
  },
  input: {
    width: "90%",
    marginTop: 10,
    padding: 10,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#F92E6A",
    marginLeft: "auto",
    marginRight: "auto"
  },
  iconButton: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonGerar: {
    width: 200,
    height: 60,
    position: 'absolute',
    bottom: "50%",
    left: '25%',
    backgroundColor: "#F92e6a",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  buttons: {
    width: 200,
    height: 200,
    paddingLeft: 100,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    position: 'relative',
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#F92e6a",
    width: 120,
    height: 60,
    bottom: 100,
    left: 20,
    borderRadius: 50,
    margin: 10
  },
  buttonNewTask: {
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 30,
    left: 20,
    backgroundColor: "#F92e6a",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },

});

export default styles