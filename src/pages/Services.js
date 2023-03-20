import React, { Profiler, useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Button, Text } from 'react-native';

// ui kitten
import { Layout } from '@ui-kitten/components';

//firebase
import { doc, setDoc } from "firebase/firestore";
import { db } from '../firebaseConnection';

export default function Services({ navigation }) {
    const [servicesData, setServiceData] = useState([]);
    let data = [];
    let i = 0
    let services = ['Epilação', 'Manicure', 'Pestanas e Sobrancelhas', 'Threading'];

    useEffect(async () => {
        for (i = 0; i >= services.length; i++) {
            console.log(services[i])
        }
        // const servRef = doc(db, "cities", "SF");
        // const services = await getDoc(servRef);

        // if (services.exists()) {
        //     console.log("Document data:", services.data());


        // } else {
        //     // doc.data() will be undefined in this case
        //     console.log("No such document!");
        // }
    }, []);

    const [shadowOffsetWidth, setShadowOffsetWidth] = useState(4);
    const [shadowOffsetHeight, setShadowOffsetHeight] = useState(4);
    const [shadowRadius, setShadowRadius] = useState(5);
    const [shadowOpacity, setShadowOpacity] = useState(0.35);

    return (
        <Layout style={{ flex: 1, padding: '5%' }}>
            <ScrollView>
                <Text style={styles.titles}>Manicure</Text>
                <View style={{ marginBottom: '15%' }}>
                    <Text style={styles.textServices}>Aplicação - Unhas de Gel</Text>
                    <View style={styles.textPrice}>
                        <Text style={styles.textPrice}>20.00€</Text>
                    </View>

                    <Text style={styles.textServices}>Aplicação - Verniz Gel</Text>
                    <View style={styles.textPrice}>
                        <Text style={styles.textPrice}>13.00€</Text>
                    </View>
                </View>

                <Text style={styles.titles}>Epilação</Text>
                <View style={{ marginBottom: '15%' }}>
                    <Text style={styles.textServices}>Abdómen</Text>
                    <View style={styles.textPrice}>
                        <Text style={styles.textPrice}>8.00€</Text>
                    </View>

                    <Text style={styles.textServices}>Axilas</Text>
                    <View style={styles.textPrice}>
                        <Text style={styles.textPrice}>6.00€</Text>
                    </View>
                </View>

                <Text style={styles.titles}>Threading</Text>
                <View style={{ marginBottom: '15%' }}>
                    <Text style={styles.textServices}>Buço</Text>
                    <View style={styles.textPrice}>
                        <Text style={styles.textPrice}>5.00€</Text>
                    </View>

                    <Text style={styles.textServices}>Linha Alba</Text>
                    <View style={styles.textPrice}>
                        <Text style={styles.textPrice}>4.00€</Text>
                    </View>
                </View>

                <Text style={styles.titles}>Pestanas e Sobrancelhas</Text>
                <View style={{ marginBottom: '15%' }}>
                    <Text style={styles.textServices}>Aplicação - Extensão de Pestanas</Text>
                    <View style={styles.textPrice}>
                        <Text style={styles.textPrice}>35.00€</Text>
                    </View>

                    <Text style={styles.textServices}>Lifting de Pestanas</Text>
                    <View style={styles.textPrice}>
                        <Text style={styles.textPrice}>20.00€</Text>
                    </View>
                </View>

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
        marginTop: '10%',
        marginLeft: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    textServices: {
        fontWeight: '300',
        fontSize: '17',
    },

    textPrice: {
        fontWeight: '300',
        fontSize: '17',
        marginTop: '-2.8%',
        alignItems: "flex-end",
    },
});