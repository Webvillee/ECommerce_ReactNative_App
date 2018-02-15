import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,TouchableOpacity,Image,FlatList,ActivityIndicator,
} from 'react-native';
import IconBadge from 'react-native-icon-badge';


export default class Header extends Component {
	
	render(){
		const {title} = this.props;
		console.log('get counter value ' + title + "   " + this.props.count);
		
  let button = null;
    if (title == "Home") {
      button = <TouchableOpacity onPress={()=>{this.props.navigation.navigate('DrawerOpen')} } >
     					 <Image style={styles.menuIcon} source={require('./images/menu.png')}/>
    				</TouchableOpacity> ;
    } else {
      button = <TouchableOpacity onPress={()=>{this.props.navigation.goBack()} } >
     					 <Image style={styles.menuIcon} source={require('./images/back.png')}/>
    				</TouchableOpacity> 
    }	
	
	let counterView = null;
    if (this.props.count != undefined) {
      counterView = <TouchableOpacity  style={{alignItems: 'flex-end',justifyContent: 'flex-end',}} onPress={()=>{this.props.navigation.navigate('MyCart')} }>
<View style={{flexDirection: 'row',alignItems: 'flex-end',justifyContent: 'flex-end',}}>
  <IconBadge
    MainElement={
      <View style={{
      	  width:40,
        height:40,  
 marginRight:10,		
      }}>
      <Image style={{resizeMode:'contain',height:60,width:20,backgroundColor:'#003d00'}} source={require('./images/add_to_cart.png')}/>
      </View>
    }
    BadgeElement={
      <Text style={{color:'#FFFFFF',fontSize:10}}>{this.props.count}</Text>
    }
    IconBadgeStyle={
      {
      width:25,
      height:25,
      marginTop:5,
	  marginRight:10,
      backgroundColor: '#33691e'}
    }
	/>

</View>
    </TouchableOpacity>	
    } 
		
		return(
			<View style={styles.headerView}>
						
			{button} 
					 <Text style={styles.toolbarTitle}>{this.props.title}</Text>												 
										 {counterView}
				</View>		
		);
	}
}
const styles = StyleSheet.create({
 menuIcon:{
  resizeMode:'contain',
	  height:40,
	  width:20,
	  marginLeft:5
  },
	 headerView: { 
	  height:50,
	backgroundColor:'red',
	alignItems:'center',
	flexDirection:'row'
   },
	textHeader:
	{
		color:'white',
		marginLeft:'40%',
		fontSize:15,
	},
	 headerView: { 
	  height:50,
	backgroundColor:'#003d00',
	alignItems:'center',
	flexDirection:'row'
   },
  menuIcon:{
  resizeMode:'contain',
	  height:40,
	  width:20,
	  marginLeft:10
  },
   toolbarTitle:{
        color:'#fff',
        textAlign:'center',
        fontWeight:'bold',
        flex:1                //Step 3
    }
});