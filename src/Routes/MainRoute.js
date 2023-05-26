import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from '../Auth/Login';
import Register from '../Auth/Register';
import Email from '../Auth/Email';
import ForgotPassword from '../Auth/ForgotPassword';
import RegisterConfirmation from '../Auth/RegisterConfirmation';
import Profile from '../Auth/Profile';
import Home from '../Screens/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PairedDevices from '../Screens/PairedDevices';
import RegisterAquaTooper from '../Screens/RegisterAquaTooper';
import HowWeUseYourData from '../Screens/HowWeUseYourData';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainRoute = () => {
  



  return (
    <NavigationContainer>
      <Stack.Navigator>
       
        <Stack.Screen
          name="Tab-Home"
          component={Tabs}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Email"
          component={Email}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PairedDevices"
          component={PairedDevices}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="RegisterConfirmation"
          component={RegisterConfirmation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegisterAquaTooperTab"
          component={RegisterAquaTooper}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HowDoWeUseYourData"
          component={HowWeUseYourData}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 70,
          backgroundColor: '#0A4B87',
          paddingTop: 5,
          paddingBottom: 5,
          borderTopWidth: 1,
          borderTopColor: '#0a4b87',
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,

          tabBarIcon: () => (
            <View>
              <AntDesign
                name="home"
                style={{color: '#fff', fontSize: 25, alignSelf: 'center'}}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="RegisterAquaTooper"
        component={RegisterAquaTooper}
        options={{
          headerShown: false,

          tabBarIcon: () => (
            <View>
              <AntDesign
                name="plus"
                style={{
                  color: '#0A4B87',
                  fontSize: 25,
                  alignSelf: 'center',
                  marginTop: -65,
                  backgroundColor: '#fff',
                  height: 65,
                  width: 65,
                  borderRadius: 50,
                  paddingTop: 19,
                  paddingLeft: 19,
                }}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,

          tabBarIcon: () => (
            <View>
              <AntDesign
                name="user"
                style={{color: '#fff', fontSize: 25, alignSelf: 'center'}}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainRoute;

const styles = StyleSheet.create({});
