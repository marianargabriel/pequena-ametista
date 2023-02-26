import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { Layout, Text, Avatar, Icon, Input, Button } from '@ui-kitten/components';
import database from "../firebaseConnection";
import { FlatList } from 'react-native';


export default function InfoPessoal({ navigation, route }) {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Informações de ' + route.params.users,
        });
    }, [navigation]);

    const [users, setUsers] = useState([])

    useEffect(() => {
        database.collection("users").onSnapshot((query) => {
            const list = []
            query.forEach((doc) => {
                list.push({ ...doc.data(), nome: doc.nome })
            });
            setUsers(list)
        })
    }, [])

    // const dataNasc = route.params.diaNasc.toString() + '/' + route.params.mesNasc.toString() + '/' + route.params.anoNasc.toString()


    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <FlatList data={users}
                renderItem={(item) => {
                    <>
                        <View style={{ flexDirection: 'row', marginTop: 30, }}>
                            <View style={{ marginLeft: '25%', justifyContent: 'center', alignItems: 'flex-end' }}>
                                <Text category='h5' style={{ width: 170, maxWidth: 170 }}>{item.nome}</Text>
                            </View>
                        </View>

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginTop: 20 }}>
                            <Text category='h5'>Informações Pessoais</Text>
                            <View style={{}}>
                                <View style={{ flexDirection: 'row', marginTop: 25, }}>
                                    <Text category='h6' style={{ marginTop: 10, marginRight: 5 }}>NOME: </Text>
                                    <Input
                                        style={{ width: 305, }}
                                        disabled={true}
                                        placeholder={item.nome}
                                    />
                                </View>
                            </View>
                        </View>
                    </>
                }}>

                {/* <View style={{ marginTop: 15 }}>
                        <Text category='h6' style={{ marginTop: 10, marginRight: 21 }}>DATA DE NASCIMENTO: </Text>
                        <View style={{ flexDirection: 'row', marginTop: 10, }}>
                            <Input
                                style={{ width: 100, marginRight: 15 }}
                                placeholder={route.params.diaNasc}
                                disabled={true}
                                textAlign='center'
                            />
                            <Input
                                style={{ width: 100, marginRight: 15 }}
                                placeholder={route.params.mesNasc}
                                disabled={true}
                                textAlign='center'
                            />
                            <Input
                                style={{ width: 150 }}
                                placeholder={route.params.anoNasc}
                                disabled={true}
                                textAlign='center'
                            />
                        </View> 
    </View>*/}

            </FlatList>
        </Layout >
    )
}

const styles = StyleSheet.create({
    foto: {
        width: 100,
        height: 100,
        borderColor: '#2e2e2e',
        borderWidth: 1,
    },
    hairlineImg: {
        backgroundColor: '#BBBBBB',
        height: 1,
        width: '100%',
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: -5,
    },
})