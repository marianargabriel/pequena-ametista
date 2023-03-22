import React, { Profiler, useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Button, Text } from 'react-native';

// ui kitten
import { Layout } from '@ui-kitten/components';

//firebase
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebaseConnection';

export default function Services({ navigation }) {
    const [servicesData, setServiceData] = useState([]);
    let data = [];
    let load = false;
    let services = ['Epilação', 'Manicure', 'Pestanas e Sobrancelhas', 'Threading'];
    let servicesTitulos = [{ 'titulo': 'Epilação' }, { 'titulo': 'Manicure' }, { 'titulo': 'Pestanas e Sobrancelhas' }, { 'titulo': 'Threading' }];
    let epilacao = ['Abdómen', 'Axilas', 'Braços', 'Buço', 'Costas', 'Coxa', 'Glúteos', 'Linha Alba', 'Lombar', 'Meia Perna', 'Meio Braço', 'Ombros', 'Peito', 'Perna Inteira', 'Queixo', 'Rosto', 'Sobrancelhas', 'Virilha Cavada', 'Virilha Completa'];
    let manicure = ['Aplicação - Unhas de Gel', 'Aplicação - Verniz Gel', 'Manutenção - Unhas de Gel', 'Manutenção - Verniz Gel', 'Reparação Unha'];
    let pestSobran = ['Aplicação - Extensão de Pestanas', 'Lifting de Pestanas', 'Manutenção - Extensão de Pestanas', 'Permanente de Sobrancelhas', 'Pintura de Pestanas'];
    let threading = ['Buço', 'Linha Alba', 'Maças do Rosto', 'Nariz', 'Orelhas', 'Queixo', 'Rosto', 'Sobrancelhas'];

    async function getServ() {
        for (let i = 0; i < services.length; i++) {
            const servRef = doc(db, "services", services[i]);
            const servicesDoc = await getDoc(servRef);

            if (servicesDoc.exists()) {
                let r = i == 0 ? epilacao.length : i == 1 ? manicure.length : i == 2 ? pestSobran.length : i == 3 ? threading.length : epilacao.length
                for (let j = 0; j < r; j++) {
                    data.push({
                        tipo: services[i],
                        subTipo: i == 0 ? epilacao[j] : i == 1 ? manicure[j] : i == 2 ? pestSobran[j] : i == 3 ? threading[j] : epilacao[j],
                        duracao: i == 0 ? servicesDoc.data()[epilacao[j]].Duração : i == 1 ? servicesDoc.data()[manicure[j]].Duração : i == 2 ? servicesDoc.data()[pestSobran[j]].Duração : i == 3 ? servicesDoc.data()[threading[j]].Duração : servicesDoc.data()[epilacao[j]].Duração,
                        preco: i == 0 ? servicesDoc.data()[epilacao[j]].Preço.toFixed(2) : i == 1 ? servicesDoc.data()[manicure[j]].Preço.toFixed(2) : i == 2 ? servicesDoc.data()[pestSobran[j]].Preço.toFixed(2) : i == 3 ? servicesDoc.data()[threading[j]].Preço.toFixed(2) : servicesDoc.data()[epilacao[j]].Preço.toFixed(2),
                    })

                }
                load = true;
            } else {
                console.log("No such document!");
            }
        }
        if (load) {
            setServiceData(data);
        }
    }

    useEffect(() => {
        getServ();
    }, []);

    const [shadowOffsetWidth, setShadowOffsetWidth] = useState(4);
    const [shadowOffsetHeight, setShadowOffsetHeight] = useState(4);
    const [shadowRadius, setShadowRadius] = useState(5);
    const [shadowOpacity, setShadowOpacity] = useState(0.35);

    return (
        <Layout style={{ flex: 1, padding: '5%' }}>
            <ScrollView>
                {servicesTitulos.map(({ titulo }, index) => {
                    return (
                        <>
                            <Text style={styles.titles}>{titulo}</Text>
                            <View style={{ marginBottom: '15%' }}>
                                {servicesData.map(({ tipo, subTipo, duracao, preco }, id) => {
                                    if (index == 0) {
                                        if (id <= 18) {
                                            return (
                                                <>
                                                    <Text style={styles.textServices}>{subTipo}</Text>
                                                    <View style={styles.textPrice}>
                                                        <Text style={styles.textPrice}>{preco}€</Text>
                                                    </View>
                                                </>
                                            )
                                        }
                                    }
                                    else if (index == 1) {
                                        if (id >= 19 && id <= 23) {
                                            return (
                                                <>
                                                    <Text style={styles.textServices}>{subTipo}</Text>
                                                    <View style={styles.textPrice}>
                                                        <Text style={styles.textPrice}>{preco}€</Text>
                                                    </View>
                                                </>
                                            )
                                        }
                                    }
                                    else if (index == 2) {
                                        if (id >= 24 && id <= 28) {
                                            return (
                                                <>
                                                    <Text style={styles.textServices}>{subTipo}</Text>
                                                    <View style={styles.textPrice}>
                                                        <Text style={styles.textPrice}>{preco}€</Text>
                                                    </View>
                                                </>
                                            )
                                        }
                                    }
                                    else if (index == 3) {
                                        if (id >= 29 && id <= 37) {
                                            return (
                                                <>
                                                    <Text style={styles.textServices}>{subTipo}</Text>
                                                    <View style={styles.textPrice}>
                                                        <Text style={styles.textPrice}>{preco}€</Text>
                                                    </View>
                                                </>
                                            )
                                        }
                                    }
                                })}
                            </View>
                        </>
                    )
                })}

            </ScrollView>
            <View style={styles.btnSchedule}>
                <Button title='Quero Fazer um Agendamento' color='#fff' onPress={() => navigation.navigate('Scheduling')} />
            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    titles: {
        fontSize: '22',
        fontWeight: '400',
        marginBottom: '3%'
    },

    btnSchedule: {
        backgroundColor: '#8288C3',
        height: 45,
        width: '80%',
        borderRadius: 10,
        marginTop: '2%',
        marginBottom: '2%',
        marginLeft: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    textServices: {
        fontWeight: '300',
        fontSize: '17',
        marginBottom: 3,
    },

    textPrice: {
        fontWeight: '300',
        fontSize: '17',
        marginTop: '-2.8%',
        alignItems: "flex-end",
        marginBottom: 3,
    },
});