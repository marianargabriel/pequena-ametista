import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Layout, Icon } from '@ui-kitten/components';
import { doc, getDoc } from "firebase/firestore"
import { db } from '../firebaseConnection';

const Profile = ({ props, route }) => {
    const params = route.params
    const [Name, setName] = React.useState('');
    const [Phone, setPhone] = React.useState('');

    const [userData, setUserData] = useState([]);

    async function getUserData() {
        console.log(params.UID)
        const userRef = doc(db, "users", params.UID);
        const user = await getDoc(userRef);

        if (user.exists()) {
            console.log("User nome:", user.data().nome);
            console.log("User numero:", user.data().numero);
            setUserData(user.data())
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    useEffect(() => {
        getUserData();
    }, [])
    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View>
            <Image style={styles.profileImage} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/pequena-ametista-pap.appspot.com/o/profile.png?alt=media&token=bffc8ba8-be82-4206-9e8a-105829868942' }}></Image>
                <Text style={styles.name}>{userData.nome != undefined ? userData.nome : 'Loading...'}</Text>
                <Text style={styles.number}>Nr. Telemóvel: (+351) {userData.numero != undefined ? userData.numero : 'Loading...'}</Text>
            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    number: {
        fontSize: 18,
        marginBottom: 20,
    },
});

export default Profile;