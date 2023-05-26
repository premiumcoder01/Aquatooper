import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Onboarding from './src/Routes/Onboarding';
import Login from './src/Auth/Login';
import Register from './src/Auth/Register';
import Email from './src/Auth/Email';
import ForgotPassword from './src/Auth/ForgotPassword';
import PairedDevices from './src/Screens/PairedDevices';
import RegisterConfirmation from './src/Auth/RegisterConfirmation';
import RegisterAquaTooper from './src/Screens/RegisterAquaTooper';
import HowWeUseYourData from './src/Screens/HowWeUseYourData';
import Main from './src/Routes/Main';
// import { AuthProvider } from './src/Helper/AuthContext';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Email" component={Email} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="PairedDevices" component={PairedDevices} />
        <Stack.Screen
          name="RegisterConfirmation"
          component={RegisterConfirmation}
        />
        <Stack.Screen
          name="RegisterAquaTooperTab"
          component={RegisterAquaTooper}
        />
        <Stack.Screen name="HowDoWeUseYourData" component={HowWeUseYourData} />
        <Stack.Screen name="Main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
