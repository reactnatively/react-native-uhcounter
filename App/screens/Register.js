//import liraries
import React, { Component } from 'react';

import {ActivityIndicator, View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Keyboard,ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView,Alert,AsyncStorage } from 'react-native';
import { SafeAreaView } from 'react-navigation';
var WIDTH = Dimensions.get('window').width
var HEIGHT = Dimensions.get('window').height
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions';
class Register extends Component {

    constructor(props) {
        super(props)
        this.state = {
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            password: '',
            errorText: false,
            errorMessage: 'Some',
            opacity:0,
            user:'',
            error1:false,
            error2:false,
            error3:false,
            error4:false,
            error5:false,


        }
    }


    registerUser() {
        
        
        var st = this.state

        //console.log(st)
        if (st.username && st.lastname && st.firstname && st.email && st.password != '') {
            this.setState({ errorText: false })
            var fullnamee = st.firstname + ' ' + st.lastname
            var emailValidater = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
            if (emailValidater.test(st.email) == true) {
                if (st.password.length > 8) {
                    //console.log(fullnamee)
                    //console.log('full name: ', fullname)
                    //console.log('current state', st)

                    if(st.username.length > 5 ){
                        this.setState({opacity:1});

                    fetch('http://api.reactnatively.venny.co/v2/register?username=' + st.username + '&password=' + st.password + '&email=' + st.email + '&fullname=' + fullnamee + '')
                        .then(function (response) {
                            return response.json()
                        }).then((responseData) => {
                            //console.log("Response:", responseData);
                            if(responseData.status != '200'){
                                this.setState({opacity:0});

                                alert('Ops, Username is taken or email exists, try again.')
                
                            }
                            else{
                                this.setState({opacity:0});
                                var obj = {username:responseData.username,id:responseData.id,count:{like:0,uhh:0,umm:0}}
                                AsyncStorage.setItem('user',JSON.stringify(obj));
                                //this.props.setUser(obj);
                                 AsyncStorage.setItem('userToken', 'LoggedIn');
                                 alert('Successfully registered.')

                                this.props.navigation.navigate('Dashboard')

                            }
            
                        }).catch((error) => {
                            this.setState({opacity:0})
                            alert(JSON.stringify(error))
                        })
                        .done();
}
else{
    this.setState({opacity:0,errorText:true,errorMessage:'Username should be at least 6 characters.',error3:true})
    //Alert.alert('The username should be at least 6 characters.')

    /* this.setState({ errorText: true, errorMessage: 'The username should be at least 6 characters.' }) */

}
                   



                }
                else {
                    this.setState({opacity:0,errorText:true,errorMessage:'Password should be more than 8 characters.',error5:true})

                    //Alert.alert('Error','The password should be greater than 8 characters.')
                   /*  this.setState({ errorText: true, errorMessage: 'The password should be greater than 8 characters.' }) */
                }

            }
            else {
                this.setState({opacity:0,errorText:true,errorMessage:'Given email is invalid.',error4:true})

                //Alert.alert('Error','The email address is invalid.')

                /* this.setState({ errorText: true, errorMessage: 'The email address is invalid.' }) */

            }
       
        }

        else {
            //console.log('falase')
            
                this.setState({errorText:true,errorMessage:' All the fields are required.',})
        
            

            if(this.state.firstname == ''){
                this.setState({error1:true,})
            }
             if(this.state.lastname == ''){
                this.setState({error2:true,})
            }
             if(this.state.username == ''){
                this.setState({error3:true,})
            }
            if(this.state.email == ''){
                this.setState({error4:true,})
            }
            if(this.state.password == ''){
                this.setState({error5:true,})
            }

            /* this.setState({ errorText: true, errorMessage: 'Ops..one or more fields are empty' }) */
        }






    }

