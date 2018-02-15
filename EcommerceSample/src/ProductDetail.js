import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Image,FlatList,TouchableOpacity,TextInput
} from 'react-native';
import realm from './realm';
import Toast from 'react-native-simple-toast';
import IconBadge from 'react-native-icon-badge';
const globalMethods = require('./constant/GlobalMethods');
import Header from './Header';
import {connect} from 'react-redux';
import {counterSet} from './actions';

class ProductDetail extends React.Component {
	
	static navigationOptions = ({navigation})=> {
		console.log('get counter at ProductDetail ' + navigation.state.params.count);
		  return {
			title: ` ${navigation.state.params.itemName}`,
headerRight: <TouchableOpacity onPress={()=>{navigation.navigate('MyCart')} }>
<View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',}}>
  <IconBadge
    MainElement={
      <View style={{
      	  width:40,
        height:40,       
      }}>
      <Image style={{resizeMode:'contain',height:60,width:20,backgroundColor:'#003d00'}} source={require('./images/add_to_cart.png')}/>
      </View>
    }
    BadgeElement={
      <Text style={{color:'#FFFFFF',fontSize:10}}>{navigation.state.params.count}</Text>
    }
    IconBadgeStyle={
      {
      width:25,
      height:25,
      marginTop:5,
      backgroundColor: '#33691e'}
    }/>

</View>
    </TouchableOpacity>	,	 
		}		
	};	
		
	constructor(props) { 
    super(props) 
	 this.state = { 
        textNumber: 1,
		cartList:[],
		wishImage:require('./images/unlike.png'),
		imageType:0,		
    }
  }	
  
  componentWillReceiveProps(nextProps) {	  
      if (nextProps.count != this.props.count) {
		 let counterValue = globalMethods();
		 console.log("countervalue --- " + counterValue);
        this.props.navigation.setParams({ count: counterValue });
      }
    }
  
  componentWillMount(){
	  
	   let counterValue = globalMethods();
		 console.log("countervalue --- " + counterValue);
        this.props.navigation.setParams({ count: counterValue });
		 this.props.counterSet(counterValue);  
	  
			console.log('inside componentWillMount-----');
			const { params } = this.props.navigation.state;
			console.log('old item name---'+params.itemName);
			realm.write(() => {			
			let list = realm.objects('WishList');		
				if(list.length>0){	
					for(var i=0;i<list.length;i++){
						console.log('value of i== '+i);
					//	console.log('inside loop1-----'+list[i].item_name);
						if(list[i].item_name==params.itemName){
							console.log('inside loop2-----');
							this.setState({
							wishImage:require('./images/like.png'),
							imageType:1,
							}); 
						}
					}	
				}
			}); 	
		}
		
		
	addItem(itemNo,itemName,description,price,weight,imageUrl){
			 const {setCounter } = this.props;
			 
			 //globalMethods();
			
			const { params } = this.props.navigation.state;
			console.log('item no-------'+itemNo);
			console.log('itemName-------'+itemName);
			console.log('imageUrl-------'+imageUrl);
			let newPrice=price*itemNo;
			let image=imageUrl.toString();
			console.log('image inside add item------'+image);
			realm.write(() => {
 			 let myCart = realm.create('User', {
 			   item_name: itemName,
 			   item_description: description,
				 item_weight:weight,
				 item_Price:newPrice,
				 item_number:itemNo,
				 item_image:image
 				 },true);
				
			 let counter=realm.objects('User');
				var counterValue=counter.length;
				//setCounter(counterValue)
				// const {setParams} = this.props.navigation;
                 //  setParams({ counter: counterValue })
				 const count = parseInt(counterValue);
	             this.props.counterSet(count);  
				  this.props.navigation.setParams({ count: counterValue });
			}); 					
			
			Toast.show('Item added successfully', Toast.LONG);
		}
			
			
	addWishList(type,itemNo,itemName,description,price,weight,imageUrl)	{
			console.log("inside adwishlist------------------");		
			if(type==0){			
					this.setState({
					wishImage:require('./images/like.png'),
						imageType:1,
						});
				let newPrice=price*itemNo;
				let image=imageUrl.toString();
				console.log('image inside add item------'+image);
				realm.write(() => {
 				 let myCart = realm.create('WishList', {
 				   item_name: itemName,
 				   item_description: description,
					 item_weight:weight,
					 item_Price:newPrice,
					 item_number:itemNo,
					 item_image:image
 					 },true);
				}); 				
			}else{
					this.setState({
					wishImage:require('./images/unlike.png'),
						imageType:0,
					});
		
		realm.write(() => {
			let item=realm.objects('WishList').filtered('item_name == ' + "'" + itemName+ "'");
			
			console.log("my cart deleted item wish list"+item);
				console.log("wish list==================");
 			 let myCart = realm.delete(item); 
			let otherUser=realm.objects('User');    
 			  this.setState({ cartList: otherUser });
			});				
			}			
		}
		
		
	increment()	{
			console.log('in it increment ---');
		this.setState({
		textNumber:this.state.textNumber+1
		});
	}
		
