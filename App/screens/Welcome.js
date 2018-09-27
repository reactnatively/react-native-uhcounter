//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity,Alert, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView,AsyncStorage } from 'react-native';
import { SafeAreaView } from 'react-navigation';
var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions';

// create a component
class Welcome extends Component {
    constructor(props) {
        super(props)
        AsyncStorage.getItem('user', (err, result) => {
            var data = JSON.parse(result)
            //console.log(data)
            this.setState({user:data,like:Number(data.count.like),uhh:Number(data.count.uhh),umm:Number(data.count.umm)})
           
        
        });

        this.state = {

            user:'',
            location:this.props.location,
            id:this.props.id,
            like: 0,
            uhh: 0,
            umm: 0,
             sizeLike: {
                width: WIDTH / 4,
                height: WIDTH / 4,
                radius: WIDTH / 2
            }, 
            sizeUhh: {
                width: WIDTH / 4,
                height: WIDTH / 4,
                radius: WIDTH / 2,
            },
            sizeUmm: {
                width: WIDTH / 4,
                height: WIDTH / 4,
                radius: WIDTH / 2,
            },

        }

    }

        sendResponse(props){
        fetch('http://api.reactnatively.venny.co/v2/posts?text='+props+' ('+this.state.location.latitude+','+this.state.location.longitude+')&author='+this.state.user.id+'')
        .then(function (response) {
            return response.json()
        }).then((responseData) => {
            //console.log("Response:", responseData);
           
                //console.log('Response sent successfully.')
            
        }).catch((error) => {
            //console.log(error)
            alert('Ops, response could not be sent.')
        })
        .done();
    }


    handleLike() {
        
        this.setState({ like: this.state.like + 1, sizeLike: { width: this.state.sizeLike.width + 1, height: this.state.sizeLike.height + 1, radius: this.state.sizeLike.radius + 0.5 } })
        this.sendResponse('Like')

    }
    handleUhh() {
        this.setState({ uhh: this.state.uhh + 1, sizeUhh: { width: this.state.sizeUhh.width + 1, height: this.state.sizeUhh.height + 1, radius: this.state.sizeUhh.radius + 0.5 } })
        this.sendResponse('Uhh')

    }
    handleUmm() {
        this.setState({ umm: this.state.umm + 1, sizeUmm: { width: this.state.sizeUmm.width + 1, height: this.state.sizeUmm.height + 1, radius: this.state.sizeUmm.radius + 0.5 } })
        this.sendResponse('Umm')

    }
    setCounter(){
        //console.log('e')


        if(this.state.user.count.like != 0 && this.state.user.count.like != undefined)        
        this.setState({sizeLike:{
            width:this.state.sizeLike.width + Number(this.state.user.count.like),
            height:this.state.sizeLike.height + Number(this.state.user.count.like),
            radius:(this.state.sizeLike.width + Number(this.state.user.count.like)) / 2
        }})

        if(this.state.user.count.uhh != 0 && this.state.user.count.uhh != undefined)        
        this.setState({sizeUhh:{
            width:this.state.sizeUhh.width + Number(this.state.user.count.uhh),
            height:this.state.sizeUhh.height + Number(this.state.user.count.uhh),
            radius:(this.state.sizeUhh.width + Number(this.state.user.count.uhh)) / 2
        }})

        if(this.state.user.count.umm != 0 && this.state.user.count.umm != undefined)        
        this.setState({sizeUmm:{
            width:this.state.sizeUmm.width + Number(this.state.user.count.umm),
            height:this.state.sizeUmm.height + Number(this.state.user.count.umm),
            radius:(this.state.sizeUmm.width + Number(this.state.user.count.umm)) / 2
        }})

        

       
/* this.setState({sizeLike:{
        width:Number(number),
        height:Number(number),
        radius: Number(number) / 2
        }}) */

    }
   
