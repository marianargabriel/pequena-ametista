import { Image, Dimensions, TouchableWithoutFeedback, View, Button, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, Layout, Text, Input, Icon, Card, Modal } from '@ui-kitten/components';

import '../firebaseConnection'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import styles from "../styles";

const { width } = Dimensions.get('window');

const SignInprov = ({ navigation, route }) => {
    const params = route.params
    const [Email, setEmail] = React.useState('');
    const [Password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);
    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const [visiblePassDif, setVisiblePassDif] = React.useState(false);
    const [visibleNull, setVisibleNull] = React.useState(false);
    const [visibleEmail, setVisibleEmail] = React.useState(false);
    const [visibleEmailUsed, setVisibleEmailUsed] = React.useState(false);
    const [visibleRegistSuss, setVisibleRegistSuss] = React.useState(false);

    const renderIcon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon {...props} fill='#000000' name={secureTextEntry ? 'eye-off' : 'eye'} />
        </TouchableWithoutFeedback>
    );

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

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    const auth = getAuth();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ width: width * 0.9, height: width * 0.5 * 1.5, marginTop: isKeyboardVisible == true ? '-2%' : '-25%', marginBottom: '8%' }} source={require('../../img/LOGO-C.png')}></Image>

                    <Input
                        placeholder='Endereço de Email'
                        status='basic'
                        style={styles.inputEmail}
                        keyboardType="email-address"
                        value={Email}
                        onChangeText={nextValue => setEmail(nextValue)}
                    />
                    <Input
                        value={Password}
                        placeholder='Palavra-Passe'
                        status='basic'
                        style={styles.inputPassword}
                        accessoryRight={renderIcon}
                        secureTextEntry={secureTextEntry}
                        onChangeText={nextValue => setPassword(nextValue)}
                    />
                    <Input
                        value={confirmPassword}
                        placeholder='Confirmar Palavra-Passe'
                        status='basic'
                        style={styles.inputConfirmPassword}
                        accessoryRight={renderIcon}
                        secureTextEntry={secureTextEntry}
                        onChangeText={nextValue => setConfirmPassword(nextValue)}
                    />

                    <View style={styles.btnLogin}>
                        <Button title='Continuar' color='#fff' onPress={() => {
                            if (Password != '' || confirmPassword != '' || Password != null || confirmPassword != null ) {
                                createUserWithEmailAndPassword(auth, Email, Password)
                                    .then((userCredential) => {
                                        // Signed in
                                        const user = userCredential.user;
                                        setVisibleRegistSuss(true)
                                    })
                                    .catch((error) => {
                                        const errorCode = error.code;

                                        console.log(errorCode)
                                        if (errorCode == 'auth/invalid-email' || errorCode == 'auth/missing-email') {
                                            setVisibleEmail(true)
                                        }
                                        if(Password === '' || confirmPassword === '' || Password === null || confirmPassword === null){
                                            setVisibleNull(true)
                                        }
                                        if (errorCode == 'auth/weak-password') {
                                            setVisiblePassDif(true)
                                        }
                                        if (errorCode == 'auth/email-already-in-use') {
                                            setVisibleEmailUsed(true)
                                        }
                                    });
                            }
                            else {
                                setVisibleNull(true)
                            }
                        }
                        } />
                    </View>

                    <Modal
                        visible={visibleEmailUsed}
                        backdropStyle={styles.backdrop}
                        onBackdropPress={() => setVisibleEmailUsed(false)}>
                        <Card disabled={true} style={{ borderRadius: 15, }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                <Icon
                                    style={styles.warnicon}
                                    fill='red'
                                    name='alert-triangle-outline'
                                />
                                <Text style={{ marginBottom: 20, fontWeight: 'bold', }}>Erro</Text>
                            </View>
                            <Text>Este endereço de email já está a ser utilizado. Tente recuperar a palavra-passe.</Text>
                            <View style={styles.btnAgain} >
                                <Button title='Tentar Novamente' color='#fff' onPress={() => setVisibleEmailUsed(false)} />
                            </View>
                        </Card>
                    </Modal>
                    <Modal
                        visible={visibleRegistSuss}
                        backdropStyle={styles.backdrop}
                        onBackdropPress={() => setVisibleRegistSuss(false)}>
                        <Card disabled={true} style={{ borderRadius: 15, }}>
                            <Text style={{ fontWeight: 'bold' }}>Registado com sucesso.</Text>
                            <View style={styles.btnAgain} >
                                <Button title='Continuar' color='#fff' onPress={() => setVisibleRegistSuss(false)} />
                            </View>
                        </Card>
                    </Modal>
                    <Modal
                        visible={visibleEmail}
                        backdropStyle={styles.backdrop}
                        onBackdropPress={() => setVisibleEmail(false)}>
                        <Card disabled={true} style={{ borderRadius: 15, }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                <Icon
                                    style={styles.warnicon}
                                    fill='red'
                                    name='alert-triangle-outline'
                                />
                                <Text style={{ marginBottom: 20, fontWeight: 'bold', }}>Erro</Text>
                            </View>
                            <Text >Insira um endereço de email válido.</Text>
                            <View style={styles.btnAgain} >
                                <Button title='Tentar Novamente' color='#fff' onPress={() => setVisibleEmail(false)} />
                            </View>
                        </Card>
                    </Modal>
                    <Modal
                        visible={visibleNull}
                        backdropStyle={styles.backdrop}
                        onBackdropPress={() => setVisibleNull(false)}>
                        <Card disabled={true} style={{ borderRadius: 15, }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                <Icon
                                    style={styles.warnicon}
                                    fill='red'
                                    name='alert-triangle-outline'
                                />
                                <Text style={{ marginBottom: 20, fontWeight: 'bold', }}>Erro</Text>
                            </View>
                            <Text>Insira uma palavra-passe e confirme-a.</Text>
                            <View style={styles.btnAgain} >
                                <Button title='Tentar Novamente' color='#fff' onPress={() => setVisibleNull(false)} />
                            </View>
                        </Card>
                    </Modal>
                    <Modal
                        visible={visiblePassDif}
                        backdropStyle={styles.backdrop}
                        onBackdropPress={() => setVisiblePassDif(false)}>
                        <Card disabled={true} style={{ borderRadius: 15 }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                <Icon
                                    style={styles.warnicon}
                                    fill='red'
                                    name='alert-triangle-outline'
                                />
                                <Text style={{ marginBottom: 20, fontWeight: 'bold', }}>Erro</Text>
                            </View>
                            <Text>As palavra-passes que inseriu não coincidem.</Text>
                            <View style={styles.btnAgain} >
                                <Button title='Tentar Novamente' color='#fff' onPress={() => setVisiblePassDif(false)} />
                            </View>
                        </Card>
                    </Modal>

                </Layout >
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default SignInprov
