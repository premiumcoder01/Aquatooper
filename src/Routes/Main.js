import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home';
import RegisterAquaTooper from '../Screens/RegisterAquaTooper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Profile from '../Auth/Profile';

const Tab = createBottomTabNavigator();

const Main = () => {
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
            <View
              style={{
                borderRadius: 50,
                backgroundColor: '#fff',
                fontSize: 25,
                justifyContent:"center",
                alignSelf: 'center',
                marginTop: -65,
                height: 65,
                width: 65,
              }}>
              <AntDesign
                name="plus"
                style={{
                  color: '#0A4B87',
                  fontSize:30,
                  textAlign:"center",
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

export default Main;
