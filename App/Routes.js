
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight,TouchableOpacity } from 'react-native';
import { createStackNavigator, createSwitchNavigator,SwitchNavigator } from 'react-navigation';

import Login from './screens/Login';
import Register from './screens/Register';



import Welcome from './screens/Welcome';
import Location from './screens/Location';
import Loading from './screens/Loading';



const Home = createStackNavigator(
  {
    location : {screen : Location},

    welcome : {screen :Welcome},
    }
  ,
  {
   headerMode:'none'
  }
);

const Auth = createStackNavigator({
  login : { screen : Login},
  register : {screen : Register},  
},{
    headerMode:'none'
})

 



const RootNavigator = createSwitchNavigator(
  {
    loading : {screen : Loading},
    Authentication : {screen : Auth},
    Dashboard : {screen : Home},

  },
  {
    initialRouteName:'loading',
    headerMode: 'none',
  }
);

export default RootNavigator;
