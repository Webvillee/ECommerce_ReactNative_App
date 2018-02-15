
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,FlatList,Image,TouchableOpacity,ScrollView,Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import { StackNavigator } from 'react-navigation';
import { BackAndroid, BackHandler, } from "react-native"
import {IndicatorViewPager, PagerTitleIndicator,PagerDotIndicator} from 'rn-viewpager';
import IconBadge from 'react-native-icon-badge';
const globalMethods = require('./constant/GlobalMethods');
import Header from './Header';

import {connect} from 'react-redux';
import {counterSet} from './actions';


const ITEM=Dimensions.get('window').width;
//const counter=0;
const categoryListData=[
	{
		key:1,
		image:require('./images/product2.jpg'),
		name:'Products'
	},
	{
		key:2,
		image:require('./images/product1.jpg'),
		name:'Products'
	},
	{
    	key:3,
		image:require('./images/product4.jpg'),
		name:'Products'
	},
	{
		key:4,
		image:require('./images/product5.jpg'),
		name:'Products'
	},
	{
		key:6,
		image:require('./images/bg2.jpg'),
		name:'Products'
	},
	{
		key:7,
		image:require('./images/bg1.jpg'),
		name:'Products'
	}
	
]

class Home extends React.Component {
	
	/*static navigationOptions = ({navigation})=> {
		
		//console.log('get counter at home ' + navigation.state.params.count);
		  return {
			title: 'Home',
			 headerLeft:<TouchableOpacity style={{backgroundColor:'#003d00'}} onPress={()=>{navigation.navigate('DrawerOpen')} }>
      <Image style={{resizeMode:'contain',height:60,width:20}} source={require('./images/menu.png')}/>
    </TouchableOpacity> ,
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
      <Text style={{color:'#FFFFFF',fontSize:10}}>{0}</Text>
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
	
	/*static navigationOptions = ({ navigation }) => {
  return navigation.state.params.count;
};*/
	
	constructor(props){
		super(props);
		  this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
			this.state = {
    		loading: true,
    		error: false,
			categoryData:[],
		 
			  		}
					console.log("countervalue --- " );
	}
	
	componentDidMount(){		
          let counterValue = globalMethods();
		 console.log("countervalue --- " + counterValue);
        this.props.navigation.setParams({ count: counterValue });
		this.props.counterSet(counterValue); 
	}
	
	componentWillMount(){	
        let counterValue = globalMethods();
		 console.log("countervalue --- " + counterValue);
        this.props.navigation.setParams({ count: counterValue });
		//this.props.counterSet(counterValue); 
		
		//const headerConfig = this._renderHeader(this.props);
  //this.props.navigation.setParams({headerConfig});
	
		BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);  					
	}
	
	componentWillReceiveProps(nextProps) {
      if (nextProps.count != this.props.count) {
		 let count = globalMethods();
		 console.log("Home countervalue --- " + count);
		 this.props.counterSet(count);  
        this.props.navigation.setParams({count:this.props.count});		
      }
    }
	
	componentWillUnmount() {
       BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);	 
    }
	
	componentWillUpdate(nextProps, nextState) {
        if (nextProps.count != this.props.count) {
		 let countValue = globalMethods();
		 console.log("componentWillUpdate Home countervalue --- " + countValue);
		// this.props.counterSet(counterValue);  
        this.props.navigation.setParams({ count: countValue });	
      }	 
    }	

    handleBackButtonClick() {
       this.props.navigation.goBack(null);	   
       return false;
    }	
	
  shouldComponentUpdate(nextProps, nextState) {
    return true;
   }

	renderCategortyList(item) {
		return(				
				<TouchableOpacity onPress={()=>this.props.navigation.navigate('CategoryDetail',{categoryName:item.name})}>
						<View style={styles.categoryList}>
								
								<Image 
								style={{resizeMode:'contain',height:150,marginLeft:10,marginRight:10,flex:1,width:150}}
								source={item.image} >
								</Image>	

								<Text style={{color:'black',fontSize:15,fontWeight:'bold'}}>{item.name}</Text>
						</View>		
				</TouchableOpacity>				
		)
	} 
	
	renderDotIndicator() {
        return <PagerDotIndicator pageCount={3} />;
    }

	
render(){		
           console.log(this.props);		
		 const { state, actions } = this.props;
		console.log('home inside render==========='+this.props.navigation.state.key);
	return(
		
		<View style={{flex:1,backgroundColor:'white',}} >		
						<Header count={this.props.count} navigation={this.props.navigation} title={'Home'}/>
				
		<View style={{height:200,marginBottom:15,marginRight:5}}>
			<IndicatorViewPager style={styles.viewPagerStyle}  indicator={this.renderDotIndicator()} >	
							<View style={styles.viewPagerImageStyle}>
								
									<Image  style={{resizeMode: 'contain',}} source={require('./images/banner2.jpg')}>		
								</Image>				
							</View>			  
					      <View  style={styles.viewPagerImageStyle} >
								<Image style={{resizeMode: 'contain',}} source={require('./images/grocerry2.jpg')}>	
								</Image>
																			
						  </View>	
						 <View style={styles.viewPagerImageStyle}>
								<Image  style={{resizeMode: 'contain',}} source={require('./images/banner1.jpg')}>						
								</Image>
						  </View>															  
			</IndicatorViewPager>	
					</View>	
																	   
				<FlatList numColumns={2} data={categoryListData}  renderItem={({item}) => this.renderCategortyList(item)} >
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
	horizontalView:{
		marginTop:15,
		flex:1,
		flexDirection:'row',
		backgroundColor:'#fff',	
	},
	categoryList:{
		marginTop:10,
		flex:1,
		marginBottom:20,	
		marginLeft:10,
		marginRight:10,
		width:160,
		height:180,
		padding:10,
		borderColor:'black',
		borderWidth:1,
		borderRadius:10,
		alignItems:'center',
		justifyContent:'center'
	},		
	viewPagerStyle:{
		flex:1,
		marginTop:15,		
	    height:120,		 
	},
	viewPagerImageStyle:{
	     	height:120,
			width:200,
			padding:5,			
	}, 
	 
});

function mapStateToProps(state){
	return{		
		count:state.counter,		
	}
}

export default connect(mapStateToProps,{counterSet})(Home);


//	source={require('./images/organic_food.png')} >
//source={{uri:'https://facebook.github.io/react-native/docs/assets/favicon.png'}}>
//source={{uri:item.image}}>
