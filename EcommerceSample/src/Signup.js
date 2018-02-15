
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';


export default class Login extends Component<{}> {
static navigationOptions = ({navigation})=> ({
      title: 'Signup',
     headerTitleStyle: { color: '#fff'},
     headerStyle:{backgroundColor:'#003d00',padding:10},
       headerTintColor: 'white'
      });

  render() {
    return (
      <View style={styles.container}>
       <Image style={{width:80,height:80}} source={require('./images/app-icon.png')}/>
       <Text style={styles.TextStyle}>Webvillee</Text>
         <TextInput style={styles.InputStyle}  underlineColorAndroid='rgba(0,0,0,0)'
         placeholder="Email" 
         placeholderTextColor="#ffffff"/>

         <TextInput style={styles.InputStyle}  underlineColorAndroid='rgba(0,0,0,0)'
         placeholder="Password"
         placeholderTextColor="#ffffff"
         secureTextEntry={true}/>

         <TouchableOpacity  onPress={()=>this.props.navigation.navigate('Home')}>
			 <View style={styles.btn}>
          <Text style={styles.TextStyle}>SignUp</Text>
		  </View>
         </TouchableOpacity>

         <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')}>
          <Text style={styles.TextStyle}>Already have an account?SignIn</Text>
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
   // fontSize:16,
    //fontWeight:'500',
    width:300,
    backgroundColor:'#003d00',
    marginTop:10,
    borderRadius:15,
    marginVertical:20,
    paddingVertical:12,
  }
 

});
