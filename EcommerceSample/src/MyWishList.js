import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Image,FlatList,TouchableOpacity,TextInput,Alert
} from 'react-native';
const Realm = require('realm');
import realm from './realm';
import Header from './Header';

export default class MyWishList extends Component {

	static navigationOptions = ({navigation})=> ({
			title: 'My WishList',
	  headerTitleStyle: { color: '#fff'},
     headerStyle:{backgroundColor:'#003d00',padding:10},
     headerTintColor: 'white'
		});
	constructor(props)
		{
			super(props);
			this.deleteItem=this.deleteItem.bind(this);	
				this.state = {
    				loading: true,
    				error: false,
					cartList:[],	
					textMessage:'',
  				}
		}
		componentWillMount()
		{
		//let realm = new Realm({schema: [userSchema]});
		realm.write(() => {			
			let list = realm.objects('WishList');
			console.log('list=========='+list.length);
			this.setState({
			cartList:list,
			});
		if(list==0)
		{
			//console.log('wish list cart length func-- '+this.state.cartList.length);
			this.setState({
			textMessage:" Empty !! "
			});
		} 
			}); 		
	}
	
		deleteItem(value)
	{
	//	console.log("wish list=================="+value.index);
	//	console.log("wish list=================="+value.item.item_name);
	
		realm.write(() => {
			let item=realm.objects('WishList').filtered('item_name == ' + "'" + value.item.item_name+ "'");
			
			//console.log("my cart deleted item wish list"+item);
			//	console.log("wish list==================");
 			 let myCart = realm.delete(item); 
			 let otherUser=realm.objects('WishList');    
 			  this.setState({ cartList: otherUser });
				if(otherUser==0)
				{
					//console.log('wish list cart length func-- '+this.state.cartList.length);
					this.setState({
					textMessage:" Empty !! "
					});
				} 
			}); 
			
		Alert.alert("Item Removed");
		
				/*Alert.alert("Are you sure want to delete this item",
				    [
   				 {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
  				  {text: 'OK', onPress: () => console.log('OK Pressed')},
 				 ],{ cancelable: false }); */
	}
	purchaseItem()
	{
	Alert.alert("Confirm to buy this product");
	}
	renderList(item,index)
	{
		return(
			
		<View style={{padding:10,backgroundColor:'white',marginTop:20,}}>
			<View style={{flexDirection:'row'}}> 
				<View style={{height:120,width:100,marginTop:50}} >
					<Image style={{flex:1,height:undefined,width:undefined}} source={item.item_image} />
				</View>
			<View style={{flexDirection:'row'}}>
				<View>
					<Image source={require('./images/organic_food.png')}  style={{height: 100,width:null,resizeMode:'contain'}}/>
				</View>
				<View style={{flexDirection:'column',justifyContent:'space-between'}}>
					<View style={{flexDirection:'row',}}>
						<Text style={{color:'black',fontSize:15,marginTop:40,fontWeight:'bold',marginLeft:11}}>Name :</Text>
						<Text style={{color:'black',fontSize:15,marginTop:40,fontWeight:'bold',marginLeft:80}}>{item.item_name }</Text>  
					</View>
						<View style={{flexDirection:'row',}}>
							<Text style={{color:'black',fontSize:15,marginTop:10,fontWeight:'bold',marginLeft:5}}>Weight :  </Text> 
							<Text style={{color:'black',fontSize:15,marginTop:10,fontWeight:'bold',marginLeft:70}}>{item.item_weight }  </Text> 
					</View>
					<View style={{flexDirection:'row',}}>
						<Text style={{color:'black',fontWeight:'bold',marginTop:15,marginLeft:16}}>Item :</Text>	
						<Text style={{color:'black',fontWeight:'bold',marginTop:15,marginLeft:90}}>{item.item_number }</Text>	
					</View>
					<View style={{flexDirection:'row',}}>
						<Text style={{color:'black',fontSize:15,marginTop:10,fontWeight:'bold',marginLeft:16}}>Price :</Text> 
						<Text style={{color:'black',fontSize:15,marginTop:10,fontWeight:'bold',marginLeft:80}}>${item.item_Price }</Text> 
					</View>
				</View>
			</View>
			</View>			
			<View style={{flexDirection:'row',justifyContent:'space-between'}}>
						<TouchableOpacity onPress={() =>this.purchaseItem()}> 
							<View style={{backgroundColor:'darkgreen',marginLeft:10,width:140,padding:12,marginTop:35,borderRadius:10,
									 alignItems:'center'}}>
							<Text style={{color:'white'}}>Purchase</Text> 
							</View>
						</TouchableOpacity> 
						<TouchableOpacity onPress={() =>this.deleteItem({item,index})}> 
							<View style={{backgroundColor:'darkgreen',width:140,marginRight:10,padding:12,marginTop:35,borderRadius:10,
									 alignItems:'center'}}>
							<Text style={{color:'white'}}>Remove</Text> 
							</View>
						</TouchableOpacity>
					</View>	
		</View>
		)
	}
	render(){
	return(
		<View style={{marginBottom:20}}>
		<Header navigation={this.props.navigation} title={'MyWishList'}/>
		<FlatList data={this.state.cartList} keyExtractor={(item,index)=>index} renderItem={({item,index})=>this.renderList(item,index)} />
	<View style={{alignItems:'center',justifyContent:'center',}}>
		<Text style={{fontSize:20,marginTop:230}}>{this.state.textMessage}</Text>
		</View>
		</View>
	);
	}

}