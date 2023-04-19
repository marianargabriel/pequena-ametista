import { StyleSheet, View, LogBox } from 'react-native';
LogBox.ignoreAllLogs();

import React from 'react';

import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { default as theme } from './pequenaametista-theme.json';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Landing from './src/pages/Landing';
import LogIn from './src/pages/LogIn';
import SignIn from './src/pages/SignIn';
import HomeScreen from './src/pages/Home';
import AboutUs from './src/pages/AboutUs';
import Schedule from './src/pages/Schedule';
import ScheServices from './src/pages/ScheServices';
import Scheduling from './src/pages/Scheduling';
import Services from './src/pages/Services';
// import {} from './src/pages/CostumersList';
import Profile from './src/pages/Profile';
import HomeAdmin from './src/pages/HomeAdmin';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing" >
            <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
            <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }} />
            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
            {/* <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, gestureEnabled: false, }} /> meter quando tiver botao de logout*/}
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, }} />
            <Stack.Screen name="HomeAdmin" component={HomeAdmin} options={{ headerShown: false, }} />
            <Stack.Screen name="AboutUs" component={AboutUs} options={{ title: 'Sobre Nós', headerBackTitle: 'Voltar' }} />
            <Stack.Screen name="Schedule" component={Schedule} options={{ title: 'Marcações', headerBackTitle: 'Voltar' }} />
            <Stack.Screen name="ScheServices" component={ScheServices} options={{ title: 'Agendar', headerBackTitle: 'Voltar' }} />
            <Stack.Screen name="Scheduling" component={Scheduling} options={{ title: 'Agendar', headerBackTitle: 'Voltar' }} />
            <Stack.Screen name="Services" component={Services} options={{ title: 'Serviços', headerBackTitle: 'Voltar' }} />
            {/* <Stack.Screen name="CostumersList" component={AboutUs} options={{ title: 'Clientes', headerBackTitle: 'Voltar' }} /> */}
            <Stack.Screen name="Profile" component={Profile} options={{ title: 'Perfil', headerBackTitle: 'Voltar' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