	decrement(){
		console.log('in it decrement ---');
		if(this.state.textNumber>1)
			{
				this.setState({
			textNumber:this.state.textNumber-1
		});
			}
		if(this.state.textNumber<=1)
			{
				this.setState({
			textNumber:1
		});
		}
	}	
	
	render(){
		console.log(this.props);
		 const {setCounter } = this.props;
		 const { params } = this.props.navigation.state;
		console.log('image url product detail----------'+params.itemImage);
		return(
			<View style={{flex:1,backgroundColor:'white',}}>
		<Header count={this.props.count} navigation={this.props.navigation} title={'ProductDetail'}/>
				<Image source={params.itemImage}  style={{height: 180,width:null,resizeMode:'contain',marginTop:15}}/>
			
				<TouchableOpacity onPress={() =>this.addWishList(this.state.imageType,this.state.textNumber,params.itemName,params.itemDescription,params.itemPrice,params.itemWeight,params.itemImage)}>
					<Image style={{height: 30,width:null,resizeMode:'contain',marginLeft:250,marginTop:12}} source={this.state.wishImage}/>
				</TouchableOpacity>
				
				<Text style={{color:'black',fontSize:15,marginTop:20,fontWeight:'bold',marginLeft:50}}>Product Name:    {params.itemName}</Text>  
				<Text style={{color:'black',fontSize:15,marginTop:10,fontWeight:'bold',marginLeft:50}}>Description:        {params.itemDescription}</Text> 
				<Text style={{color:'black',fontWeight:'bold',marginLeft:50,marginTop:15}}>Price:                      ${params.itemPrice}</Text>	
				<Text style={{color:'black',fontSize:15,marginTop:10,fontWeight:'bold',marginLeft:50}}>Weight:               {params.itemWeight}</Text> 
					
			<View style={{flexDirection:'row',marginTop:20,alignItems:'center',justifyContent:'center',}}> 
						<View>
							<TouchableOpacity onPress={this.decrement.bind(this)} > 				 
								<Image  source={require('./images/minus_icon.png')} style={{height: 40,marginRight:10,resizeMode:'contain'}} />
							</TouchableOpacity>
						</View>
						<View style={{alignItems:'center',padding:5, borderColor: '#000',borderWidth:3,
								 borderRadius:10,justifyContent:'center'}}>
								<Text style={{fontWeight:'bold',color:'black'}}>  {this.state.textNumber} </Text>
						</View>
								 
						 <View>
							<TouchableOpacity onPress={this.increment.bind(this)}>
								<Image source={require('./images/plus_icon.png')} style={{height: 38,marginLeft:10,resizeMode:'contain',}} />
							</TouchableOpacity>
						</View>
					 	
			</View>
					<TouchableOpacity onPress={() =>this.addItem(this.state.textNumber,params.itemName,params.itemDescription,params.itemPrice,params.itemWeight,params.itemImage)}> 
						<View style={styles.addToCartButton}>
						<Text style={{color:'white'}}>Add To Cart</Text> 
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
    backgroundColor: '#F5FCFF',
  },
	categoryList:
	{
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
	addToCartButton:{
	 backgroundColor:'darkgreen',
	 width:150,
	 padding:12,
	 marginLeft:110,
	 marginTop:35,
	 borderRadius:10,
	 alignItems:'center',
	 elevation: 20, 
	 shadowOffset: { width: 15, height: 15 }, 
	 shadowOpacity: 1,
	}, 
});

function mapStateToProps(state){
	return{		
		count:state.counter,		
	}
}

export default connect(mapStateToProps,{counterSet})(ProductDetail);