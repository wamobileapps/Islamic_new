import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator, BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Home from '../screen/HomeScreen';
import Journal from "../screen/Journal";
import Book from "../screen/BookSummary";
import Quran from "../screen/Quran";
import BioGraphy from '../screen/BioGraphyList';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { createStackNavigator } from '@react-navigation/stack';

import Icon1 from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator()




function AppNavigation() {
    return (



        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: "#C28647",
                inactiveTintColor: '#000',
                labelStyle: {
                    fontSize: RFValue(8),bottom:10, 
                    fontFamily: 'Montserrat-Medium'
                
                },
                tabStyle:{
                    backgroundColor:"#EBC59D",
                },
                style:{
                    height: '7.5%'
                }
              
            }
            }>
            <Tab.Screen name="Dashboard" component={Home} options={{

             
                tabBarIcon: ({ color, size, focused }) => (

                    <Icon name="view-dashboard" size={16} color={ focused ? '#C28647' : '#000'} />

                )
            }} 
            />


            <Tab.Screen name="Journal" component={Journal} options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <Icon1 name="journal" size={15} color={ focused ? '#C28647' : '#000'} />)
            }} />

          <Tab.Screen name="Book Summary" component={Book} options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <Icon name="bookshelf" size={22} color={ focused ? '#C28647' : '#000'} />)
            }} />

          <Tab.Screen name="Quran" component={Quran} options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <Icon1 name="md-book" size={22} color={ focused ? '#C28647' : '#000'} />)
            }} /> 

        </Tab.Navigator>



    );
}

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={'bottomtabs'} component={AppNavigation} />
    </Stack.Navigator>
  );
};