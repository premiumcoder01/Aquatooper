import React from 'react';
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home';
import RegisterAquaTooper from '../Screens/RegisterAquaTooper';
import Profile from '../Auth/Profile';

const Tab = createBottomTabNavigator();

export default function MainTab() {

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
}

export const styles = StyleSheet.create({
 
});
