
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,AsyncStorage,Alert
} from 'react-native';

import { StackNavigator  } from 'react-navigation';
const GLOBAL = require('./constant/Globals');
const globalMethods = require('./constant/GlobalMethods');

export default class Login extends Component<{}> {
static navigationOptions = ({navigation})=> ({
      header:null
      
    });
	constructor(props) {
    super(props)
 
    this.state = { 
      textInputEmail: '',
      textInputPassword: '', 
    }
  }	
	 CheckTextInputIsEmptyOrNot = () =>{	
		 console.log('in it check function');
 const { textInputEmail }  = this.state ;
 const { textInputPassword }  = this.state ;
		

if(textInputEmail == '' || textInputPassword == '')
{
  Alert.alert("Please Enter All the Values.");
}
 else if(textInputEmail!=GLOBAL.userEmail)
{
	Alert.alert("Please Enter valid email.");
}
 else if(textInputPassword!=GLOBAL.password)
{
	Alert.alert("Please Enter Correct Password")
}
else {
	if(textInputEmail==GLOBAL.userEmail){
      this.props.navigation.navigate('Home') 
    } 
	let user_info = {
       id: 1,
       email: textInputEmail,
	   password:textInputPassword,
		loggedInStatus:true,
     };
	 console.log('get user detail ' + JSON.stringify(user_info));
	AsyncStorage.setItem('user', JSON.stringify(user_info));
}
  }

  render() {
    return (
      <View style={styles.container}>
		<View style={{width:180,height:180}}>
         <Image style={{width:undefined,height:undefined,flex: 1,}} source={require('./images/shopping_cart2.png')}/>
		</View>
         <TextInput style={styles.InputStyle}  underlineColorAndroid='transparent' 
         placeholder="Email" 
		 onChangeText={textInputEmail => this.setState({textInputEmail})}
         placeholderTextColor="#ffffff"/>

         <TextInput style={styles.InputStyle}  underlineColorAndroid='transparent' 
         placeholder="Password"
		 onChangeText={(textInputPassword)=>this.setState({textInputPassword})}
         placeholderTextColor="#ffffff"
         secureTextEntry={true}/>

         <TouchableOpacity onPress={this.CheckTextInputIsEmptyOrNot}>
			 <View style={styles.btn}>
          <Text style={styles.TextStyle}>Login</Text>
		  </View>
         </TouchableOpacity>        
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#33691e',
  },
  TextStyle:{
    alignItems: 'center',
    fontSize:16,
    color:'rgba(255,255,255,0.7)'
  },
  InputStyle:{
  fontSize:16,
  width:300,
  backgroundColor: 'rgba(255,255,255,0.3)',
  borderRadius:15,
  paddingHorizontal:10,
  color:'#ffffff',
  marginTop:10,

  },
  btn:{
    alignItems: 'center',
    //fontSize:16,
    //fontWeight:'500',
    width:300,
    backgroundColor:'#003d00',
    marginTop:10,
    borderRadius:15,
    marginVertical:20,
    paddingVertical:12,
  }
 

});
// <Image style={{width:50,hieght:50}} source={require('./logo.png')}/>