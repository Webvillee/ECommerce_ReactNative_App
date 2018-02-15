//https://github.com/mjsolidarios/react-native-search-filter/blob/master/example/App.js  ==> search filter
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Image,FlatList,TouchableOpacity,TextInput
} from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';
const globalMethods = require('./constant/GlobalMethods');
import IconBadge from 'react-native-icon-badge';
import Header from './Header';

import {connect} from 'react-redux';
import {counterSet} from './actions';

const KEYS_TO_FILTERS = ['name'];
const categoryListData=[
	{
		key:1,
		image:require('./images/pickle.jpg'),
		name:'Pickel',
		description:'Lorem Ipsum Donour',
		price:20,
		weight:'1kg'		
	},
	{
		key:2,
		image:require('./images/oil.jpg'),
		name:'Oil',
		description:'Lorem Ipsum Donour',
		price:50,
		weight:'1 litre'
	},
	{
    	key:3,
		image:require('./images/spices.jpg'),
		name:'Spices',
		description:'Lorem Ipsum Donour',
		price:60,
		weight:'1kg'
	},
	{
		key:4,
		image:require('./images/milk.jpg'),
		name:'Milk',
		description:'Lorem Ipsum Donour',
		price:10,
		weight:'1 litre'
	},	
]

class CategoryDetail extends React.Component {
			static navigationOptions = ({navigation})=> ({
			title: ` ${navigation.state.params.categoryName}`,
			  headerTitleStyle: { color: '#fff'},
              headerStyle:{backgroundColor:'#003d00',padding:10},
              headerTintColor: 'white',
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
		});
		
   constructor(props){
		super(props);
		this.state = {
				search:''
		 	}			
	}
	
	componentWillMount(){		

        let counterValue = globalMethods();
		 console.log("countervalue --- " + counterValue);
        this.props.navigation.setParams({ count: counterValue });
		this.props.counterSet(counterValue);  		
	}
	
	componentWillReceiveProps(nextProps) {	  
      if (nextProps.count != this.props.count) {
		 let counterValue = globalMethods();
		 console.log("countervalue --- " + counterValue);
        this.props.navigation.setParams({ count: counterValue });
      }
    }	
		

	
	renderCategortyList(item){
	
		return(				
				<TouchableOpacity onPress={()=>this.props.navigation.navigate('ProductDetail',{itemName:item.name,
								   itemPrice:item.price,itemDescription:item.description,itemWeight:item.weight,itemImage:item.image})}>
						<View style={styles.categoryList}>
								<Image style={{resizeMode:'contain',height:150,width:100,marginLeft:20}} source={item.image}></Image>
						   <View style={{flexDirection:'column',marginTop:10}}>
							 	<Text style={{color:'black',fontSize:17,fontWeight:'bold',marginLeft:50}}>{item.name}</Text>
								<Text style={{fontSize:15,marginTop:5,fontWeight:'bold',marginLeft:50}}>{item.description}</Text>
								<Text style={{fontSize:15,marginTop:15,fontWeight:'bold',marginLeft:50}}>Price:${item.price}</Text>
								<Text style={{fontSize:15,marginTop:10,fontWeight:'bold',marginLeft:50}}>Weight:{item.weight}</Text>
								
							</View>
						
						</View>			
						 
			</TouchableOpacity>			
		)
	}	
	
	updateSeacrh(event)	{
		this.setState({search:event});
	}
	
render(){
			/*let filtered=categoryListData.filter(
			(category)=>{
			return category.name.indexOf(this.state.search) !==-1;
			}
			);*/
		let filtered=categoryListData.filter(
			createFilter(this.state.search, KEYS_TO_FILTERS)
			)
		//console.log('filter list:'+filtered);
		//console.log('category list'+categoryListData[0].name)
	return(
		<View style={{flex:1,backgroundColor:'white',}}>	
		
		<Header count={this.props.count} navigation={this.props.navigation} title={'CategoryDetail'}/>
		
		<TextInput  placeholder="Search"  value={this.state.search} style={{height:50,width:null, borderRadius:15,marginBottom:5}} onChangeText={this.updateSeacrh.bind(this)}/>
		<View style={{height:160,}}>
			<Image style={{flex:1,resizeMode:'stretch',height:undefined,width:undefined,marginBottom:25}} source={require('./images/banner3.jpg')} />
		</View>
				<FlatList numColumns={1} data={filtered}  renderItem={({item}) => this.renderCategortyList(item)} >
				</FlatList>
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
		height:150,
		borderColor:'black',
		borderWidth:1,
		borderRadius:10,		
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
	  marginLeft:5
  },
	 
});

function mapStateToProps(state){
	return{		
		count:state.counter,		
	}
}

export default connect(mapStateToProps,{counterSet})(CategoryDetail);