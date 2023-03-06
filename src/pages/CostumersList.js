import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native'; 
import { Layout, List, ListItem, Text, Input } from '@ui-kitten/components';
import { db } from "../firebaseConnection";
import { collection, query, where, getDocs } from "firebase/firestore";

function CostumersList() {
    const [dados, setdados] = useState([])

    async function getDados() {
        const q = query(collection(db, "users"));

        const Dados = []

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(
            (user) => {
                // console.log(user.id, " => ", user.data());
                Dados.push({
                    nome: user.data().nome,
                    telemovel: user.data().numero,
                })
            }
        )
        return Dados
    }

    useEffect(() => {
        getDados().then((dadosReturn) => {
            setdados(dadosReturn)
            console.log(dadosReturn)
        })
    }, [])


    const renderItem = ({ item, index }) => (
        <ListItem
            title={`${item.nome} ${index + 1}`}
            description={`${item.telemovel} ${index + 1}`}
        />
    );

    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <List
                style={styles.container}
                data={dados}
                renderItem={renderItem}
            />
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        maxHeight: 192,
    },
});

export default CostumersList;