import { StyleSheet, View } from 'react-native';
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
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AboutUs" component={AboutUs} options={{ title: 'Sobre Nós', headerBackTitle: 'Voltar' }} />
            <Stack.Screen name="Schedule" component={Schedule} options={{ title: 'Agendar', headerBackTitle: 'Voltar' }} />
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
