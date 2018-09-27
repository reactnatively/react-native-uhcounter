//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Keyboard,ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView,AsyncStorage, ActivityIndicator,Alert } from 'react-native';
import { SafeAreaView } from 'react-navigation';
var WIDTH = Dimensions.get('window').width
var HEIGHT = Dimensions.get('window').height
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions';
// create a component
class Login extends Component {


    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            opacity:0,
            isLoginDisabled:false,
            error1:false,
            error2:false,
            errorText:false,
            errorMessage:''
        }
    }

    userLogin() {
        this.setState({opacity:1})
        var st = this.state
        if (st.username && st.password != '') {
            this.setState({opacity:1,isLoginDisabled:true});
            fetch('http://api.reactnatively.venny.co/v2/login?username=' + st.username + '&password=' + st.password + '')
                .then(function (response) {
                    return response.json()
                }).then((responseData) => {
                    //console.log("Response:", responseData);
                    this.setState({opacity:0,isLoginDisabled:false});
                    if (responseData.status == '403' && responseData.message == 'User is not found') {
                        
                        Alert.alert('Error',responseData.message)
                        //this.setState({error1:true,error2:true})
                        /*  Alert.alert('Error','Ops, login attempt failed, try again.') */
                    }
                    else if(responseData.status == '403' && responseData.message == 'Password do not match'){
                        //this.setState({error2:true})
                        Alert.alert('Error',responseData.message)

                    }
                    else {
                        this.setState({opacity:0,isLoginDisabled:false})
                        var obj = {username:responseData.username,id:responseData.id,count:responseData.count}
                        //this.props.setUser(obj);
                        AsyncStorage.setItem('user',JSON.stringify(obj));
                         AsyncStorage.setItem('userToken', 'LoggedIn');

                        this.props.navigation.navigate('Dashboard')
                    }
                }).catch((error) => {
                    this.setState({opacity:0,isLoginDisabled:false})
                    Alert.alert('Error','Ops, login attempt failed. Try again.')
                })
                .done();
        } else {
            this.setState({opacity:0,isLoginDisabled:false})
            this.setState({error1:true,error2:true})
            this.setState({errorText:true,errorMessage:' All the fields are required.',})


           /*  Alert.alert('Error','One or more fields are empty.') */
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
                            onFocus={()=>this.setState({error1:false})}
                            placeholder='Username'
                            //value={st.UserData.phone}
                            style={{width: '100%',
                            borderColor: this.state.error1? '#EC644B':'#DADFE1',
                            marginTop: 6,
                            borderWidth: 1,
                            borderRadius: 10,
                            paddingVertical: 10,
                            fontSize: 21,
                            color: '#6C7A89',
                            textAlign: 'center',}}
                            returnKeyType={"next"}
                            maxLength={30}
                            onChangeText={(text) => this.setState({ username: text })}
                            underlineColorAndroid='rgba(0,0,0,0)'
                            placeholderTextColor='#DADFE1'
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            onSubmitEditing={() => { this.secondTextInput.focus(); }}

                        />

                        <TextInput
                            placeholder='Password'                            
                            onFocus={()=>this.setState({error2:false})}

                            //value={st.UserData.phone}
                            style={{width: '100%',
                            borderColor: this.state.error2? '#EC644B':'#DADFE1',
                            marginTop: 6,
                            borderWidth: 1,
                            borderRadius: 10,
                            paddingVertical: 10,
                            fontSize: 21,
                            color: '#6C7A89',
                            textAlign: 'center',}}                          
                            secureTextEntry
                            ref={(input) => { this.secondTextInput = input; }}
                            onChangeText={(text) => this.setState({ password: text })}
                            underlineColorAndroid='rgba(0,0,0,0)'
                            placeholderTextColor='#DADFE1'
                            autoCapitalize={'none'}
                            returnKeyType={"done"}
                            autoCorrect={false}
                        />


                        <TouchableOpacity activeOpacity={0.9} disabled={this.state.isLoginDisabled} onPress={() => this.userLogin()} style={styles.button}>
                        
                        
                        
                        <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center',paddingLeft:4}}>
                        <ActivityIndicator  style={{opacity:this.state.opacity}} size="small" color="white" animating={true}/>
                        </View>
                        
                            <Text style={{ fontSize: 21,flex:1, color: 'white',alignItems:'center' }}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.navigation.navigate('register')} style={styles.button2}>
                            <Text style={{ fontSize: 21, color: 'white' }}>Register</Text>
                        </TouchableOpacity>


                    </View>
                    </ScrollView>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>


        );
    }
}

function mapStateToProps(state, props) {
    //console.log('detail: ', state);
    return {
        //location: state.user.location,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
// define your styles
const styles = StyleSheet.create({
    section1: {
        alignSelf: 'center',
        paddingVertical: 23,
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
    form: {
        //flex:1,

        justifyContent: 'center',
        marginTop: HEIGHT / 5.5,
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
    error: {
        fontSize: 16,
        fontStyle:'italic',
        fontWeight: '400',
        color: '#EC644B',
        alignSelf: 'center'
    },
    button2: {
        flexDirection:'row',
        marginTop: 6,
        width: '100%',
        borderColor: 'transparent',
        backgroundColor: '#11B9B4',
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
