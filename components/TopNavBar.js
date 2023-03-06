import { StyleSheet, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'
import { TopNavigation } from '@ui-kitten/components';

const TopNavBar = ({ titulo, navigation }) => {
    return (
        <SafeAreaView style={styles.topNavBar}>
            <TopNavigation style={styles.topbar}
                title={titulo}
                alignment="center"
            />
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