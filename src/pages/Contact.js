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
                    <TouchableOpacity style={styles.contactBtn} onPress={() => Linking.openURL('https://www.google.com/maps/place/Rua+de+Brito+Capelo+688,+4450-068+Matosinhos/@41.1816105,-8.6920367,17z/data=!3m1!4b1!4m6!3m5!1s0xd246f3a5c449b9f:0xfb06c3f7d476eaac!8m2!3d41.1816065!4d-8.6898427!16s%2Fg%2F11c22dy1fj?hl=pt-PT')}>
                        <Icon
                            style={styles.iconBtn}
                            fill='#fff'
                            name='pin-outline'
                        />
                        <Text style={styles.textBtn} > Rua de Brito Capelo, 688{"\n"}Matosinhos</Text>
                    </TouchableOpacity>

                    {/* Telemóvel */}
                    <TouchableOpacity style={styles.contactBtn} onPress={() => Linking.openURL(`tel:${+351999999999}`)}>
                        <Icon
                            style={styles.iconBtn}
                            fill='#fff'
                            name='phone-outline' />
                        <Text style={styles.textBtn} >+351 999 999 999</Text>
                    </TouchableOpacity>

                    {/* Email */}
                    <TouchableOpacity style={styles.contactBtn} onPress={() => Linking.openURL('mailto:marianaramalhaogabriel@gmail.com')}>
                        <Icon
                            style={styles.iconBtn}
                            fill='#fff'
                            name='email-outline' />
                        <Text style={styles.textBtn} >loremipsum@gmail.com</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: '-12%' }}>
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
                </View>
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
        height: '24%',
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