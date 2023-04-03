import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';
import { Layout, Datepicker, NativeDateService, Input, CheckBox, Icon } from '@ui-kitten/components';

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

function Scheduling(props) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const localePickerState = useDatepickerState();
    
    return (
        <Layout style={{ flex: 1, paddingRight: '5%', paddingLeft: '5%', paddingTop: '5%' }}>
            <ScrollView>
                <View>
                    <Text style={{
                        fontSize: '22',
                        fontWeight: '400',
                        marginBottom: 10,
                    }}>Escolha a Data</Text>
                    <Datepicker
                        min={today}
                        filter={filter}
                        style={styles.picker}
                        placeholder='Pressione para selecionar'
                        dateService={localeDateService}
                        {...localePickerState}
                    />
                </View>

                <View>
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
                </View>
            </ScrollView>
            <View style={styles.btnOK}>
                <Button title='Finalizar Agendamento' color='#fff' />
            </View>
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
});

export default Scheduling;