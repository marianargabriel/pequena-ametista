import { Text, View, Image, Button, Dimensions } from 'react-native';
import React from 'react';

import styles from "../styles";

import { Layout } from '@ui-kitten/components';

const { width } = Dimensions.get('window');

export default function Landing({ navigation }) {
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <Image style={{ width: width * 1, height: width * 0.7 * 2.50, marginTop: '-13%', borderRadius: 42, }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/pequena-ametista-pap.appspot.com/o/landing.png?alt=media&token=c05da98e-5fe9-4538-bcdd-1eab8bbebd4a' }}></Image>
        <View style={[styles.card_init, styles.shadowProp]}>
          <Text style={styles.text_init}>Descobre a{"\n"}nossa nova{"\n"}forma de{"\n"}organização! </Text>

          <View style={styles.btn_init}>
            <Button title='Iniciar Sessão' color="#fff" onPress={() => navigation.navigate('LogIn')} />
          </View>
          <View style={styles.btn_init}>
            <Button title='Criar Conta' color="#fff" onPress={() => navigation.navigate('SignIn')} />
          </View>
        </View>
      </View>
    </Layout>
  );
};