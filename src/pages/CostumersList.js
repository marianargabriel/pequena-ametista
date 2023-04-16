import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { List, ListItem, Divider, Icon, Button } from '@ui-kitten/components';
import { db } from "../firebaseConnection";
import { collection, query, getDocs } from "firebase/firestore";

function CostumersList() {
    const [dados, setdados] = useState([])

    async function getDados() {
        const q = query(collection(db, "users"));

        const Dados = []

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(
            (user) => {
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
        })
    }, [])

    const renderItemIcon = (props) => (
        <Icon {...props} name='person-outline' />
    );

    const renderItem = ({ item, index }) => (
        <ListItem
            title={`${item.nome}`}
            description={`${"Telf."} ${item.telemovel}`}
            accessoryLeft={renderItemIcon}
        />
    );

    return (
        <List
            style={styles.container}
            data={dados}
            ItemSeparatorComponent={Divider}
            renderItem={renderItem}
        />
    );
}

const styles = StyleSheet.create({
});

export default CostumersList;