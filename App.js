import React from 'react';
import { StyleSheet, Text, View, AsyncStorage} from 'react-native';
import RootNavigator from './App/Routes';
import {SafeAreaView,SwitchNavigator} from 'react-navigation'; 
import { Provider } from 'react-redux';
import store from './store'; 

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>

     <RootNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
