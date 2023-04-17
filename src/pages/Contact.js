import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, ScrollView, Button } from 'react-native';
import { Layout, Card, Icon, Input } from '@ui-kitten/components';

export default function Contact() {

    const mensageInput = (initialValue = '') => {
        const [mensageInput, setmensageInput] = React.useState(initialValue);
        return { mensageInput, onChangeText: setmensageInput };
    };

    const multilineInputState = mensageInput();

    return (
        <Layout style={{ flex: 1, paddingRight: '5%', paddingLeft: '5%', paddingTop: '15%', alignContent: 'center' }}>
            <ScrollView>
                <View>
                    <Text style={{ fontSize: '24', fontWeight: '400', textAlign: 'center' }}>Entre em Contacto!</Text>
                    <Text style={{ fontSize: '17', textAlign: 'center', marginTop: 15, marginBottom: 40, fontWeight: '300' }}>Entre em contacto connosco para dar uma{"\n"}sugestão ou esclarecer uma dúvida.</Text>
                </View>
                <View>
                    {/* Localização */}
                    <TouchableOpacity style={styles.contactBtn} onPress={() => Linking.openURL('https://www.google.com/maps/search/Rua+dos+P%C3%A1ssaros+Azuis,+456/@41.1846239,-8.6710611,15z/data=!3m1!4b1')}>
                        <Icon
                            style={styles.iconBtn}
                            fill='#fff'
                            name='pin-outline'
                        />
                        <Text style={styles.textBtn} > Rua dos Pássaros Azuis, 456{"\n"}Vila Serenidade</Text>
                    </TouchableOpacity>

                    {/* Telemóvel */}
                    <TouchableOpacity style={styles.contactBtn} onPress={() => Linking.openURL(`tel:${+351910987654}`)}>
                        <Icon
                            style={styles.iconBtn}
                            fill='#fff'
                            name='phone-outline' />
                        <Text style={styles.textBtn} >+351 910 987 654</Text>
                    </TouchableOpacity>

                    {/* Email */}
                    <TouchableOpacity style={styles.contactBtn} onPress={() => Linking.openURL('mailto:marianaramalhaogabriel@gmail.com')}>
                        <Icon
                            style={styles.iconBtn}
                            fill='#fff'
                            name='email-outline' />
                        <Text style={styles.textBtn} >contacto@pequenaametista.pt</Text>
                    </TouchableOpacity>
                </View>
                {/* <View style={{ marginTop: '-12%' }}>
                    <Text style={{ fontSize: '20', fontWeight: '300', marginBottom: '2%' }} >Mensagem</Text>
                    <React.Fragment>
                        <Input
                            multiline={true}
                            textStyle={{ minHeight: 80 }}
                            placeholder='Escreva aqui a sua mensagem'
                        />
                    </React.Fragment>
                    <View style={styles.btnSubmit}>
                        <Button title='Submeter' color='#fff' />
                    </View>
                </View> */}
            </ScrollView>
        </Layout>
    );
};

const styles = StyleSheet.create({
    iconBtn: {
        height: 35,
        width: 35,
        marginBottom: '1%',
        marginTop: '5%',
    },

    contactBtn: {
        marginTop: '2%',
        backgroundColor: '#8288C3',
        borderColor: '#8288C3',
        alignItems: 'center',
        borderRadius: 10,
        width: '100%',
        height: '29%',
    },

    textBtn: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '300',
    },

    btnSubmit: {
        backgroundColor: '#8288C3',
        height: 45,
        width: '32%',
        borderRadius: 10,
        marginTop: '2%',
        marginLeft: '68%',
        alignItems: 'center',
        justifyContent: 'center',
    },
})