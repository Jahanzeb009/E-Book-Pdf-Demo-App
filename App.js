import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import Home from './src/home';
import PdfScreen from './src/pdf';

const App = () => {
  const Stack = createNativeStackNavigator();


  const myLight = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#2ea043',
      background: "#f3f4f6",
      card: "#ffffff",
      border: '#c7c7c7',
      mainText: '#1f1f1f',
      subMainText: '#474747',
      smallBoxCenter: "#b2d7d7",
    }, roundness: 26,
  }

  const myDark = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: '#2ea043',
      background: '#151515',
      card: "#000000",
      border: '#5e5e5e',
      mainText: '#c7c7c7',
      subMainText: '#8f8f8f',
      smallBoxCenter: '#4d4d4d',
    }
  }

  let theme = useColorScheme() === 'dark' ? myDark : myLight

  return (
    <NavigationContainer theme={theme} >
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="PdfScreen" component={PdfScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App