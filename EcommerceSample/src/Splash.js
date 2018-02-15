import React, { Component } from 'react';
import Login from './Login'; 
import Home from './Home'; 
const globalMethods = require('./constant/GlobalMethods');

import {
  Platform,
  StyleSheet,
  Text,Image,
  View,AsyncStorage,TouchableOpacity
} from 'react-native';
 import TimerMixin from 'react-timer-mixin';
const GLOBAL = require('./constant/Globals');

import { DrawerNavigator,NavigationActions } from 'react-navigation';

export default class Splash extends Component{
	 static navigationOptions = {
    header: null,
  };
constructor(props) {
    super(props);    
  }
  
  
  componentWillReceiveProps(nextProps) {
      if (nextProps.count != this.props.count) {
		 let count = globalMethods();
		 console.log("Splash countervalue --- " + count);
		 this.props.counterSet(count);  
        this.props.navigation.setParams({count:this.props.count});		
      }
    }
  
	componentWillMount(){
         try {
			 
			
this.interval = setTimeout(() => {	 	
		
	 AsyncStorage.getItem("user").then((result) => {
		 console.log("email"+result);
			   if(result != undefined){
		    var jsonstr=  JSON.parse(result);    
				   console.log("email"+jsonstr.email);				
				 
		const routeName = jsonstr.loggedInStatus ? "Home" : "Login";
       

        this.props.navigation.navigate(routeName);
				 
		   }else{
		    this.props.navigation.navigate('Login') 
		   }
	       console.log("get storage value -- " + jsonstr);
           })
           .then(res => {
     
            });	
	}, 500);
			 
		   
          } catch (error) {
          // Error retrieving data
          }
	   } 
	render(){
	return(		
	<Image style={styles.container} source={require('./images/grocerry2.jpg')}/>	
	);
	}
	
}
const styles = StyleSheet.create({
  container: {
     flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
	textItem:{
		fontSize:15,
		color:'black'
	}
  
});