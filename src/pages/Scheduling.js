import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView, } from 'react-native';
import { Layout, Datepicker, NativeDateService, Input, CheckBox, Icon, Modal, Card, } from '@ui-kitten/components';
import { db } from "../firebaseConnection";
import { Timestamp, doc, updateDoc, getDoc, arrayUnion } from "firebase/firestore";

const useDatepickerState = (initialDate = null) => {
    const [date, setDate] = React.useState(initialDate);
    return { date, onSelect: setDate };
};

const filter = (date) => date.getDay() !== 0 && date.getDay() !== 7;

const i18n = {
    dayNames: {
        short: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'],
        long: ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'],
    },
    monthNames: {
        short: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'],
        long: [
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro',
        ],
    },
};

const localeDateService = new NativeDateService('pt', { i18n, startDayOfWeek: 1 });

function Scheduling({ route, navigation }) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    //modais
    const [scheduleDone, setScheduleDone] = React.useState(false);
    const [scheduleErro, setScheduleErro] = React.useState(false);
    const [horaErro, setHoraErro] = React.useState(false);
    const [servicosErro, setServicosErro] = React.useState(false);


    //receber e transformar dados
    const params = route.params

    let load = false
    const [data, setData] = useState(new Date());
    const [hora, setHora] = useState('');
    if (data.toDateString().slice(0, 3) == 'Sun') {
        data.setDate(data.getDate() + 1);
        now.setDate(now.getDate() + 1);
    } else {
        load = true
    }

    const [dataPicker, setDataPicker] = useState(data);


    let erro = false;
    let servicosArr = ['Epilação - Axilas', 'Epilação - Braços', 'Epilação - Buço', 'Epilação - Costas', 'Epilação - Coxa', 'Epilação - Glúteos', 'Epilação - Linha Alba', 'Epilação - Lombar', 'Epilação - Meia Perna', 'Epilação - Meio Braço', 'Epilação - Ombros', 'Epilação - Peito', 'Epilação - Perna', 'Epilação - Queixo', 'Epilação - Rosto', 'Epilação - Sobrancelhas', 'Epilação - Virilha Cavada', 'Epilação - Virilha Completa', 'Manicure - Aplicação - Unhas de Gel', 'Manicure - Aplicação - Verniz Gel', 'Manicure - Manutenção - Unhas de Gel', 'Manicure - Manutenção - Verniz Gel', 'Manicure - Reparação - Unha', 'Pestanas e Sobrancelhas - Aplicação - Extensão de Pestanas', 'Pestanas e Sobrancelhas - Lifting de Pestanas', 'Pestanas e Sobrancelhas - Manutenção - Extensão de Pestanas', 'Pestanas e Sobrancelhas - Permanete de Sobrancelhas', 'Pestanas e Sobrancelhas - Pintura de Pestanas', 'Threading - Buço', 'Threading - Linha Alba', 'Threading - Maças do Rosto', 'Threading - Nariz', 'Threading - Orelhas', 'Threading - Queixo', 'Threading - Rosto', 'Threading - Sobrancelhas'];

    useEffect(() => {
        console.log('UID: ' + params.UID + '\nServiços: ' + params.SERV)

        if (params.SERV.length == 0 || params.SERV == [] || params.SERV == null || params.SERV == undefined) {
            erro = true
            setServicosErro(true);
        }
    }, [])

    async function handleEnviar() {
        console.log(data.toLocaleDateString());
        let dia = data.toLocaleDateString().slice(0, 2);
        let mes = data.toLocaleDateString().slice(3, 5);
        let ano = data.toLocaleDateString().slice(6, 11);
        let horaDB = hora + ':00';
        console.log(dia);
        console.log(mes);
        console.log(ano);
        console.log(horaDB);


        if (hora == '' || hora == null || hora == undefined) {
            erro = true;
            setHoraErro(true);
        }

        let agendaNova = []

        if (!erro) {
            try {
                await getAgenda();
            } catch (error) {
                console.log(error)
            }
            // agendaNova = agenda;
            console.log(agenda)

            let servicosSelected = []
            console.log('Servicos selecionados: ')
            for (let i = 0; i < params.SERV.length; i++) {
                servicosSelected = servicosSelected.concat(servicosArr[params.SERV[i]])
            }

            console.log(servicosSelected);

            // agendaNova = agendaNova.concat([{ 'UID': params.UID, 'data': Timestamp.fromDate(new Date(mes + " " + dia + ", " + ano + ", " + horaDB)), 'servicos': servicosSelected }])
            try {
                const agendaRef = doc(db, "schedules", "testes");
                console.log(new Date(ano + '-' + mes + '-' + dia + 'T' + horaDB).toLocaleString())
                await updateDoc(agendaRef, {
                    agenda: arrayUnion({
                        UID: params.UID,
                        data: Timestamp.fromDate(new Date(ano + '-' + mes + '-' + dia + 'T' + horaDB)),
                        servicos: servicosSelected,
                        estado: 0,
                        aprovado: false,
                    })
                });

            } catch (error) {
                console.log(error);
                return;
            }
            setScheduleDone(true);
        }
    }

    let agendaData = [];
    let dataServico = '';
    let agenda = [];

    async function getAgenda() {
        try {
            const docRef = doc(db, "schedules", "agenda");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data().agenda);
                agendaData = docSnap.data().agenda;

                agendaData.map(({ UID, data, servicos }) => {
                    dataServico = new Date(
                        data.seconds * 1000 + data.nanoseconds / 1000000,
                    );

                    agenda.push({
                        UID: UID,
                        //data: dataServico.toLocaleDateString() + ' ' + dataServico.toLocaleTimeString(),//passar para legivel
                        data: data,
                        servicos: servicos.join(', '),
                    },
                    )
                })

            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.log(error)
        }
    }
    if (load) {

    }
    return (
        <Layout style={{ flex: 1, paddingRight: '5%', paddingLeft: '5%', paddingTop: '5%' }}>
            <ScrollView>
                <View>
                    <Text style={{
                        marginBottom: 10,
                        fontSize: '20',
                        fontWeight: '400',
                    }}>Escolha a Data</Text>
                    <Datepicker
                        placeholder='Pressione para selecionar'
                        style={styles.picker}
                        min={today}
                        date={data}
                        onSelect={nextDate => setData(nextDate)}
                        dateService={localeDateService}
                        filter={filter}
                    />
                    <Text style={{
                        marginTop: 15,
                        fontSize: '20',
                        fontWeight: '400',
                    }}>Escolha a Hora</Text>
                    <Input
                        style={{
                            marginTop: 10,
                            fontSize: '18',
                            fontWeight: '400',
                        }}
                        placeholder="Hora (hh:mm)"
                        keyboardType='numbers-and-punctuation'
                        value={hora}
                        onChangeText={setHora}
                    />
                </View>

                {/* <View>
                    <Text style={styles.titles}>Escolha a Hora</Text>
                    <View style={styles.timeContainer}>
                        <Text>07:00 - 08:00</Text>
                        <View style={styles.freeArea}>
                            <Text>FREE</Text>
                            <View style={styles.radio}></View>
                        </View>
                    </View>

                    <View style={styles.timeContainer}>
                        <Text>08:00 - 09:00</Text>
                        <View style={styles.freeArea}>
                            <Text>FREE</Text>
                            <View style={styles.radio}></View>
                        </View>
                    </View>

                    <View style={styles.timeContainer}>
                        <Text>09:00 - 10:00</Text>
                        <View style={styles.freeArea}>
                            <Text>FREE</Text>
                            <View style={styles.radio}></View>
                        </View>
                    </View>

                    <View style={styles.timeContainer}>
                        <Text>10:00 - 11:00</Text>
                        <View style={styles.freeArea}>
                            <Text>FREE</Text>
                            <View style={styles.radio}></View>
                        </View>
                    </View>

                    <View style={styles.timeContainer}>
                        <Text>11:00 - 12:00</Text>
                        <View style={styles.freeArea}>
                            <Text>FREE</Text>
                            <View style={styles.radio}></View>
                        </View>
                    </View>

                    <View style={styles.timeContainer}>
                        <Text>14:00 - 15:00</Text>
                        <View style={styles.freeArea}>
                            <Text>FREE</Text>
                            <View style={styles.radio}></View>
                        </View>
                    </View>

                    <View style={styles.timeContainer}>
                        <Text>15:00 - 16:00</Text>
                        <View style={styles.freeArea}>
                            <Text>FREE</Text>
                            <View style={styles.radio}></View>
                        </View>
                    </View>

                    <View style={styles.timeContainer}>
                        <Text>16:00 - 17:00</Text>
                        <View style={styles.freeArea}>
                            <Text>FREE</Text>
                            <View style={styles.radio}></View>
                        </View>
                    </View>
                </View> */}
            </ScrollView>
            <View style={styles.btnOK}>
                <Button title='Finalizar Agendamento' color='#fff' onPress={() => {
                    handleEnviar();
                }} />
            </View>


            <Modal
                visible={scheduleDone}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setScheduleDone(false)}>
                <Card disabled={true} style={{ borderRadius: 15, }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <Icon
                            style={styles.warnicon}
                            fill='#8288C3'
                            name='refresh-outline'
                        />
                        <Text style={{ marginBottom: 20, fontWeight: '500' }}>Agendamento Pendente!</Text>
                    </View>
                    <Text style={{ textAlign: 'center', fontWeight: '300' }}>O seu agendamento para {data.toLocaleDateString()}, às {hora}:00 aguarda confirmação.{'\n'}Quando confirmado, receberá uma notificação.</Text>
                    <View style={styles.btnModal}>
                        <Button title='OK' color='#fff' onPress={() => {
                            setScheduleDone(false)
                            navigation.push('Home', { UID: params.UID })
                        }
                        } />
                    </View>
                </Card>
            </Modal>

            <Modal
                visible={horaErro}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setHoraErro(false)}>
                <Card disabled={true} style={{ borderRadius: 15, }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <Icon
                            style={styles.warnicon}
                            fill='#8288C3'
                            name='alert-circle-outline'
                        />
                        <Text style={{ marginBottom: 20, fontWeight: '500' }}>Erro devido a falta de HORA!</Text>
                    </View>
                    <Text style={{ textAlign: 'center', fontWeight: '300' }}>Este erro ocurreu devido a falta de inserção de hora.{'\n'}Use a caixa de texto para inserir a hora no formato correto.</Text>
                    <View style={styles.btnModal}>
                        <Button title='OK' color='#fff' onPress={() => {
                            erro = false;
                            setHoraErro(false);
                        }
                        } />
                    </View>
                </Card>
            </Modal>

            <Modal
                visible={servicosErro}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setServicosErro(false)}>
                <Card disabled={true} style={{ borderRadius: 15, }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <Icon
                            style={styles.warnicon}
                            fill='#8288C3'
                            name='alert-circle-outline'
                        />
                        <Text style={{ marginBottom: 20, fontWeight: '500' }}>Não selecionou nenhum serviço previamente!</Text>
                    </View>
                    <Text style={{ textAlign: 'center', fontWeight: '300' }}>Devido a falta de escolha de serviços na página anterior, será redirecionado para poder efeturar a escolha dos mesmos.</Text>
                    <View style={styles.btnModal}>
                        <Button title='OK' color='#fff' onPress={() => {
                            erro = false;
                            setServicosErro(false);
                            navigation.goBack();
                        }
                        } />
                    </View>
                </Card>
            </Modal>
        </Layout>
    );

};

const styles = StyleSheet.create({
    dataBox: {
        height: 65,
        width: 45,
        borderColor: "#C7CBCF",
        borderWidth: 1,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
    },

    ScrollView: {},

    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        borderColor: '#8288C3',
        borderBottomWidth: 1,
        paddingBottom: 15,
    },

    freeArea: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    radio: {
        height: 15,
        width: 15,
        borderColor: '#C7CBCF',
        borderWidth: 1,
        borderRadius: 30,
        marginLeft: 10,
    },

    titles: {
        fontSize: '22',
        fontWeight: '400',
        marginBottom: 5,
        marginTop: '15%',
    },

    btnOK: {
        backgroundColor: '#8288C3',
        height: 45,
        width: '80%',
        borderRadius: 10,
        marginTop: '2%',
        marginBottom: '7%',
        marginLeft: '10%',
        justifyContent: 'center',
        alignItems: 'center'
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

export default Scheduling;