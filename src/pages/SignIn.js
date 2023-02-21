import { Image, Dimensions, TouchableWithoutFeedback, View, Button, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'

// ui kitten
import { Layout, Text, Input, Icon, Card, Modal } from '@ui-kitten/components';

// database
import { doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../firebaseConnection';

// styles
import styles from "../styles";

const { width } = Dimensions.get('window');

const SignIn = ({ navigation, route }) => {
    const params = route.params
    const [Email, setEmail] = React.useState('');
    const [Password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [Name, setName] = React.useState('');
    const [Phone, setPhone] = React.useState('');
    const [] = useState(null)

    const [secureTextEntry, setSecureTextEntry] = React.useState(true);
    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const [errorMessage, setErrorMessage] = useState(null);

    const [visiblePassCurta, setVisiblePassCurta] = React.useState(false);
    const [visiblePassDif, setVisiblePassDif] = React.useState(false);
    const [visibleNull, setVisibleNull] = React.useState(false);
    const [visibleEmail, setVisibleEmail] = React.useState(false);
    const [visibleEmailUsed, setVisibleEmailUsed] = React.useState(false);
    const [visibleNewData, setVisibleNewData] = React.useState(false);
    const [uid, setUid] = React.useState("");

    let loadUser = false;

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




    async function newUser() {
        console.log(uid);
        await setDoc(doc(db, "users", uid), {
            nome: Name,
            numero: parseInt(Phone),
        });
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ width: width * 0.9, height: width * 0.5 * 1.5, marginTop: isKeyboardVisible == true ? '-2%' : '-25%', marginBottom: '8%' }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/pequena-ametista-pap.appspot.com/o/LOGO%20C.png?alt=media&token=5c5f71c7-7006-45aa-af68-005267eda5e0' }}></Image>

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
                            if (Password != '' || confirmPassword != '') {
                                if (Password === confirmPassword) {
                                    createUserWithEmailAndPassword(auth, Email, Password)
                                        .then((userCredential) => {
                                            setUid(userCredential.user.uid);
                                            loadUser = true;

                                            if (loadUser) {
                                                setVisibleNewData(true);
                                            }
                                        })
                                        .catch((error) => {
                                            const errorCode = error.code;

                                            console.log(errorCode)
                                            if (errorCode == 'auth/invalid-email' || errorCode == 'auth/missing-email') {
                                                setVisibleEmail(true)
                                            }
                                            if (!Password || !confirmPassword) {
                                                setVisibleNull(true)
                                            }
                                            if (errorCode == 'auth/weak-password') {
                                                setVisiblePassCurta(true)
                                            }
                                            if (errorCode == 'auth/email-already-in-use') {
                                                setVisibleEmailUsed(true)
                                            }
                                        });
                                } else {
                                    setVisiblePassDif(true)
                                }
                            }
                            else {
                                setVisibleNull(true)
                            }
                        }
                        } />
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                        <Text>Já tem conta?</Text><Text style={{ color: '#8288C3' }} onPress={() => navigation.navigate('LogIn')}> Iniciar Sessão</Text>
                    </View>

                    {/* Email já em uso */}
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

                    {/* Endereço de email inválido */}
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

                    {/* Sem password */}
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

                    {/* Password curta */}
                    <Modal
                        visible={visiblePassCurta}
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
                            <Text>A palavra-passe é muito fraca. Crie uma palavra-passe com no mínimo 6 caracteres.</Text>
                            <View style={styles.btnAgain} >
                                <Button title='Tentar Novamente' color='#fff' onPress={() => setVisiblePassCurta(false)} />
                            </View>
                        </Card>
                    </Modal>

                    {/* Passwords diferentes */}
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

                    {/* Últimos dados */}
                    <Modal
                        visible={visibleNewData}
                        backdropStyle={styles.backdrop}>
                        <Card disabled={true} style={{ borderRadius: 15, }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                <Text style={{ marginBottom: 20 }}>Antes de continuar, insira os últimos dados necessários:</Text>
                            </View>
                            <Text style={styles.errorMessage}>{errorMessage}</Text>
                            <Input style={styles.inputName}
                                placeholder='Nome'
                                keyboardType="name"
                                value={Name}
                                onChangeText={nextValue => setName(nextValue)}
                            />
                            <Text style={styles.errorMessage}>{errorMessage}</Text>
                            <Input style={styles.inputPhone}
                                placeholder='Número de Telemóvel'
                                keyboardType='numeric'
                                value={Phone}
                                onChangeText={nextValue => setPhone(nextValue)}
                            />
                            <View style={styles.btnAgain} >
                                <Button title='OK' color='#fff' onPress={async () => {
                                    if (Name == '' || Phone == '') {
                                        setErrorMessage("Obrigatório*")
                                    } else {
                                        if (Name != '' && Phone != '') {
                                            newUser();
                                            setVisibleNewData(false);
                                            navigation.navigate('Home');
                                        }
                                    }
                                }} />
                            </View>
                        </Card>
                    </Modal>

                </Layout >
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default SignIn;