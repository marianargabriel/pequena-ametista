import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback, KeyboardAvoidingView, View, Image, Dimensions, Keyboard, Button } from 'react-native';
import { Icon, Input, Text, Layout, Modal, Card } from '@ui-kitten/components';

import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import database from '../firebaseConnection';

import styles from "../styles";

const Home = ({ navigation, route }) => {
    const params = route.params
    const [Name, setName] = React.useState('');
    const [Phone, setPhone] = React.useState('');
    const [Users, setUsers] = useState([])

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Olá</Text>
                </Layout >
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

export default Home