import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback, KeyboardAvoidingView, View, Image, Dimensions, Keyboard, Button } from 'react-native';

// ui kitten
import { Icon, Input, Text, Layout, Modal, Card } from '@ui-kitten/components';

// database
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import '../firebaseConnection';

<<<<<<< Updated upstream
import styles from '../styles';
=======
// styles
import styles from "../styles";
>>>>>>> Stashed changes

const { width } = Dimensions.get('window');

const AlertIcon = (props) => (
  <Icon {...props} name='alert-circle-outline' />
);

const LogIn = ({ navigation, route }) => {
  const params = route.params
  const [Email, setEmail] = React.useState('');
  const [Password, setPassword] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const [visibleErr, setVisibleErr] = React.useState(false);

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const renderCaption = () => {
    return (
      <View style={styles.captionContainer}>
        {AlertIcon(styles.captionIcon)}
      </View>
    )
  }

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image style={{ width: width * 0.9, height: width * 0.5 * 1.5, marginTop: isKeyboardVisible == true ? '-2%' : '-25%', marginBottom: '8%' }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/pequena-ametista-pap.appspot.com/o/LOGO%20C.png?alt=media&token=5c5f71c7-7006-45aa-af68-005267eda5e0' }}></Image>
            <Input style={styles.inputEmail}
              placeholder='Email'
              keyboardType="email-address"
              value={Email}
              onChangeText={nextValue => setEmail(nextValue)}
            />

            <Input style={styles.inputPassword}
              value={Password}
              placeholder='Palavra-Passe'
              caption={renderCaption}
              accessoryRight={renderIcon}
              secureTextEntry={secureTextEntry}
              onChangeText={nextValue => setPassword(nextValue)}
            />

            <View style={styles.btnLogin}>
              <Button title='Continuar' color='#fff' onPress={() => {
                const auth = getAuth();

                signInWithEmailAndPassword(auth, Email, Password)
                  .then((userCredencial) => {
                    onAuthStateChanged(auth, (user) => {
                      if (user) {
                        const uid = user.uid;

                        navigation.navigate('Home', {
                          UID: uid
                        })
                      } else {
                        console.log('Não possui registos.')
                      }
                    });
                  })

                  .catch((error) => {
                    setVisibleErr(true)

                    const errorCode = error.code;
                    console.log(errorCode)
                  });
              }} />
            </View>
            <View style={{ flexDirection: 'row', marginTop: '5%' }}>
              <Text>Ainda não tem conta?</Text><Text style={{ color: '#8288C3' }} onPress={() => navigation.navigate('SignIn')}> Criar</Text>
            </View>

            <Modal
              visible={visibleErr}
              backdropStyle={styles.backdrop}
              onBackdropPress={() => setVisibleErr(false)}>
              <Card disabled={true} style={{ borderRadius: 15, }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                  <Icon
                    style={styles.warnicon}
                    fill='red'
                    name='alert-triangle-outline'
                  />
                  <Text style={{ marginBottom: 20, fontWeight: 'bold', }}>Alerta!</Text>
                </View>
                <Text> Palavra-passe ou endereço de email incorretos.</Text>
                <View style={styles.btnAgain}>
                  <Button title='Tentar Novamente' color='#fff' onPress={() => setVisibleErr(false)} />
                </View>
              </Card>
            </Modal>
          </Layout>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default LogIn;