    componentDidMount() {

        setTimeout(() => { this.setCounter() }, 1000)
         
        //console.log(this.state.user.count) 


          }       /* if(data.count.like != 0){
            console.log(data.count.like)
            this.setState({sizeLike:{width:30,height:30,radius:15}})
        } */       
    

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

                <View style={{ flex: 1, justifyContent: 'center', borderColor: 'transparent', borderWidth: 1 }}>

                    <TouchableOpacity activeOpacity={0.8} onPress={() => this.handleLike()}>
                        <View style={styles.subsection}>
                            <View style={{ width: this.state.sizeLike.width, height: this.state.sizeLike.height, borderRadius: this.state.sizeLike.radius, backgroundColor: '#11B9B4', alignItems: 'center', justifyContent: 'center', borderColor: '#ECF0F1', borderWidth: 15 }}><Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>LIKE</Text></View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.8} onPress={() => this.handleUhh()}>

                        <View style={styles.subsection1}>
                            <View style={{ width: this.state.sizeUhh.width, height: this.state.sizeUhh.height, borderRadius: this.state.sizeUhh.radius, backgroundColor: '#11B9B4', alignItems: 'center', justifyContent: 'center', borderColor: '#ECF0F1', borderWidth: 15 }}><Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>UH</Text></View>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity activeOpacity={0.8} onPress={() => this.handleUmm()}>
                        <View style={styles.subsection2}>
                            <View style={{ width: this.state.sizeUmm.width, height: this.state.sizeUmm.height, borderRadius: this.state.sizeUmm.radius, backgroundColor: '#11B9B4', alignItems: 'center', justifyContent: 'center', borderColor: '#ECF0F1', borderWidth: 15 }}><Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>UMM</Text></View>
                        </View>
                    </TouchableOpacity>

                </View>
                <View style={{ position: 'absolute', marginTop: 120, paddingLeft: 30 }}>
                    <Text style={styles.count}>"Like" Count: {this.state.like}</Text>
                    <Text style={styles.count}>"Uh" Count: {this.state.uhh}</Text>
                    <Text style={styles.count}>"Umm" Count: {this.state.umm}</Text>

                </View>


                <TouchableOpacity activeOpacity={0.9} onPress={() => this.logOut()} style={styles.button}>

                    <View style={styles.break} />

                    <Text style={{ fontSize: 21, color: '#DADFE1' }}>Logout</Text>
                </TouchableOpacity>
            </View>

        );
    }
}
function mapStateToProps(state, props) {
    //console.log('detail: ',state);
    return {
        name: state.user.username,
        id: state.user.id,
        location: state.location
    }
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
  }
export default connect(mapStateToProps, mapDispatchToProps)(Welcome);

const styles = StyleSheet.create({
    section1: {
        flex: 0.1,
        //backgroundColor:'pink',
        alignSelf: 'center',
        paddingVertical: 30,
        alignItems: 'center',

        top: 3
    },
    count: {
        color: '#BDC3C7',
        fontWeight: "500",
        fontSize: 16
    },
    break: {
        width: '80%',
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
    subsection: {
        paddingHorizontal: 30,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        flexGrow: 1,
        backgroundColor: 'white',
        /* borderColor:'red',
        borderWidth:2 */
    },
    subsection1: {
        paddingHorizontal: 30,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        flexGrow: 1,
        backgroundColor: 'white',
        /*  borderColor:'red',
         borderWidth:2 */
    },
    subsection2: {
        paddingHorizontal: 30,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        flexGrow: 1,
        backgroundColor: 'white',
        /* borderColor:'red',
        borderWidth:2 */
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
        //flex:1, 
        marginTop: 0,
        width: '100%',
        borderColor: 'transparent',
        backgroundColor: 'white',
        bottom: 0,
        //position: 'absolute',
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


//'http://api.reactnatively.venny.co/v2/posts?text='+props+'latitude='+this.state.location.latitude+'&longitude='+this.state.location.longitude+'&userID='+this.state.user.id+''