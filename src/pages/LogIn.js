import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback, KeyboardAvoidingView, StyleSheet, View, Image, Dimensions, Keyboard, Button } from 'react-native';
import { Icon, Input, Text, Layout } from '@ui-kitten/components';

import styles from "../styles";

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
            <Image style={{ width: width * 0.9, height: width * 0.5 * 1.5, marginTop: isKeyboardVisible == true ? '-2%' : '-30%', marginBottom: '8%' }} source={require('../../img/LOGO-C.png')}></Image>
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
              <Button title='Continuar' color='#fff' onPress={() => navigation.navigate('Schedule')} />
            </View>
            <View style={{ flexDirection: 'row', marginTop: '5%' }}>
              <Text>Ainda não tem conta?</Text><Text style={{ color: '#8288C3' }} onPress={() => navigation.navigate('SignIn')}> Criar</Text>
            </View>
          </Layout>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default LogIn;