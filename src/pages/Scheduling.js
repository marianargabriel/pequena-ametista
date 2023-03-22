import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native';
import { Layout, Datepicker, NativeDateService, Input, CheckBox } from '@ui-kitten/components';

import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebaseConnection';
import { ScrollView } from 'react-native';

const useDatepickerState = (initialDate = null) => {
    const [date, setDate] = React.useState(initialDate);
    return { date, onSelect: setDate };
};

const i18n = {
    dayNames: {
        short: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        long: ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'],
    },
    monthNames: {
        short: ['Jan', 'Fev', 'Mar', 'Abr', 'Mar', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
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
const localeDateService = new NativeDateService('ru', { i18n, startDayOfWeek: 1 });

export default function Scheduling() {

    const localePickerState = useDatepickerState();

    const [checked, setChecked] = React.useState(false);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Layout style={{ flex: 1, paddingRight: '5%', paddingLeft: '5%', paddingTop: '5%' }}>
                <ScrollView>
                    <View>
                        <Text style={styles.titles}>Escolha a Data e Hora</Text>
                        <Datepicker
                            style={styles.picker}
                            placeholder='Selecione a Data'
                            dateService={localeDateService}
                            {...localePickerState}
                        />
                        <Input style={styles.inputTime}
                            placeholder="Insira a Hora"
                            keyboardType="numeric"
                            maxLength={5}
                        />

                        <Text style={styles.titles}>Escolha o(s) Serviço(s)</Text>
                        <View>
                            <Text></Text>
                        </View>
                        <View></View>
                        <View></View>
                        <View></View>
                    </View>
                </ScrollView>
            </Layout>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    titles: {
        fontSize: '22',
        fontWeight: '400',
        marginBottom: '5%'
    },

    inputTime: {
        marginBottom: '20%',
        width: "100%",
    },

    picker: {
        marginBottom: '2%',
        width: "100%",
    },
});