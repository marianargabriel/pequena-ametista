import React, { Profiler, useState, useEffect } from 'react';
import { View, Image, Dimensions, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// ui kitten
import { Icon, Text, Layout, Card, Modal } from '@ui-kitten/components';

// navbars
import BottomNavBar from '../../components/BottomNavBar';
import BottomNavBarAdmin from '../../components/BottomNavBar-Admin';
import TopNavBar from "../../components/TopNavBar"

// database
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"
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
import HomeAdmin from './HomeAdmin';
import SchedulesAdmin from './SchedulesAdmin';

const { width } = Dimensions.get('window');

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation, route }) => {
    console.log(route.params.UID)
    if (route.params.UID == 'Z6gC5LWNNDMuR3snCHMUrSvxMZs2') {
        return (
            <Tab.Navigator
                tabBar={props => <BottomNavBarAdmin {...props} />}
            >
                <Tab.Screen name="Início" component={HomeAdmin}
                    initialParams={{ UID: route.params.UID }}
                    options={{
                        headerShown: false
                    }} />

                <Tab.Screen name="Marcações" component={SchedulesAdmin}
                    initialParams={{ UID: route.params.UID }} />

                <Tab.Screen name="Agendar" component={ScheServices}
                    initialParams={{ UID: route.params.UID }} />

                <Tab.Screen name="Clientes" component={CostumersList}
                    initialParams={{ UID: route.params.UID }} />

                <Tab.Screen name="Perfil" component={Profile}
                    initialParams={{ UID: route.params.UID }} />
            </Tab.Navigator>
        )
    } else {
        return (
            <Tab.Navigator
                tabBar={props => <BottomNavBar {...props} />}
            >
                <Tab.Screen name="Início" component={Home}
                    initialParams={{ UID: route.params.UID }}
                    options={{
                        headerShown: false
                    }} />

                <Tab.Screen name="Contacto" component={Contact}
                    initialParams={{ UID: route.params.UID }}
                    options={{
                        headerShown: false
                    }} />
                <Tab.Screen name="Agendar" component={ScheServices}
                    initialParams={{ UID: route.params.UID }} />

                <Tab.Screen name="Marcações" component={Schedule}
                    initialParams={{ UID: route.params.UID }} />

                <Tab.Screen name="Perfil" component={Profile}
                    initialParams={{ UID: route.params.UID }} />
            </Tab.Navigator>
        )
    }

};

