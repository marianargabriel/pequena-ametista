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
    const epAbdomen = useCheckboxState();
    const epAxilas = useCheckboxState();
    const epBracos = useCheckboxState();
    const epBuco = useCheckboxState();
    const epCostas = useCheckboxState();
    const epCoxa = useCheckboxState();
    const epGluteos = useCheckboxState();
    const epLinhaalba = useCheckboxState();
    const epLombar = useCheckboxState();
    const epMeiaperna = useCheckboxState();
    const epMeiobraco = useCheckboxState();
    const epOmbros = useCheckboxState();
    const epPeito = useCheckboxState();
    const epPerna = useCheckboxState();
    const epQueixo = useCheckboxState();
    const epRosto = useCheckboxState();
    const epSobrancelhas = useCheckboxState();
    const epVirilhacav = useCheckboxState();
    const epVirilhacomp = useCheckboxState();

    // Manicure
    const aplUnhasgel = useCheckboxState();
    const aplVernizgel = useCheckboxState();
    const manuUnhasgel = useCheckboxState();
    const manuVernizgel = useCheckboxState();
    const repUnha = useCheckboxState();

    // Pestanas e Sobrancelhas
    const aplExtpestanas = useCheckboxState();
    const liftingPestanas = useCheckboxState();
    const manuExtpestanas = useCheckboxState();
    const permSobrancelhas = useCheckboxState();
    const pintPestanas = useCheckboxState();

    // Threading
    const thBuco = useCheckboxState();
    const thLinhaalba = useCheckboxState();
    const thMacasrosto = useCheckboxState();
    const thNariz = useCheckboxState();
    const thOrelhas = useCheckboxState();
    const thQueixo = useCheckboxState();
    const thRosto = useCheckboxState();
    const thSobrancelhas = useCheckboxState();

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
                <Button title='Continuar' color='#fff' onPress={() => navigation.navigate('Scheduling', {UID: params.UID})} />
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