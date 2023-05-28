import React from 'react';
import Onboarding from './Routes/Onboarding';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Email from './Auth/Email';
import ForgotPassword from './Auth/ForgotPassword';
import PairedDevices from './Screens/PairedDevices';
import RegisterConfirmation from './Auth/RegisterConfirmation';
import RegisterAquaTooper from './Screens/RegisterAquaTooper';
import HowWeUseYourData from './Screens/HowWeUseYourData';
import Main from './Routes/Main';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const MainAuth = () => {
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

export default MainAuth;
