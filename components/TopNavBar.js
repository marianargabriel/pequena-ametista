import { StyleSheet, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'

const TopNavBar = ({ titulo, navigation }) => {
    return (
        <SafeAreaView style={styles.topNavBar}>
        </SafeAreaView>
    )
}

export default TopNavBar

const styles = StyleSheet.create({
    topNavBar: {
        marginTop: StatusBar.currentHeight,
        backgroundColor: '#fff',
    },
})