const Home = ({ navigation, route }) => {
    const params = route.params

    let userDatas = []; //acrescentei

    const [aprovSchedule, setaprovSchedule] = React.useState(false);

    const [load, setLoad] = useState(false);
    const [Name, setName] = React.useState('');
    const [Phone, setPhone] = React.useState('');

    const [userData, setUserData] = useState([]);


    const [agendaData, setAgendaData] = useState([]); //acrescentei

    //acrescentei
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

    //acrescentei
    async function getData() {
        const userRef = doc(db, "users", params.UID);
        const user = await getDoc(userRef);

        if (user.exists()) {
            console.log("User nome:", user.data().nome);
            setUserData(user.data())
        } else {
            console.log("No such document!");
        }

        const agendaRef = doc(db, "schedules", "agenda");
        const agenda = await getDoc(agendaRef);
        let dataAgendas = [];
        let dataPendentes = [];

        if (agenda.exists()) {
            console.log("Agenda:", agenda.data().agenda);
            const agendaTemp = agenda.data().agenda

            agendaTemp.map(({ UID, aprovado, data, servicos }, index) => {
                const dataHora = new Date(
                    data.seconds * 1000 + data.nanoseconds / 1000000,
                );
                try {
                    // getUser(UID);
                } catch (error) {
                    console.log(error)
                }

                if (aprovado) {
                    dataAgendas.push({
                        userIndex: index,
                        UID: UID,
                        data: dataHora.toLocaleDateString(),
                        hora: dataHora.toLocaleTimeString().slice(0, 5),
                        servicos: servicos.join(', '),
                    })
                } else {
                    dataPendentes.push({
                        userIndex: index,
                        UID: UID,
                        data: dataHora.toLocaleDateString(),
                        hora: dataHora.toLocaleTimeString().slice(0, 5),
                        servicos: servicos.join(', '),
                    })
                }
            })
        } else {
            console.log("No such document!");
        }
        setAgendaData(dataAgendas)
        setAgendaPendentesData(dataPendentes)
    }

    // useEffect(() => {
    //     getUserData();
    // }, [])

    //acrescentei
    useEffect(() => {
        try {
            getData().then(() => {

                setLoad(true);
            });
        } catch (error) {
            console.log(error)
        }
    }, [])

    const [shadowOffsetWidth, setShadowOffsetWidth] = useState(4);
    const [shadowOffsetHeight, setShadowOffsetHeight] = useState(4);
    const [shadowRadius, setShadowRadius] = useState(5);
    const [shadowOpacity, setShadowOpacity] = useState(0.35);

    //acrescentei
    const [infoClick, setInfoClick] = useState(0);// tipo
    const [infoClickMarcacoes, setInfoClickMarcacoes] = useState(0);
    const [infoClickUser, setInfoClickUser] = useState(0);
    const [infoClickPendentes, setInfoClickPendentes] = useState(0);

    return (
        <Layout style={{ flex: 1, paddingRight: '5%', paddingLeft: '5%', paddingTop: '15%' }}>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View>
                    <Text style={{ fontSize: '20', fontWeight: '300' }}>Olá!</Text>
                    <Text style={{ fontSize: '24', fontWeight: '500' }}>{userData.nome != undefined ? userData.nome : 'Loading...'}</Text>
                    <Image style={{ width: width * 0.9, height: width * 0.55, borderRadius: 20, marginTop: '5%' }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/pequena-ametista-pap.appspot.com/o/sobreNos.png?alt=media&token=b61ecd03-1c68-42fe-a4a4-92c0950b48ad' }}></Image>
                    <TouchableOpacity style={styles.arrowBtn} onPress={() => navigation.navigate('AboutUs')}>
                        <Icon
                            style={styles.arrowIcon}
                            fill='#fff'
                            name='arrow-forward-outline'
                        />
                    </TouchableOpacity>

                    <Text style={styles.titles}>Próximas Marcações</Text>
                    {agendaData.map((cliente, index) => {
                        if (index >= 1) {
                            return (
                                <View style={styles.scheduleContent}>
                                    <View style={styles.contextLeft}>
                                        <Text style={{ fontWeight: '300' }}>{cliente.data}</Text>
                                    </View>
                                    <View style={styles.verticleLine}></View>
                                    <View style={styles.contextCenter}>
                                        <Text style={{ fontWeight: '300' }}>{cliente.hora}</Text>
                                    </View>
                                    <View style={styles.contextRight}>
                                        <Text style={styles.details} onPress={() => {
                                            setInfoClick(0);
                                            setInfoClickMarcacoes(index);
                                            setInfoClickUser(cliente.userIndex);
                                            setaprovSchedule(true);
                                        }} >Ver Detalhes</Text>
                                    </View>
                                </View>
                                // <View style={styles.scheduleContent}>
                                //     <View style={styles.contextLeft}>
                                //         <Text style={{ fontWeight: '300' }}>10/05/2023</Text>
                                //     </View>
                                //     <View style={styles.verticleLine}></View>
                                //     <View style={styles.contextCenter}>
                                //         <Text style={{ fontWeight: '300' }}>10:25</Text>
                                //     </View>
                                //     <View style={styles.contextRight}>
                                //         <Text style={styles.details} onPress={() => navigation.navigate('Scheduling')} >Ver Detalhes</Text>
                                //     </View>
                                // </View>
                            )
                        }
                    })}

                    <Text style={styles.titles}>Serviços</Text>

                    <View style={{
                        flex: 1,
                        justifyContent: "space-between",
                        flexDirection: "row"
                    }}>
                        {/* Card Unhas */}
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
                            <Image style={{ width: 111, height: 122, marginTop: -17, borderRadius: 12 }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/pequena-ametista-pap.appspot.com/o/nailsCard.png?alt=media&token=7eecf317-9927-4655-954f-2fe25334becf' }} />
                            <Text style={styles.servicesText}> Unhas </Text>
                        </Card>

                        {/* Card Epilação */}
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
                            <Image style={{ width: 111, height: 122, marginTop: -17, borderRadius: 12 }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/pequena-ametista-pap.appspot.com/o/epilationCard.png?alt=media&token=b11e4835-c108-4445-a643-b85307a2708e' }} />
                            <Text style={styles.servicesText}> Epilação </Text>
                        </Card>

                        {/* Card Threading */}
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
                            <Image style={{ width: 111, height: 122, marginTop: -17, borderRadius: 12 }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/pequena-ametista-pap.appspot.com/o/threadingCard.png?alt=media&token=0f5603f2-267e-421a-9b38-7407c261e03c' }} />
                            <Text style={styles.servicesText}> Threading </Text>
                        </Card>

                        {/* Card Pestanas */}
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
                            <Image style={{ width: 111, height: 122, marginTop: -17, borderRadius: 12 }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/pequena-ametista-pap.appspot.com/o/eyelashesCard.png?alt=media&token=ec101fdb-6035-493f-ba42-5cf79a6b508e' }} />
                            <Text style={styles.servicesText}> Pestanas </Text>
                        </Card>
                    </View>
                </View>
                <Text style={styles.seeAll} onPress={() => navigation.navigate('Services')}>Ver Tudo</Text>
            </ScrollView>
            {/* <Modal
                visible={aprovSchedule}
                style={{ minWidth: 330 }}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setaprovSchedule(false)}>
                <Card disabled={true} style={{ borderRadius: 15, }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <Icon
                            style={styles.warnicon}
                            fill='#8288C3'
                            name='refresh-outline'
                        />
                        <Text style={{ marginBottom: 20, fontWeight: '500' }}>{infoClick == 1 ? 'Deseja aprovar o agendamento?' : 'Dados de Marcação'}</Text>
                    </View>
                    <Text style={{ textAlign: 'center', fontWeight: '300' }}>Data: {infoClick == 1 ? agendaPendentesData[infoClickPendentes].data : agendaData[infoClickMarcacoes].data}{'\n'}Hora: {infoClick == 1 ? agendaPendentesData[infoClickPendentes].hora : agendaData[infoClickMarcacoes].hora}{'\n'}Serviço: {infoClick == 1 ? agendaPendentesData[infoClickPendentes].servicos : agendaData[infoClickMarcacoes].servicos}{'\n'}Cliente: {infoClick == 1 ? finalUserData[infoClickUser] : finalUserData[infoClickUser]}{'\n'}</Text>

                    <View style={styles.btnOKModal}>
                        <Button title={infoClick == 1 ? 'Aprovar' : 'OK'} color='#fff' onPress={() => {
                            setaprovSchedule(false);
                            aprovar();
                            // navigation.push('Home', { UID: params.UID })
                        }
                        } />
                    </View>
                    <View style={styles.btnCancelarModal}>
                        <Button title='Cancelar' color='#fff' onPress={() => {
                            setaprovSchedule(false)

                            // navigation.push('Home', { UID: params.UID })
                        }
                        } />
                    </View>
                </Card>
            </Modal> */}
        </Layout >
    );
}


const styles = StyleSheet.create({
    arrowBtn: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: '#8288C3',
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 195,
        right: -35,
        margin: 70,
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

    seeAll: {
        marginTop: '1%',
        color: '#242961',
        textDecorationLine: 'underline',
        alignItems: "flex-end",
        fontWeight: '300',
        marginBottom: 25
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

    servicesCard: {
        width: 111,
        height: 159,
        borderRadius: 12,
        alignItems: 'center',
        textAlign: 'center',
        shadowColor: 'black',
        marginRight: '2%',
    },

    servicesText: {
        fontWeight: '300',
        marginTop: 10,
        textAlign: 'center',
    },
});

export default HomeScreen;
