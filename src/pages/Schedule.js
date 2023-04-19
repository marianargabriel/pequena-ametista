import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"
import { db } from '../firebaseConnection';

const bookings = [
    {
        id: 1,
        date: '17/05/2023',
        time: '11:30',
        service: 'Threading',
        details: 'Sobrancelhas',
    },

    {
        id: 2,
        date: '21/05/2023',
        time: '12:30',
        service: 'Epilação',
        details: 'Abdómen',
    },
];

const Schedule = () => {

    // const params = route.params

    // let userDatas = [];
    // const [userData, setUserData] = useState([]);
    // const [load, setLoad] = useState(false);

    // const [aprovSchedule, setaprovSchedule] = React.useState(false);

    // const [agendaData, setAgendaData] = useState([]);
    // const [agendaPendentesData, setAgendaPendentesData] = useState([]);
    // const [finalUserData, setFinalUserData] = useState([]);

    // async function getUser(UID) {
    //     const userRef = doc(db, "users", UID);
    //     const user = await getDoc(userRef);

    //     if (user.exists()) {
    //         console.log("User nome serviço:", user.data().nome);

    //         console.log(userDatas.concat(user.data().nome))
    //         userDatas = userDatas.concat(user.data().nome)
    //         setFinalUserData(userDatas)
    //     } else {
    //         console.log("No such document!");
    //     }
    // }

    // async function getData() {
    //     const userRef = doc(db, "users", params.UID);
    //     const user = await getDoc(userRef);

    //     if (user.exists()) {
    //         console.log("User nome:", user.data().nome);
    //         setUserData(user.data())
    //     } else {
    //         console.log("No such document!");
    //     }

    //     const agendaRef = doc(db, "schedules", "agenda");
    //     const agenda = await getDoc(agendaRef);
    //     let dataAgendas = [];
    //     let dataPendentes = [];

    //     if (agenda.exists()) {
    //         console.log("Agenda:", agenda.data().agenda);
    //         const agendaTemp = agenda.data().agenda

    //         agendaTemp.map(({ UID, aprovado, data, servicos }, index) => {
    //             const dataHora = new Date(
    //                 data.seconds * 1000 + data.nanoseconds / 1000000,
    //             );
    //             try {
    //                 getUser(UID);
    //             } catch (error) {
    //                 console.log(error)
    //             }

    //             if (aprovado) {
    //                 dataAgendas.push({
    //                     userIndex: index,
    //                     UID: UID,
    //                     data: dataHora.toLocaleDateString(),
    //                     hora: dataHora.toLocaleTimeString().slice(0, 5),
    //                     servicos: servicos.join(', '),
    //                 })
    //             } else {
    //                 dataPendentes.push({
    //                     userIndex: index,
    //                     UID: UID,
    //                     data: dataHora.toLocaleDateString(),
    //                     hora: dataHora.toLocaleTimeString().slice(0, 5),
    //                     servicos: servicos.join(', '),
    //                 })
    //             }
    //         })
    //     } else {
    //         console.log("No such document!");
    //     }
    //     setAgendaData(dataAgendas)
    //     setAgendaPendentesData(dataPendentes)
    // }

    // let data = []
    // let loaded = false;
    // async function aprovar() {
    //     try {
    //         const agendaRef = doc(db, "schedules", "agenda");
    //         const agenda = await getDoc(agendaRef);
    //         const agendaTemp = agenda.data().agenda;

    //         agendaTemp.map(({ UID, aprovado, data, servicos }) => {
    //             const dataHora = new Date(
    //                 data.seconds * 1000 + data.nanoseconds / 1000000,
    //             );

    //             data.push({
    //                 UID: UID,
    //                 aprovado: aprovado,
    //                 data: dataHora.toLocaleDateString(),
    //                 hora: dataHora.toLocaleTimeString(),
    //                 servicos: servicos,
    //             })
    //         })

    //     } catch (error) {
    //         console.log(error)
    //     }
    //     console.log(data)

    //     let update = false;
    //     for (let i of data) {
    //         if (i.aprovado == false) {
    //             i.aprovado = true;
    //             update = true
    //         }
    //     }


    //     if (load) {
    //         for (let j = 0; j < data.length; j++) {
    //             if (j == 0 && update) {
    //                 try {
    //                     await updateDoc(doc(db, "schedules", "testes"), {
    //                         agenda: FieldValue.delete()
    //                     });
    //                 } catch (error) {
    //                     console.log(error);
    //                 }

    //                 try {
    //                     await updateDoc(doc(db, "schedules", "testes"), {
    //                         agenda: arrayUnion(data[j])
    //                     });
    //                 } catch (error) {
    //                     console.log(error);
    //                 }
    //             }
    //         }
    //     }
    // }

    // useEffect(() => {
    //     try {
    //         getData().then(() => {

    //             setLoad(true);
    //         });
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }, [])

    // const [infoClick, setInfoClick] = useState(0);// tipo
    // const [infoClickMarcacoes, setInfoClickMarcacoes] = useState(0);
    // const [infoClickUser, setInfoClickUser] = useState(0);
    // const [infoClickPendentes, setInfoClickPendentes] = useState(0);

    const [selectedBooking, setSelectedBooking] = useState(null);

    const handleBookingPress = (booking) => {
        setSelectedBooking(booking);
    };

    const renderBookingItem = ({ item }) => (
        <TouchableOpacity style={styles.bookingItem} onPress={() => handleBookingPress(item)}>
            <Text style={styles.bookingDate}>{item.date}</Text>
            <Text style={styles.bookingTime}>{item.time}</Text>
            <Text style={styles.bookingService}>{item.service}</Text>
            <Text style={styles.bookingClient}>{item.client}</Text>
        </TouchableOpacity>
    );
    
    return (
        <View style={styles.container}>
            <FlatList
                data={bookings}
                renderItem={renderBookingItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.bookingsList}
            />
            {selectedBooking && (
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>Detalhes da Marcação</Text>
                    <Text style={styles.detailsText}>{selectedBooking.details}</Text>
                    <TouchableOpacity
                        style={styles.detailsButton}
                        onPress={() => setSelectedBooking(null)}
                    >
                        <Text style={styles.detailsButtonText}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    bookingsList: {
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    bookingItem: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    bookingDate: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    bookingTime: {
        fontSize: 16,
        marginBottom: 5,
    },
    bookingService: {
        fontSize: 16,
        marginBottom: 5,
    },
    bookingClient: {
        fontSize: 16,
    },
    detailsContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
    },
    detailsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    detailsText: {
        fontSize: 16,
        marginBottom: 20,
    },
    detailsButton: {
        backgroundColor: '#FFC0CB',
        borderRadius: 10,
        padding: 10,
    },
    detailsButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
    },
});

export default Schedule;