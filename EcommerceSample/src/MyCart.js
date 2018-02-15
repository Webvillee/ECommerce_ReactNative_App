import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Image,FlatList,TouchableOpacity,TextInput,Alert
} from 'react-native';
const Realm = require('realm');
import realm from './realm';
const globalMethods = require('./constant/GlobalMethods');
import Header from './Header';
import {connect} from 'react-redux';
import {counterSet} from './actions';

class MyCart extends Component {	
	
static navigationOptions = ({navigation})=> ({
			title: 'My Cart',	 
		});
		
	constructor(props){
			super(props);
			this.deleteItem=this.deleteItem.bind(this);	
				this.state = {
    				loading: true,
    				error: false,
					cartList:[],	
					textMessage:'',
  				}
		}
		  
		
		
	deleteItem(value){
		//console.log("hello=================="+value.index);
	   //console.log("item=================="+value.item.item_name);
	
		realm.write(() => {
			let item=realm.objects('User').filtered('item_name == ' + "'" + value.item.item_name+ "'");			
			//console.log("my cart deleted item"+item);
			//	console.log("hello==================");
 			 let myCart = realm.delete(item); 
			let otherUser=realm.objects('User');    
 			  this.setState({ cartList: otherUser });
			  
			  var counterValue=otherUser.length;
			  this.props.counterSet(counterValue);  
			  this.props.navigation.setParams({ count: counterValue });
			
			if(otherUser.length==0){
					console.log('inside item length function --'+this.state.cartList.length);
					this.setState({
					textMessage:"Oops Cart is Empty!! Let's go for shop"
					});
				} 
			}); 
			
			
		Alert.alert("Your item is deleted");		
				/*Alert.alert("Are you sure want to delete this item",
				    [
   				 {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
  				  {text: 'OK', onPress: () => console.log('OK Pressed')},
 				 ],{ cancelable: false }); */
	}
	
	purchaseItem(){
	Alert.alert("Confirm to buy this product");
	}
	
	componentWillMount(){
		//let realm = new Realm({schema: [userSchema]});
		realm.write(() => {			
				let list = realm.objects('User');
			this.setState({
			cartList:list,
			});
			
			 this.props.counterSet(list.length);  
			  this.props.navigation.setParams({ count: list.length });
			if(list.length==0){
				console.log('inside item length function --'+this.state.cartList.length);
				this.setState({
				textMessage:"Oops Cart is Empty!! Let's go for shop"
				});
			} 
			}); 				
	}
	
	renderList(item,index){
		console.log('cartList-------'+ item.item_image +  "  " + index);
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
							<Text style={{color:'white'}}>Delete</Text> 
							</View>
						</TouchableOpacity>
					</View>	
		</View>
							)
	}
	
	render(){	

console.log(this.props);		
	return(
		<View style={{marginBottom:20}}>
		<Header count={this.props.count} navigation={this.props.navigation} title={'MyCart'}/>
		<FlatList data={this.state.cartList} keyExtractor={(item, index) => index} renderItem={({item,index}) => this.renderList(item,index)}  />
		<View style={{alignItems:'center',justifyContent:'center',}}>
		<Text style={{fontSize:15,marginTop:230}}>{this.state.textMessage}</Text>
		</View>
	</View>				
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
  categoryList:{
		marginTop:10,
		flex:1,
		flexDirection:'row',
		marginBottom:20,	
		marginLeft:10,
		marginRight:10,	
		height:180,
		borderColor:'black',
		borderWidth:1,
		borderRadius:10,		
	},	 
});

function mapStateToProps(state){
	return{		
		count:state.counter,		
	}
}

export default connect(mapStateToProps,{counterSet})(MyCart);