import React, { Profiler, useState, useEffect } from 'react';
import { View, Image, Dimensions, StyleSheet, TouchableOpacity, ScrollView, FlatList, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// ui kitten
import { Icon, Text, Layout, Card, Modal } from '@ui-kitten/components';

// database
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"
import { db } from '../firebaseConnection';

const { width } = Dimensions.get('window');

const HomeAdmin = ({ navigation, route }) => {
    const params = route.params

    let userDatas = [];
    const [userData, setUserData] = useState([]);
    const [load, setLoad] = useState(false);

    const [aprovSchedule, setaprovSchedule] = React.useState(false);

    const [agendaData, setAgendaData] = useState([]);
    const [agendaPendentesData, setAgendaPendentesData] = useState([]);
    const [finalUserData, setFinalUserData] = useState([]);

    async function getUser(UID) {
        const userRef = doc(db, "users", UID);
        const user = await getDoc(userRef);

        if (user.exists()) {
            console.log("User nome serviço:", user.data().nome);

            console.log(userDatas.concat(user.data().nome))
            userDatas = userDatas.concat(user.data().nome)
            setFinalUserData(userDatas)
        } else {
            console.log("No such document!");
        }
    }

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
                    getUser(UID);
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

    let data = []
    let loaded = false;
    async function aprovar() {
        try {
            const agendaRef = doc(db, "schedules", "agenda");
            const agenda = await getDoc(agendaRef);
            const agendaTemp = agenda.data().agenda;

            agendaTemp.map(({ UID, aprovado, data, servicos }) => {
                const dataHora = new Date(
                    data.seconds * 1000 + data.nanoseconds / 1000000,
                );

                data.push({
                    UID: UID,
                    aprovado: aprovado,
                    data: dataHora.toLocaleDateString(),
                    hora: dataHora.toLocaleTimeString(),
                    servicos: servicos,
                })
            })

        } catch (error) {
            console.log(error)
        }
        console.log(data)

        let update = false;
        for (let i of data) {
            if (i.aprovado == false) {
                i.aprovado = true;
                update = true
            }
        }


        if (load) {
            for (let j = 0; j < data.length; j++) {
                if (j == 0 && update) {
                    try {
                        await updateDoc(doc(db, "schedules", "testes"), {
                            agenda: FieldValue.delete()
                        });
                    } catch (error) {
                        console.log(error);
                    }

                    try {
                        await updateDoc(doc(db, "schedules", "testes"), {
                            agenda: arrayUnion(data[j])
                        });
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        }
    }

    useEffect(() => {
        try {
            getData().then(() => {

                setLoad(true);
            });
        } catch (error) {
            console.log(error)
        }
    }, [])

    const [infoClick, setInfoClick] = useState(0);// tipo
    const [infoClickMarcacoes, setInfoClickMarcacoes] = useState(0);
    const [infoClickUser, setInfoClickUser] = useState(0);
    const [infoClickPendentes, setInfoClickPendentes] = useState(0);


    if (load) {
        return (
            <Layout style={{ flex: 1, paddingRight: '5%', paddingLeft: '5%', paddingTop: '15%' }}>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View>
                        <Text style={{ fontSize: '20', fontWeight: '300' }}>Olá!</Text>
                        <Text style={{ fontSize: '24', fontWeight: '500' }}>{userData.nome != undefined ? userData.nome : 'Loading...'}</Text>

                        <Text style={styles.titles}>Marcações</Text>
                        {agendaData.map((cliente, index) => {
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
                            )
                        })}

                        <Text style={styles.titles}>Agendamentos Pendentes</Text>
                        {agendaPendentesData.map((cliente, index) => {
                            return (
                                <View style={styles.scheduleContent}>
                                    <View style={styles.contextLeft}>
                                        <Text style={{ fontWeight: '300' }}>{cliente.data}</Text>
                                    </View>
                                    <View style={styles.verticleLine}></View>
                                    <View style={styles.contextCenter}>
                                        <Text style={{ fontWeight: '300' }}>{cliente.hora}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.contextRight} onPress={() => {
                                        setInfoClick(1)
                                        setInfoClickUser(cliente.userIndex);
                                        setInfoClickPendentes(index);
                                        setaprovSchedule(true)
                                    }}>
                                        <Text style={styles.aprov} >Aprovar</Text>
                                        <Icon
                                            style={styles.iconAprov}
                                            fill='#242961'
                                            name='checkmark-circle-outline'
                                        />
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>

                <Modal
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
                </Modal>
            </Layout>
        );
    }
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
        justifyContent: "flex-end",
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    btnOKModal: {
        backgroundColor: '#8288C3',
        height: 45,
        width: '80%',
        borderRadius: 10,
        marginTop: '10%',
        marginLeft: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    btnCancelarModal: {
        backgroundColor: '#dc3545',
        height: 45,
        width: '80%',
        borderRadius: 10,
        marginTop: '2%',
        marginLeft: '10%',
        justifyContent: 'center',
        alignItems: 'center',
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

    aprov: {
        color: '#242961',
        fontWeight: '300',
    },

    iconAprov: {
        marginLeft: 7,
        height: 20,
        width: 20,
    },
});

export default HomeAdmin;