import React, { Profiler, useState, useEffect } from 'react';
import { View, Image, Dimensions, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// ui kitten
import { Icon, Text, Layout, Card, Button, Modal } from '@ui-kitten/components';

// navbars
import BottomNavBar from '../../components/BottomNavBar';
import TopNavBar from "../../components/TopNavBar"

// database
import { doc, getDoc } from "firebase/firestore"
import { db } from '../firebaseConnection';

// pages
import LogIn from './LogIn';
import Landing from './Landing';
import Schedule from './Schedule';
import ScheServices from './ScheServices';
import AboutUs from './AboutUs';
import Profile from './Profile';
import CostumersList from './CostumersList';
import Contact from './Contact';

const { width } = Dimensions.get('window');

const Tab = createBottomTabNavigator();

// const HomeAdmin = ({ navigation, route }) => {
//     return (
//         <Tab.Navigator
//             tabBar={props => <BottomNavBar {...props} />}
//         >
//             <Tab.Screen name="Início" component={HomeAdmin}
//                 initialParams={{ UID: route.params.UID }}
//                 options={{
//                     headerShown: false
//                 }} />

//             <Tab.Screen name="Contacto" component={Contact}
//                 initialParams={{ UID: route.params.UID }}
//                 options={{
//                     headerShown: false
//                 }} />
//             <Tab.Screen name="Agendar" component={ScheServices}
//                 initialParams={{ UID: route.params.UID }} />

//             <Tab.Screen name="Marcações" component={Schedule}
//                 initialParams={{ UID: route.params.UID }} />

//             <Tab.Screen name="Perfil" component={Profile}
//                 initialParams={{ UID: route.params.UID }} />
//         </Tab.Navigator>
//     )
// };

const HomeAdmin = ({ navigation, route }) => {
    const params = route.params
    const [Name, setName] = React.useState('');
    const [Phone, setPhone] = React.useState('');

    const [userData, setUserData] = useState([]);

    const [aprovSchedule, setaprovSchedule] = React.useState(false);

    async function getUserData() {
        console.log(params.UID)
        const userRef = doc(db, "users", params.UID);
        const user = await getDoc(userRef);

        if (user.exists()) {
            console.log("User nome:", user.data().nome);
            setUserData(user.data())
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    useEffect(() => {
        getUserData();
    }, [])

    const [shadowOffsetWidth, setShadowOffsetWidth] = useState(4);
    const [shadowOffsetHeight, setShadowOffsetHeight] = useState(4);
    const [shadowRadius, setShadowRadius] = useState(5);
    const [shadowOpacity, setShadowOpacity] = useState(0.35);

    return (
        <Layout style={{ flex: 1, paddingRight: '5%', paddingLeft: '5%', paddingTop: '15%' }}>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View>
                    <Text style={{ fontSize: '20', fontWeight: '300' }}>Olá!</Text>
                    <Text style={{ fontSize: '24', fontWeight: '500' }}>{userData.nome != undefined ? userData.nome : 'Loading...'}</Text>

                    <Text style={styles.titles}>Marcações de Hoje</Text>
                    <View style={styles.scheduleContent}>
                        <View style={styles.contextLeft}>
                            <Text style={{ fontWeight: '300' }}>09/05/2023</Text>
                        </View>
                        <View style={styles.verticleLine}></View>
                        <View style={styles.contextCenter}>
                            <Text style={{ fontWeight: '300' }}>10:25</Text>
                        </View>
                        <View style={styles.contextRight}>
                            <Text style={styles.details} onPress={() => navigation.navigate('SchedulesAdmin')} >Ver Detalhes</Text>
                        </View>
                    </View>
                    <View style={styles.scheduleContent}>
                        <View style={styles.contextLeft}>
                            <Text style={{ fontWeight: '300' }}>10/05/2023</Text>
                        </View>
                        <View style={styles.verticleLine}></View>
                        <View style={styles.contextCenter}>
                            <Text style={{ fontWeight: '300' }}>10:25</Text>
                        </View>
                        <View style={styles.contextRight}>
                            <Text style={styles.details} onPress={() => navigation.navigate('SchedulesAdmin')} >Ver Detalhes</Text>
                        </View>
                    </View>


                    <Text style={styles.titles}>Agendamentos Pendentes</Text>
                    <View style={styles.scheduleContent}>
                        <View style={styles.contextLeft}>
                            <Text style={{ fontWeight: '300' }}>09/05/2023</Text>
                        </View>
                        <View style={styles.verticleLine}></View>
                        <View style={styles.contextCenter}>
                            <Text style={{ fontWeight: '300' }}>10:25</Text>
                        </View>
                        <View style={styles.contextRight}>
                            <Text style={styles.details} onPress={() => navigation.navigate('Scheduling')} >Aprovar</Text>
                        </View>
                    </View>
                    <View style={styles.scheduleContent}>
                        <View style={styles.contextLeft}>
                            <Text style={{ fontWeight: '300' }}>10/05/2023</Text>
                        </View>
                        <View style={styles.verticleLine}></View>
                        <View style={styles.contextCenter}>
                            <Text style={{ fontWeight: '300' }}>10:25</Text>
                        </View>
                        <View style={styles.contextRight}>
                            <Text style={styles.details} onPress={() => setaprovSchedule(true) } >Aprovar</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <Modal
                visible={aprovSchedule}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setaprovSchedule(false)}>
                <Card disabled={true} style={{ borderRadius: 15, }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <Icon
                            style={styles.warnicon}
                            fill='#8288C3'
                            name='refresh-outline'
                        />
                        <Text style={{ marginBottom: 20, fontWeight: '500' }}>Deseja aprovar o agendamento?</Text>
                    </View>
                    <Text style={{ textAlign: 'center', fontWeight: '300' }}>Data: {'\n'}Hora: {'\n'}Serviço: {'\n'}Cliente: {'\n'}</Text>
                    <View style={styles.btnModal}>
                        <Button title='Aprovar' color='#fff' onPress={() => {
                            setScheduleDone(false)
                            navigation.push('Home', { UID: params.UID })
                        }
                        } />
                    </View>
                </Card>
            </Modal>
        </Layout>
    );
}

const styles = StyleSheet.create({

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
        borderWidth: 0.2,
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

    // contextCenter: {
    //     flexDirection: "row",
    // },

    verticleLine: {
        height: '100%',
        width: 1,
        backgroundColor: '#9E9E9E',
        position: 'absolute',
        marginLeft: 115,
    },

    details: {
        color: '#242961',
        textDecorationLine: 'underline',
        fontWeight: '300',
    },

    contextRight: {
        width: "50%",
        alignItems: "flex-end",
    },

    btnModal: {
        backgroundColor: '#8288C3',
        height: 45,
        width: '70%',
        borderRadius: 10,
        marginTop: '10%',
        marginLeft: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    warnicon: {
        height: 35,
        width: 35,
        marginRight: 10,
        marginBottom: 20,
    },
});

export default HomeAdmin;