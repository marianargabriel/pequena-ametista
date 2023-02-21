import React, { useEffect, useState } from 'react';
import { Image, Dimensions, StyleSheet, TouchableOpacity, ScrollView, Title, View } from 'react-native';
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
import AboutUs from './AboutUs';

const Tab = createBottomTabNavigator();

const Home = ({ navigation, route }) => {
    const params = route.params
    const [Name, setName] = React.useState('');
    const [Phone, setPhone] = React.useState('');

    const { width } = Dimensions.get('window');

    return (
        <Layout style={{ flex: 1, paddingRight: '5%', paddingLeft: '5%', paddingTop: '15%' }}>
            <ScrollView>
                <Text style={{ fontSize: '20', fontWeight: '300' }}>Olá!</Text>
                <Text style={{ fontSize: '24', fontWeight: '500' }}>Lorem Ipsum</Text>
                <Image style={{ width: width * 0.9, height: width * 0.35 * 1.70, marginTop: '5%', borderRadius: 26 }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/pequena-ametista-pap.appspot.com/o/sobreNos.png?alt=media&token=b61ecd03-1c68-42fe-a4a4-92c0950b48ad' }}></Image>
                <TouchableOpacity style={styles.aboutBtn}
                    onPress={() => navigation.navigate('AboutUs')}>
                    <Icon name='arrow-forward-outline' color='#000' size='20' />
                </TouchableOpacity>

                <Text style={{ fontSize: '22', fontWeight: '400', marginTop: '15%', marginBottom: '5%' }}>Próximas Marcações</Text>
                <View style={styles.mainContent}>
                    <Text style={styles.contextLeft}>21/02/2023</Text>
                    <View style={styles.verticleLine}/>
                    <Text style={styles.contextRight}>16:53</Text>
                    <Text style={styles.btnDetails}>Ver Detalhes</Text>
                </View>

                <View style={styles.mainContent}>
                    <Text style={styles.contextLeft}>21/02/2023</Text>
                    <View style={styles.verticleLine}/>
                    <Text style={styles.contextRight}>16:53</Text>
                    <Text style={styles.btnDetails}>Ver Detalhes</Text>
                </View>

            </ScrollView>
        </Layout >
    );
}

const HomeScreen = ({ navigation, route }) => {
    return (
        <Tab.Navigator
            tabBar={props => <BottomNavBar {...props} />}
        >
            <Tab.Screen name="Início" component={Home}
                options={{
                    headerShown: false
                }} />

            <Tab.Screen name="Sobre Nós" component={AboutUs}
                options={{
                    header: () => <TopNavBar titulo="Sobre Nós" />
                }} />
            <Tab.Screen name="Agendar" component={Schedule}
                options={{
                    header: () => <TopNavBar titulo="Agendar" />
                }} />
            <Tab.Screen name="Marcações" component={Landing}
                options={{
                    header: () => <TopNavBar titulo="Marcações" />
                }} />
            <Tab.Screen name="Perfil" component={Schedule}
                options={{
                    header: () => <TopNavBar titulo="Perfil" />

                }} />
        </Tab.Navigator>
    )
};

const styles = StyleSheet.create({
    aboutBtn: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        top: 275,
        left: 260,
        backgroundColor: "#8288C3",
        padding: 30,
        borderRadius: 50,
    },

    mainContent: {
        width: "100%",
        height: "auto",
        backgroundColor: "#fff",
        marginBottom: 10,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        borderColor: '#9E9E9E',
        borderWidth: 0.2,
        padding: 10,
    },

    contextLeft: {
        width: "28%",
        alignItems: "flex-start",
    },

    verticleLine: {
        height: '100%',
        width: 1,
        marginRight: '5%',
        backgroundColor: '#9E9E9E',
    },

    btnDetails: {
        marginLeft: "30%",
        alignItems: "flex-end",
        color: "#242961",
    },
})

export default HomeScreen;