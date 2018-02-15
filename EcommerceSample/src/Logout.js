import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
	Image,
	TextInput,
	TouchableOpacity,Dimensions,
	ScrollView,AsyncStorage
} from 'react-native';

class Logout extends Component {
	componentDidMount()
	{
		let user_info = {
       id: 1,
       email: '',
	   password:'',
		loggedInStatus:false,
     };
	 console.log('get user detail ' + JSON.stringify(user_info));
	AsyncStorage.setItem('user', JSON.stringify(user_info));
		this.props.navigation.navigate('Login');
	}
	render()
	{
     	return(
			<View>
			</View>
		);
	}
}
export default Logout;