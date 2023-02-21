import React, { useState } from 'react';
import { View, Image, Dimensions, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// ui kitten
import { Icon, Text, Layout, Card } from '@ui-kitten/components';

// navbars
import BottomNavBar from '../../components/BottomNavBar';
import TopNavBar from "../../components/TopNavBar"

// database
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import database from '../firebaseConnection';

// pages
import LogIn from './LogIn';
import Landing from './Landing';
import Schedule from './Schedule';
import AboutUs from './AboutUs';

const { width } = Dimensions.get('window');

const Tab = createBottomTabNavigator();

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

const Home = ({ navigation, route }) => {
    const params = route.params
    const [Name, setName] = React.useState('');
    const [Phone, setPhone] = React.useState('');


    const [shadowOffsetWidth, setShadowOffsetWidth] = useState(4);
    const [shadowOffsetHeight, setShadowOffsetHeight] = useState(4);
    const [shadowRadius, setShadowRadius] = useState(5);
    const [shadowOpacity, setShadowOpacity] = useState(0.35);

    return (
        <Layout style={{ flex: 1, paddingRight: '5%', paddingLeft: '5%', paddingTop: '5%' }}>
            <ScrollView>
                <View>
                    <Text style={{ fontSize: '20', fontWeight: '300' }}>Olá!</Text>
                    <Text style={{ fontSize: '24', fontWeight: '500' }}>Lorem Ipsum</Text>
                    <Image style={{ width: width * 0.9, height: width * 0.55, borderRadius: 20, marginTop: '5%' }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/pequena-ametista-pap.appspot.com/o/sobreNos.png?alt=media&token=b61ecd03-1c68-42fe-a4a4-92c0950b48ad' }}></Image>
                    <TouchableOpacity style={styles.arrowBtn} onPress={() => navigation.navigate('AboutUs')}>
                        <Icon
                            style={styles.arrowIcon}
                            fill='#fff'
                            name='arrow-forward-outline'
                        />
                    </TouchableOpacity>

                    <Text style={styles.titles}>Próximas Marcações</Text>
                    <View style={styles.scheduleContent}>
                        <View style={styles.contextLeft}>
                            <Text style={styles.date}>09/02/2023</Text>
                        </View>
                        <View style={styles.verticleLine}></View>
                        <View style={styles.contextCenter}>
                            <Text style={styles.hour}>10:25</Text>
                        </View>
                        <View style={styles.contextRight}>
                            <Text style={styles.details} onPress={() => navigation.navigate('Schedule')} >Ver Detalhes</Text>
                        </View>
                    </View>
                    <View style={styles.scheduleContent}>
                        <View style={styles.contextLeft}>
                            <Text style={{ color: '#000' }}>09/02/2023</Text>
                        </View>
                        <View style={styles.verticleLine}></View>
                        <View style={styles.contextCenter}>
                            <Text style={{ color: '#000' }}>10:25</Text>
                        </View>
                        <View style={styles.contextRight}>
                            <Text style={{ color: '#242961' }} onPress={() => navigation.navigate('Schedule')} >Ver Detalhes</Text>
                        </View>
                    </View>

                    <Text style={styles.titles}>Serviços</Text>

                    <View
                        style={[

                        ]}
                    >
                        <Card style={[
                            styles.servicesCard,
                            {
                                shadowOffset: {
                                    width: shadowOffsetWidth,
                                    height: -shadowOffsetHeight,
                                },
                                shadowOpacity,
                                shadowRadius,
                            },
                        ]}>
                            <Image style={{ width: 111, height: 122, marginTop: -17, borderRadius: 10 }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/pequena-ametista-pap.appspot.com/o/nailsCard.png?alt=media&token=7eecf317-9927-4655-954f-2fe25334becf' }} />
                            <Text style={{ marginTop: 10, textAlign: 'center' }}> Unhas </Text>
                        </Card>
                    </View>
                </View>
            </ScrollView>
        </Layout>
    );
}

const styles = StyleSheet.create({
    arrowBtn: {
        width: 5,
        height: 5,
        borderRadius: 100,
        backgroundColor: '#8288C3',
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        marginLeft: '75%',
        marginTop: '74%',
    },

    arrowIcon: {
        height: 30,
        width: 30,
    },

    titles: {
        fontSize: '22',
        fontWeight: '400',
        marginTop: '15%',
        marginBottom: '5%'
    },

    scheduleContent: {
        width: "100%",
        height: "auto",
        backgroundColor: "#fff",
        borderWidth: 0.5,
        borderColor: '#9E9E9E',
        marginBottom: 8,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },

    contextLeft: {
        width: "36%",
        marginLeft: '2%',
        alignItems: "flex-start",
    },

    verticleLine: {
        height: '100%',
        width: 1,
        backgroundColor: '#9E9E9E',
        position: 'absolute',
        marginLeft: 115,
    },

    contextRight: {
        width: "50%",
        alignItems: "flex-end",
    },

    servicesCard: {
        width: 111,
        height: 159,
        borderRadius: 10,
        alignItems: 'center',
        textAlign: 'center',
        shadowColor: 'black',
    },
});

export default HomeScreen;
