//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity,PermissionsAndroid, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView,AsyncStorage,Platform,Alert } from 'react-native';
import { SafeAreaView } from 'react-navigation';
var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions';

// create a component
class Location extends Component {

    constructor(props){

        super(props)
        this.state={
            latitude:'',
            longitude:'',
            altitude:'',
            showError:false,
            positionFetched:false,
            user:''

        }
    }



    componentDidMount() {
        AsyncStorage.getItem('user', (err, result) => {
            
            var data = JSON.parse(result)
            console.log(data)
            this.setState({user:data})
          });


        navigator.geolocation.getCurrentPosition(
            (position) => {
                
              this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                altitude: position.coords.altitude,
                error: null,
                positionFetched:true,
                showError: false
              });
              
            },
            (error) => {this.setState({ showError: true });
            Alert.alert('Enable Location','Please turn on location services.')
        },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
          );      
        
        
          if(Platform.OS == 'android'){
            try {
              const granted =  PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION    
              )
              console.log(granted)
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the location")
              } else {
                PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)

                console.log("Location permission denied")
              }
            } catch (err) {
              console.warn(err)
            }
        }
          
        
        
        
        }





      checkLocation(){
        navigator.geolocation.getCurrentPosition(
            (position) => {
              this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                altitude: position.coords.altitude,
                error: null,
                positionFetched:true,
                showError: false
  
              });

            var locStore ={latitude:this.state.latitude,longitude:this.state.longitude,altitude:this.state.altitude}
              console.log(locStore)
              this.props.setLocation(locStore);
              this.props.navigation.navigate('welcome')
              
            },
            (error) => {this.setState({ showError: true });
            Alert.alert('Enable Location','Please turn on location services.')
        },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
          );
      }


      logOut(){
        AsyncStorage.multiRemove(['userToken','user'])  
        //AsyncStorage.removeItem('userToken')
          this.props.navigation.navigate('Authentication')
      }

    render() {
        return (

            <View style={styles.container}>

                <View style={styles.section1}>
                    <Text style={styles.heading}>Welcome, {this.state.user.username}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    
                   
                 <View style={styles.form}>
                       {this.state.showError && 
                       <View>
                        <Text style={styles.subtext}>
                            We need to know your location in order to use in this app. Turn on location.
                    </Text> 
                       </View> }

                       {this.state.positionFetched &&
                    <View>
                    <Text style={styles.subtext}>
                       Current location acquired.
                </Text> 
                   </View> 
                    
                    }
                    

                        <Text onPress={() =>this.checkLocation()} style={styles.heading2}>
                            Continue
                    </Text>



                    </View>


                </View>


                <TouchableOpacity activeOpacity={0.9} onPress={() =>this.logOut()} style={styles.button}>
                    
                    <View style={styles.break} />

                    <Text style={{ fontSize: 21, color: '#DADFE1' }}>Logout</Text>
                </TouchableOpacity>
            </View>

        );
    }
}


function mapStateToProps(state, props) {
    console.log('detail: ',state);
    return {
      name: state.user.username,
    }
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
  }
export default connect(mapStateToProps, mapDispatchToProps)(Location);


// define your styles
const styles = StyleSheet.create({
    section1: {
        alignSelf: 'center',
        paddingVertical: 30,
        alignItems: 'center',

        top: 3
    },
    break: {
        width:'80%',
        borderColor: '#BDC3C7',
        borderBottomWidth: 0.5,
    },
    heading: {
        color: '#11B9B4',
        fontSize: 25,
        fontWeight: 'bold'

    },
    heading2: {
        paddingVertical: 20,
        color: '#11B9B4',
        fontSize: 25,
        fontWeight: '500',
        textAlign: 'center'
    },

    subtext: {
        color: '#D2D7D3',
        fontSize: 23,
        fontWeight: '500',
        lineHeight: 24,
        letterSpacing: 0.38,
        textAlign: 'center'
    },
    form: {
        //flex:1,

        justifyContent: 'center',

        width: WIDTH,
        paddingHorizontal: 50,
        flexWrap: 'wrap',
        //marginHorizontal:10,
        alignSelf: 'center',


    },

    textInput: {
        width: '100%',
        borderColor: '#DADFE1',
        marginTop: 6,
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 10,
        fontSize: 21,
        color: '#6C7A89',
        textAlign: 'center',
    },
    button: {
        marginTop: 6,
        width: '100%',
        borderColor: 'transparent',
        backgroundColor: 'white',
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 14,
    },
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: 'white',
    },
});

//make this component available to the app

