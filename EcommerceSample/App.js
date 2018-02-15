import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Image
} from 'react-native';

import { DrawerItems,StackNavigator,DrawerNavigator } from 'react-navigation';


import Login from './src/Login';
import Splash from './src/Splash';
import Signup from './src/Signup';
import Home from './src/Home';
import CategoryDetail from './src/CategoryDetail'; 
import ProductDetail from './src/ProductDetail'; 
import MyCart from './src/MyCart'; 
import UserProfile from './src/UserProfile'; 
import Logout from './src/Logout'; 
import MyWishList from './src/MyWishList'; 

const DrawerContent = (props) => (
  <View >
    <View
      style={{
        backgroundColor: '#003d00',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image source={require('./user.png')}></Image>
      <Text style={{ color: 'white', fontSize: 15 }}>
        user
      </Text>
    </View>
    <DrawerItems {...props} />
  </View>
)

const drawerNavigator=DrawerNavigator({
	 Home:{screen:Home},
	 UserProfile:{screen:UserProfile}, 
	 MyWishList:{screen:MyWishList},
     Logout:{screen:Logout},  	
}, {contentComponent: DrawerContent,gesturesEnabled: false,}  );

 const Navigation=StackNavigator({
	 Splash:{screen:Splash},	
	 Login:{screen:Login},		
	 Home:{screen:drawerNavigator},	   	
	 ProductDetail:{screen:ProductDetail},		
	 CategoryDetail:{screen:CategoryDetail},		
	 MyCart:{screen:MyCart},		
	 Signup:{screen:Signup},
	 UserProfile:{screen:UserProfile},
			},
	 {   
	 headerMode:'none'
	 /*navigationOptions :{
       headerTitleStyle: { color: '#fff',textAlign: 'center',alignSelf:'center'},
   	   headerStyle:{backgroundColor:'#003d00',padding:10} ,
       headerTintColor: 'white'  
      }       */              
    
    });

export default class App extends Component<{}>  {

  render() {
    return (
    <Navigation/>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },  
});

