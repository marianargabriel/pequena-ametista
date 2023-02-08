import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback, KeyboardAvoidingView, View, Image, Dimensions, Keyboard, Button } from 'react-native';
import { Icon, Input, Text, Layout, Modal, Card } from '@ui-kitten/components';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import BottomNavBar from '../../components/BottomNavBar';
import TopNavBar from "../../components/TopNavBar"

import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import database from '../firebaseConnection';
import LogIn from './LogIn';
import SignIn from './SignIn';
import Landing from './Landing';
import Schedule from './Schedule';

const Tab = createBottomTabNavigator();

const Home = ({ navigation, route }) => {
    const params = route.params
    const [Name, setName] = React.useState('');
    const [Phone, setPhone] = React.useState('');

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Layout style={{ flex: 1, paddingRight: '5%', paddingLeft: '5%', paddingTop: '5%' }}>
                    <Text style={{ fontSize: '20', fontWeight: '300' }}>Olá!</Text>
                    <Text style={{ fontSize: '24', fontWeight: '500' }}>Lorem Ipsum</Text>
                </Layout >
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const HomeScreen = ({ navigation, route }) => {
    return (
        <Tab.Navigator
            tabBar={props => <BottomNavBar {...props} />}
        >
            <Tab.Screen name="Inicio" component={Home}
                options={{
                    header: () => <TopNavBar titulo="Início" />
                }} />
            <Tab.Screen name="Sobre Nós" component={LogIn}
                options={{
                    header: () => <TopNavBar titulo="Sobre Nós" />
                }}
            />
            <Tab.Screen name="Exercicios" component={Schedule}
                options={{
                    header: () => <TopNavBar titulo="Agendar" />
                }}
            />
            <Tab.Screen name="Saber Mais" component={Landing}
                options={{
                    header: () => <TopNavBar titulo="Marcações" />
                }}
            />
            <Tab.Screen name="Conta" component={Schedule}
                options={{
                    header: () => <TopNavBar titulo="Perfil" />

                }}
            />
        </Tab.Navigator>
    )
};

export default HomeScreen
