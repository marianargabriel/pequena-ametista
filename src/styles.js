import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  //landing
  card_init: {
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '35%',
    width: '50%',
    minWidth: 273,
    borderRadius: 34,
    padding: '8%',
    marginLeft: '15%',
    marginTop: '-30%',
  },

  text_init: {
    fontSize: '25%',
    fontWeight: '500',
    textAlign: 'left',
    marginLeft: '-25%',
    marginBottom: '10%',
  },

  btn_init: {
    backgroundColor: '#8288C3',
    height: '16%',
    width: '100%',
    minWidth: 200,
    borderRadius: 10,
    marginBottom: '5%',
  },

  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },


  //login

  inputPassword: {
    marginTop: '2%',
    marginBottom: '20%',
    width: "90%",
    borderRadius: 10,
  },

  inputEmail: {
    width: "90%",
    borderRadius: 10,
  },

  inputContainer: {
    alignItems: 'center',
  },

  btnLogin: {
    backgroundColor: '#8288C3',
    height: 45,
    width: '60%',
    borderRadius: 10,
    marginTop: '10%',
    justifyContent: 'center',
  },

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

  captionText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#8F9BB3",
  },


  //signin

  inputPassword: {
    marginTop: '2%',
    width: "90%",
    borderRadius: 10,
  },

  inputConfirmPassword: {
    width: "90%",
    borderRadius: 10,
  },

  inputEmail: {
    width: "90%",
    borderRadius: 10,
  },

  inputContainer: {
    alignItems: 'center',
  },

  btnSignin: {
    backgroundColor: '#8288C3',
    height: 45,
    width: '60%',
    borderRadius: 10,
    marginTop: '10%',
    marginBottom: '1%',
    justifyContent: 'center',
  },

  btnLogin_: {
    backgroundColor: '#8288C3',
    height: 45,
    width: '60%',
    borderRadius: 10,
    marginTop: '1%',
    justifyContent: 'center',
  },

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

  captionText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#8F9BB3",
  },

  hairline: {
    backgroundColor: '#A2A2A2',
    height: 1,
    width: '70%',
    marginRight: '7%',
  },

});

export default styles;