import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  
  // LogIn Page

  captionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  captionIcon: {
    width: 10,
    height: 10,
    marginRight: 5
  },


  // LogIn and SignIn Page

  inputEmail: {
    width: "90%",
    borderRadius: 10,
  },

  inputPassword: {
    marginTop: '2%',
    marginBottom: '20%',//
    width: "90%",
    borderRadius: 10,
  },

  btnLogin: {
    backgroundColor: '#8288C3',
    height: 45,
    width: '60%',
    borderRadius: 10,
    marginTop: '10%',
    justifyContent: 'center',
  },

  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  warnicon: {
    height: 35,
    width: 35,
    marginRight: 10,
    marginBottom: 20,
  },

  btnAgain: {
    backgroundColor: '#8288C3',
    height: 45,
    width: '80%',
    borderRadius: 10,
    marginTop: '10%',
    marginLeft: '10%',
    justifyContent: 'center',
    alignItems: 'center'
  },


  // SignIn Page

  inputConfirmPassword: {
    width: "90%",
    borderRadius: 10,
    marginTop: '2%',
  },

  inputName: {
    marginTop: '2%',
    marginBottom: '3%',
    width: "100%",
    borderRadius: 10,
  },

  inputPhone: {
    marginTop: '2%',
    width: "100%",
    borderRadius: 10,
  },

  inputPassword: {
    marginTop: '2%',
    width: "90%",
    borderRadius: 10,
  },

  errorMessage: {
    fontSize: 10,
    color: "red",
  },
});

export default styles;