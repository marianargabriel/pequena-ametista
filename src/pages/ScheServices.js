import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';
import { Layout, Datepicker, NativeDateService, Input, CheckBox, Icon } from '@ui-kitten/components';

import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebaseConnection';

const useCheckboxState = (initialCheck = false) => {
    const [checked, setChecked] = React.useState(initialCheck);
    return { checked, onChange: setChecked };
};

export default function ScheServices({ navigation, route }) {
    const params = route.params
    // Epilação
    const epAbdomen = useCheckboxState();//0
    const epAxilas = useCheckboxState();//1
    const epBracos = useCheckboxState();//2
    const epBuco = useCheckboxState();//3
    const epCostas = useCheckboxState();//4
    const epCoxa = useCheckboxState();//5
    const epGluteos = useCheckboxState();//6
    const epLinhaalba = useCheckboxState();//7
    const epLombar = useCheckboxState();//8
    const epMeiaperna = useCheckboxState();//9
    const epMeiobraco = useCheckboxState();//10
    const epOmbros = useCheckboxState();//11
    const epPeito = useCheckboxState();//12
    const epPerna = useCheckboxState();//13
    const epQueixo = useCheckboxState();//14
    const epRosto = useCheckboxState();//15
    const epSobrancelhas = useCheckboxState();//16
    const epVirilhacav = useCheckboxState();//17
    const epVirilhacomp = useCheckboxState();//18

    // Manicure
    const aplUnhasgel = useCheckboxState();//19
    const aplVernizgel = useCheckboxState();//20
    const manuUnhasgel = useCheckboxState();//21
    const manuVernizgel = useCheckboxState();//22
    const repUnha = useCheckboxState();//23

    // Pestanas e Sobrancelhas
    const aplExtpestanas = useCheckboxState();//24
    const liftingPestanas = useCheckboxState();//25
    const manuExtpestanas = useCheckboxState();//26
    const permSobrancelhas = useCheckboxState();//27
    const pintPestanas = useCheckboxState();//28

    // Threading
    const thBuco = useCheckboxState();//29
    const thLinhaalba = useCheckboxState();//30
    const thMacasrosto = useCheckboxState();//31
    const thNariz = useCheckboxState();//32
    const thOrelhas = useCheckboxState();//33
    const thQueixo = useCheckboxState();//34
    const thRosto = useCheckboxState();//35
    const thSobrancelhas = useCheckboxState();//36

    const [showElement, setShowElement] = useState(false)
    const [showElement2, setShowElement2] = useState(false)
    const [showElement3, setShowElement3] = useState(false)
    const [showElement4, setShowElement4] = useState(false)
    const showOrHide = (index) => {
        switch (index) {
            case 1:
                setShowElement(!showElement)
                break;

            case 2:
                setShowElement2(!showElement2)
                break;

            case 3:
                setShowElement3(!showElement3)
                break;

            case 4:
                setShowElement4(!showElement4)
                break;
        }
    }

    let servicosArr = [];
    function servicos() {
        if (epAbdomen.checked) {
            if (!servicosArr.includes(0)) {
                servicosArr = servicosArr.concat(0)
            }
        } if (epAxilas.checked) {
            if (!servicosArr.includes(1)) {
                servicosArr = servicosArr.concat(1)
            }
        } if (epBracos.checked) {
            if (!servicosArr.includes(2)) {
                servicosArr = servicosArr.concat(2)
            }
        } if (epBuco.checked) {
            if (!servicosArr.includes(3)) {
                servicosArr = servicosArr.concat(3)
            }
        } if (epCostas.checked) {
            if (!servicosArr.includes(4)) {
                servicosArr = servicosArr.concat(4)
            }
        } if (epCoxa.checked) {
            if (!servicosArr.includes(5)) {
                servicosArr = servicosArr.concat(5)
            }
        } if (epGluteos.checked) {
            if (!servicosArr.includes(6)) {
                servicosArr = servicosArr.concat(6)
            }
        } if (epLinhaalba.checked) {
            if (!servicosArr.includes(7)) {
                servicosArr = servicosArr.concat(7)
            }
        } if (epLombar.checked) {
            if (!servicosArr.includes(8)) {
                servicosArr = servicosArr.concat(8)
            }
        } if (epMeiaperna.checked) {
            if (!servicosArr.includes(9)) {
                servicosArr = servicosArr.concat(9)
            }
        } if (epMeiobraco.checked) {
            if (!servicosArr.includes(10)) {
                servicosArr = servicosArr.concat(10)
            }
        } if (epOmbros.checked) {
            if (!servicosArr.includes(11)) {
                servicosArr = servicosArr.concat(11)
            }
        } if (epPeito.checked) {
            if (!servicosArr.includes(12)) {
                servicosArr = servicosArr.concat(12)
            }
        } if (epPerna.checked) {
            if (!servicosArr.includes(13)) {
                servicosArr = servicosArr.concat(13)
            }
        } if (epQueixo.checked) {
            if (!servicosArr.includes(14)) {
                servicosArr = servicosArr.concat(14)
            }
        } if (epRosto.checked) {
            if (!servicosArr.includes(15)) {
                servicosArr = servicosArr.concat(15)
            }
        } if (epSobrancelhas.checked) {
            if (!servicosArr.includes(16)) {
                servicosArr = servicosArr.concat(16)
            }
        } if (epVirilhacav.checked) {
            if (!servicosArr.includes(17)) {
                servicosArr = servicosArr.concat(17)
            }
        } if (epVirilhacomp.checked) {
            if (!servicosArr.includes(18)) {
                servicosArr = servicosArr.concat(18)
            }
        } if (aplUnhasgel.checked) {
            if (!servicosArr.includes(19)) {
                servicosArr = servicosArr.concat(19)
            }
        } if (aplVernizgel.checked) {
            if (!servicosArr.includes(20)) {
                servicosArr = servicosArr.concat(20)
            }
        } if (manuUnhasgel.checked) {
            if (!servicosArr.includes(21)) {
                servicosArr = servicosArr.concat(21)
            }
        } if (manuVernizgel.checked) {
            if (!servicosArr.includes(22)) {
                servicosArr = servicosArr.concat(22)
            }
        } if (repUnha.checked) {
            if (!servicosArr.includes(23)) {
                servicosArr = servicosArr.concat(23)
            }
        } if (aplExtpestanas.checked) {
            if (!servicosArr.includes(24)) {
                servicosArr = servicosArr.concat(24)
            }
        } if (liftingPestanas.checked) {
            if (!servicosArr.includes(25)) {
                servicosArr = servicosArr.concat(25)
            }
        } if (manuExtpestanas.checked) {
            if (!servicosArr.includes(26)) {
                servicosArr = servicosArr.concat(26)
            }
        } if (permSobrancelhas.checked) {
            if (!servicosArr.includes(27)) {
                servicosArr = servicosArr.concat(27)
            }
        } if (pintPestanas.checked) {
            if (!servicosArr.includes(28)) {
                servicosArr = servicosArr.concat(28)
            }
        } if (thBuco.checked) {
            if (!servicosArr.includes(29)) {
                servicosArr = servicosArr.concat(29)
            }
        } if (thLinhaalba.checked) {
            if (!servicosArr.includes(30)) {
                servicosArr = servicosArr.concat(30)
            }
        } if (thMacasrosto.checked) {
            if (!servicosArr.includes(31)) {
                servicosArr = servicosArr.concat(31)
            }
        } if (thNariz.checked) {
            if (!servicosArr.includes(32)) {
                servicosArr = servicosArr.concat(32)
            }
        } if (thOrelhas.checked) {
            if (!servicosArr.includes(33)) {
                servicosArr = servicosArr.concat(33)
            }
        } if (thQueixo.checked) {
            if (!servicosArr.includes(34)) {
                servicosArr = servicosArr.concat(34)
            }
        } if (thRosto.checked) {
            if (!servicosArr.includes(35)) {
                servicosArr = servicosArr.concat(35)
            }
        } if (thSobrancelhas.checked) {
            if (!servicosArr.includes(36)) {
                servicosArr = servicosArr.concat(36)
            }
        }
        
        console.log(servicosArr)
        navigation.navigate('Scheduling', { UID: params.UID, SERV: servicosArr })
    }

    return (
        <Layout style={{ flex: 1, paddingRight: '5%', paddingLeft: '5%', paddingTop: '5%' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Text style={styles.titles}>Escolha o(s) Serviço(s)</Text>
                    <Text style={{ fontWeight: '300', marginBottom: '5%' }}>Pressione a categoria para escolher o(s) serviço(s) desejado(s).</Text>
                    {/* Epilação */}

                    <TouchableOpacity style={styles.showOrHide} onPress={() => showOrHide(1)}>
                        {!showElement ?
                            <Icon
                                style={styles.icon}
                                fill='#8F9BB3'
                                name='arrow-ios-downward-outline'
                            />
                            :
                            <Icon
                                style={styles.icon}
                                fill='#8F9BB3'
                                name='arrow-ios-upward-outline'
                            />}
                        <Text style={styles.subtitles}>Epilação</Text>
                    </TouchableOpacity>

                    {showElement ?
                        <>
                            <CheckBox
                                style={styles.checkbox}
                                status='basic'
                                {...epAbdomen}>
                                Abdómen
                            </CheckBox>
                            <CheckBox
                                style={styles.checkbox}
                                status='basic'
                                {...epAxilas}>
                                Axilas
                            </CheckBox>
                            <CheckBox
                                style={styles.checkbox}
                                status='basic'
                                {...epBracos}>
                                Braços
                            </CheckBox>
                            <CheckBox
                                style={styles.checkbox}
                                status='basic'
                                {...epBuco}>
                                Buço
                            </CheckBox>
                            <CheckBox
                                style={styles.checkbox}
                                status='basic'
                                {...epCostas}>
                                Costas
                            </CheckBox>
                            <CheckBox
                                style={styles.checkbox}
                                status='basic'
                                {...epCoxa}>
                                Coxa
                            </CheckBox>
                            <CheckBox
                                style={styles.checkbox}
                                status='basic'
                                {...epGluteos}>
                                Glúteos
                            </CheckBox>
                            <CheckBox
                                style={styles.checkbox}
                                status='basic'
                                {...epLinhaalba}>
                                Linha Alba
                            </CheckBox>
                            <CheckBox
                                style={styles.checkbox}
                                status='basic'
                                {...epLombar}>
                                Lombar
                            </CheckBox>
                            <CheckBox
                                style={styles.checkbox}
                                status='basic'
                                {...epMeiaperna}>
                                Meia Perna
                            </CheckBox>
                            <CheckBox
                                style={styles.checkbox}
                                status='basic'
                                {...epMeiobraco}>
                                Meio Braço
                            </CheckBox>
                            <CheckBox
                                style={styles.checkbox}
                                status='basic'
                                {...epOmbros}>
                                Ombros
                            </CheckBox>
                            <CheckBox
                                style={styles.checkbox}
                                status='basic'
                                {...epPeito}>
                                Peito
                            </CheckBox>
                            <CheckBox
                                style={styles.checkbox}
                                status='basic'
                                {...epPerna}>
                                Perna
                            </CheckBox>
                            <CheckBox
                                style={styles.checkbox}
                                status='basic'
                                {...epQueixo}>
                                Queixo
                            </CheckBox>
                            <CheckBox
                                style={styles.checkbox}
                                status='basic'
                                {...epRosto}>
                                Rosto
                            </CheckBox>
                            <CheckBox
                                style={styles.checkbox}
                                status='basic'
                                {...epSobrancelhas}>
                                Sobrancelhas
                            </CheckBox>
                            <CheckBox
                                style={styles.checkbox}
                                status='basic'
                                {...epVirilhacav}>
                                Virilha Cavada
                            </CheckBox>
                            <CheckBox
                                style={styles.checkbox}
                                status='basic'
                                {...epVirilhacomp}>
                                Virilha Completa
                            </CheckBox>
                        </>
                        : []}

                    <TouchableOpacity style={styles.showOrHide} onPress={() => showOrHide(2)}>
                        {!showElement2 ?
                            <Icon
                                style={styles.icon}
                                fill='#8F9BB3'
                                name='arrow-ios-downward-outline'
                            />
                            :
                            <Icon
                                style={styles.icon}
                                fill='#8F9BB3'
                                name='arrow-ios-upward-outline'
                            />}
                        <Text style={styles.subtitles}>Manicure</Text>
                    </TouchableOpacity>
                    {showElement2 ?
                        <>
                            <CheckBox
                                style={styles.checkbox}
                                status='basic'
                                {...aplUnhasgel}>
                                Aplicação - Unhas de Gel
                            </CheckBox>
                            <CheckBox
                                style={styles.checkbox}
                                status='basic'
                                {...aplVernizgel}>
                                Aplicação - Verniz Gel
                            </CheckBox>
                            <CheckBox
                                style={styles.checkbox}
                                status='basic'
                                {...manuUnhasgel}>
                                Manutenção - Unhas de Gel
                            </CheckBox>
                            <CheckBox
                                style={styles.checkbox}
                                status='basic'
                                {...manuVernizgel}>
                                Manutenção - Verniz Gel
                            </CheckBox>
                            <CheckBox
                                style={styles.checkbox}
                                status='basic'
                                {...repUnha}>
                                Reparação Unha
                            </CheckBox>
                        </>
                        : []}

                    <TouchableOpacity style={styles.showOrHide} onPress={() => showOrHide(3)}>
                        {!showElement3 ?
                            <Icon
                                style={styles.icon}
                                fill='#8F9BB3'
                                name='arrow-ios-downward-outline'
                            />
                            :
                            <Icon
                                style={styles.icon}
                                fill='#8F9BB3'
                                name='arrow-ios-upward-outline'
                            />}
                        <Text style={styles.subtitles}>Pestanas e Sobrancelhas</Text>
                    </TouchableOpacity>
                    {showElement3 ?
                        <>
                            <CheckBox
                                style={styles.checkbox}
                                status='basic'
                                {...aplExtpestanas}>
                                Aplicação - Extensão de Pestanas
                            </CheckBox>
                            <CheckBox
                                style={styles.checkbox}
                                status='basic'
                                {...liftingPestanas}>
                                Lifting de Pestanas
                            </CheckBox>
                            <CheckBox
                                style={styles.checkbox}
                                status='basic'
                                {...manuExtpestanas}>
                                Manutenção - Extensão de Pestanas
                            </CheckBox>
                            <CheckBox
                                style={styles.checkbox}
                                status='basic'
                                {...permSobrancelhas}>
                                Permanente de Sobrancelhas
                            </CheckBox>
                            <CheckBox
                                style={styles.checkbox}
                                status='basic'
                                {...pintPestanas}>
                                Pintura de Pestanas
                            </CheckBox>
                        </>
                        : []}

                    <TouchableOpacity style={styles.showOrHide} onPress={() => showOrHide(4)}>
                        {!showElement4 ?
                            <Icon
                                style={styles.icon}
                                fill='#8F9BB3'
                                name='arrow-ios-downward-outline'
                            />
                            :
                            <Icon
                                style={styles.icon}
                                fill='#8F9BB3'
                                name='arrow-ios-upward-outline'
                            />}
                        <Text style={styles.subtitles}>Threading (Epilação a Linha)</Text>
                    </TouchableOpacity>
                    {showElement4 ?
                        <>
                            <CheckBox
                                style={styles.checkbox}
                                status='basic'
                                {...thBuco}>
                                Buço
                            </CheckBox>
                            <CheckBox
                                style={styles.checkbox}
                                status='basic'
                                {...thLinhaalba}>
                                Linha Alba
                            </CheckBox>
                            <CheckBox
                                style={styles.checkbox}
                                status='basic'
                                {...thMacasrosto}>
                                Maças do Rosto
                            </CheckBox>
                            <CheckBox
                                style={styles.checkbox}
                                status='basic'
                                {...thNariz}>
                                Nariz
                            </CheckBox>
                            <CheckBox
                                style={styles.checkbox}
                                status='basic'
                                {...thOrelhas}>
                                Orelhas
                            </CheckBox>
                            <CheckBox
                                style={styles.checkbox}
                                status='basic'
                                {...thQueixo}>
                                Queixo
                            </CheckBox>
                            <CheckBox
                                style={styles.checkbox}
                                status='basic'
                                {...thRosto}>
                                Rosto
                            </CheckBox>
                            <CheckBox
                                style={styles.checkbox}
                                status='basic'
                                {...thSobrancelhas}>
                                Sobrancelhas
                            </CheckBox>
                        </>
                        : []}
                </View>
            </ScrollView>
            <View style={styles.btnOK}>
                <Button title='Continuar' color='#fff' onPress={() => servicos()} />
                {/* <Button title='Continuar' color='#fff' onPress={() => navigation.navigate('Scheduling', {UID: params.UID})} /> */}
            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({

    titles: {
        fontSize: '22',
        fontWeight: '400',
        marginBottom: 5,
    },

    icon: {
        width: 25,
        height: 25,
        marginRight: 3,
    },

    subtitles: {
        marginTop: '5%',
        fontSize: '18',
        fontWeight: '400',
        marginBottom: '5%'
    },

    showOrHide: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    checkbox: {
        marginBottom: 10,
        fontWeight: '300',
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
});