    render() {
        return (
            

                <KeyboardAvoidingView behavior="padding" style={styles.container}>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

                <ScrollView>
                    <View style={styles.section1}>
                        <Text style={styles.heading}>Welcome to</Text>
                        <Text style={styles.heading2}>UhCounter</Text>
                    </View>

                    {this.state.errorText && 
                    <Text style={styles.error}>
                        {this.state.errorMessage}
                    </Text>
                    }
                    

                    <View style={styles.form}>




                        <TextInput
                            placeholder='First Name*'
                            onFocus={()=>this.setState({error1:false})}
                            //value={st.UserData.phone}
                            style={{ width: '100%',
                            borderColor: this.state.error1? '#EC644B': '#DADFE1',
                            marginTop: 6,
                            borderWidth: 1,
                            borderRadius: 10,
                            paddingVertical: 10,
                            fontSize: 21,
                            color: '#6C7A89',
                            textAlign: 'center',}}
                            maxLength={25}
                            returnKeyType={"next"}
                            onChangeText={(text) => this.setState({ firstname: text })}
                            underlineColorAndroid='rgba(0,0,0,0)'
                            placeholderTextColor='#DADFE1'
                            autoCapitalize="words"
                            autoCorrect={false}
                            onSubmitEditing={() => { this.secondTextInput.focus(); }}

                        />

                        <TextInput
                            placeholder='Last Name*'
                            maxLength={25}
                            //value={st.UserData.phone}
                            onFocus={()=>this.setState({error2:false})}
                            style={{ width: '100%',
                            borderColor: this.state.error2? '#EC644B': '#DADFE1',
                            marginTop: 6,
                            borderWidth: 1,
                            borderRadius: 10,
                            paddingVertical: 10,
                            fontSize: 21,
                            color: '#6C7A89',
                            textAlign: 'center',}}                            //secureTextEntry
                            ref={(input) => { this.secondTextInput = input; }}
                            onChangeText={(text) => this.setState({ lastname: text })}
                            underlineColorAndroid='rgba(0,0,0,0)'
                            placeholderTextColor='#DADFE1'
                            autoCapitalize="words"
                            returnKeyType={"next"}
                            onSubmitEditing={() => { this.thirdTextInput.focus(); }}

                            autoCorrect={false}
                        />

                        <TextInput
                            placeholder='Username*'
                            //value={st.UserData.phone}
                            onFocus={()=>this.setState({error3:false})}
                            style={{ width: '100%',
                            borderColor: this.state.error3? '#EC644B': '#DADFE1',
                            marginTop: 6,
                            borderWidth: 1,
                            borderRadius: 10,
                            paddingVertical: 10,
                            fontSize: 21,
                            color: '#6C7A89',
                            textAlign: 'center',}}                            //secureTextEntry
                            ref={(input) => { this.thirdTextInput = input; }}
                            maxLength={30}
                            onChangeText={(text) => this.setState({ username: text })}
                            underlineColorAndroid='rgba(0,0,0,0)'
                            placeholderTextColor='#DADFE1'
                            autoCapitalize={'none'}
                            returnKeyType={"next"}
                            onSubmitEditing={() => { this.fourthTextInput.focus(); }}

                            autoCorrect={false}
                        />


                        <TextInput
                            placeholder='Email*'
                            //value={st.UserData.phone}
                            onFocus={()=>this.setState({error4:false})}
                            style={{ width: '100%',
                            borderColor: this.state.error4? '#EC644B': '#DADFE1',
                            marginTop: 6,
                            borderWidth: 1,
                            borderRadius: 10,
                            paddingVertical: 10,
                            fontSize: 21,
                            color: '#6C7A89',
                            textAlign: 'center',}}                            //secureTextEntry
                            ref={(input) => { this.fourthTextInput = input; }}
                            keyboardType="email-address"
                            onChangeText={(text) => this.setState({ email: text })}
                            underlineColorAndroid='rgba(0,0,0,0)'
                            placeholderTextColor='#DADFE1'
                            autoCapitalize={'none'}
                            returnKeyType={"next"}
                            onSubmitEditing={() => { this.fifthTextInput.focus(); }}

                            autoCorrect={false}
                        />
                        <TextInput
                            placeholder='Password*'
                            //value={st.UserData.phone}
                            maxLength={20}
                            onFocus={()=>this.setState({error5:false})}
                            style={{ width: '100%',
                            borderColor: this.state.error5? '#EC644B': '#DADFE1',
                            marginTop: 6,
                            borderWidth: 1,
                            borderRadius: 10,
                            paddingVertical: 10,
                            fontSize: 21,
                            color: '#6C7A89',
                            textAlign: 'center',}}                            secureTextEntry
                            ref={(input) => { this.fifthTextInput = input; }}

                            onChangeText={(text) => this.setState({ password: text })}
                            underlineColorAndroid='rgba(0,0,0,0)'
                            placeholderTextColor='#DADFE1'
                            autoCapitalize={'none'}
                            returnKeyType={"done"}
                            //onSubmitEditing={() => { this.fifthTextInput.focus(); }}
                            autoCorrect={false}
                        />



                        <TouchableOpacity activeOpacity={0.9} onPress={() => this.registerUser()} style={styles.button2}>
                        <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center',paddingLeft:4}}>
                        <ActivityIndicator  style={{opacity:this.state.opacity}} size="small" color="white" animating={true}/>
                        </View>
                            <Text style={{ fontSize: 21,flex:1, color: 'white',alignItems:'center'  }}>Register</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.navigation.pop()} style={styles.button}>
                            <Text style={{ fontSize: 21, color: 'white' }}>Login</Text>
                        </TouchableOpacity>

                       
                    </View>
                    </ScrollView>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            

        );
    }
}

function mapStateToProps(state, props) {
    //console.log('detail: ',state);
    return {
      //location: state.user.location,
    }
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
  }
export default connect(mapStateToProps, mapDispatchToProps)(Register);
// define your styles
const styles = StyleSheet.create({
    section1: {
        alignSelf: 'center',
        paddingVertical: 30,
        alignItems: 'center',

        top: 3
    },
    heading: {
        color: '#11B9B4',
        fontSize: 25,
        fontWeight: 'bold'

    },
    heading2: {
        color: '#11B9B4',
        fontSize: 35,
        fontWeight: 'bold'

    },
    error: {
        fontSize: 16,
        fontStyle:'italic',
        fontWeight: '400',
        color: '#EC644B',
        alignSelf: 'center'
    },
    form: {

        //flex: 1,
        marginBottom: 10,
        justifyContent: 'center',
        //marginTop:HEIGHT / 5.5,
        width: WIDTH,
        paddingHorizontal: 40,

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
        backgroundColor: '#11B9B4',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 13,
    },
    button2: {
        flexDirection:'row',
        marginTop: 6,
        width: '100%',
        borderColor: 'transparent',
        backgroundColor: '#11B9B4',
        /* alignItems: 'center',*/
        justifyContent: 'center', 
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 14,
        paddingHorizontal: 10,

    },



    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: 'white',
    },
});

//make this component available to the app
