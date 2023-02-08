import { StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { BottomNavigation,BottomNavigationTab, Icon } from '@ui-kitten/components';


const HomeIcon = (props) => (
    <Icon {...props} name='home-outline' />
);

const InfoIcon = (props) => (
    <Icon {...props} name='people-outline' />
);

const AgendarIcon = (props) => (
    <Icon {...props} name='clock-outline' />
);

const MarcacoesIcon = (props) => (
    <Icon {...props} name='calendar-outline' />
);

const PersonIcon = (props) => (
    <Icon {...props} name='person-outline' />
);

const useBottomNavigationState = (initialState = 0) => {
    const [selectedIndex, setSelectedIndex] = React.useState(initialState);
    return { selectedIndex, onSelect: setSelectedIndex };
};

const BottomNavBar = ({ navigation, state}) => {
    return (
        <SafeAreaView style={styles.btmNavBar}>
            <BottomNavigation style={styles.bottomNavigation}
                selectedIndex={state.index}
                onSelect = {index => navigation.navigate(state.routeNames[index])}>
                <BottomNavigationTab title='INÍCIO' icon={HomeIcon} />
                <BottomNavigationTab title='SOBRE NÓS' icon={InfoIcon} />
                <BottomNavigationTab title='AGENDAR' icon={AgendarIcon} />
                <BottomNavigationTab title='MARCAÇÕES' icon={MarcacoesIcon} />
                <BottomNavigationTab title='PERFIL' icon={PersonIcon} />
            </BottomNavigation>
        </SafeAreaView>
    )
}

export default BottomNavBar

const styles = StyleSheet.create({
    btmNavBar: {
        backgroundColor: '#fff',
    },
})