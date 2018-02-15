import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
	Image,
	TextInput,
	TouchableOpacity,
	ScrollView,PixelRatio,AsyncStorage,
} from 'react-native';
import Header from './Header';

var ImagePicker = require('react-native-image-picker');
import Toast from 'react-native-simple-toast';

var options = {
  title: 'Profile Pic',
  quality: 1.0,
  maxWidth: 500,
  maxHeight: 500,
   noData: true,
      storageOptions: {
        cameraRoll: true,
        waitUntilSaved: true,
		skipBackup: true,
        path: 'images'
      }, 
};

export default class User extends Component { 
 
		 static navigationOptions = {
    title: 'Profile',
  };
  	
  constructor(props) { 
    super(props) 
    this.state = { 
      avatarSource:'https://facebook.github.io/react-native/docs/assets/favicon.png',      
		pass:'',
		userName:'',
    }
  }	  
	 componentWillMount(){
         try {
			   console.log("hello======= ");
			 
		   AsyncStorage.getItem("user").then((result) => {
			   if(result != undefined){
		    const jsonstr=  JSON.parse(result);  				   
				   
				    console.log("user detail -- " + jsonstr.email);
			
				   this.setState({
		         userName:jsonstr.email,
		         pass:jsonstr.password,
		       });
		   }	      
           })
           .then(res => {
     
            });	 		
			 
          } catch (error) {
          // Error retrieving data
			  console.log("user error -- " + error);
          }
	   } 
  captureImage(){
	  /**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info below in README)
 */
ImagePicker.showImagePicker(options, (response) => {
  console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  }
  else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  }
  else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  }
  else { 
console.log("get image path " + response.uri);
    // You can also display the image using data:
    // let source = { uri: 'data:image/jpeg;base64,' + response.data };

    this.setState({
      avatarSource: response.uri,
    });
     }
    });
  }
	showToast= async () =>
	{
		
		console.log('inside api calling==');
		const data = new FormData();
		data.append('business_id', 5); // you can append anyone.
			data.append('business_images', {
  uri: this.state.avatarSource,
  type: 'image/jpeg', // or photo.type
  name: 'favicon'
});
fetch('http://ec2-13-126-217-207.ap-south-1.compute.amazonaws.com/coupon/Api/add_business_image', {
	 headers: {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data'
  },
  method: 'post',
  body: data
})/*.then((response) => response.json())
      .then((responseJson) => {
       //this.setState({data: responseJson.feed.entry});
	console.log('api result===='+ responseJson)
      })
      .catch((error) => {
        console.error(error);
      });
*/

.then(res => {

	  var response = res.json() ; //JSON.parse(res);
	  console.log('api result===='+response)

});
		
		
		
		/*let body = new FormData();
		body.append('business_id':5);
	body.append('business_images', {uri: this.state.avatarSource,name: 'photo.png',filename :'imageName.png',type: 'image/png'});
    body.append('Content-Type', 'image/png');
		try{
		// call api
		const response = await fetch('http://ec2-13-126-217-207.ap-south-1.compute.amazonaws.com/coupon/Api/add_business_image', {
     method: 'POST',
     headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'multipart/form-data',
                },
			body:body
			  body: JSON.stringify({
   			   business_id : 5,
     		   business_images:this.state.avatarSource,
     })
      })
		 business_id - 5
		 business_images
		   console.log('inside api calling======== ')
		   console.log('inside api calling image======== '+this.state.avatarSource)
		   
	   const post = await response.json()
	   console.log('user profile json response======== '+post)
	   const posts=post.all_categories
	   console.log(posts)
       this.setState({loading: false, posts})
	}catch (exception) {
			console.log(exception)
        this.setState({loading: false, error: true})
    }	
		Toast.show('save user info', Toast.LONG);
		this.props.navigation.navigate('Home'); 
	}
	*/
	}
	render(){
		  const {userName,contact,pass} = this.state
		//  console.log("user name "+userName);
	return(
		<View style={{flex:1}}>
		<Header navigation={this.props.navigation} title={'UserProfile'}/>
		<View style={{marginTop:15,alignItems:'center',justifyContent:'center'}}>
		<TouchableOpacity onPress={this.captureImage.bind(this)}>
		 <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}> 
            <Image style={styles.avatar} source={{isStatic:true,uri:this.state.avatarSource}} />         	   
		    </View>
			</TouchableOpacity>
		</View>
				<View style={{marginTop:30,}}>
						<Text style={{marginLeft:15, marginBottom:15}}>User Name</Text>
					  <TextInput underlineColorAndroid='transparent' value = {this.state.userName} style={styles.textInput} 
						onChangeText={textInputName => this.setState({textInputName})} />
					<Text style={{marginLeft:15, marginBottom:15}}>Password</Text>
		 			<TextInput underlineColorAndroid='transparent' value = {this.state.pass} style={styles.textInput} 
						onChangeText={textInputPass => this.setState({textInputPass})} />
				</View>
			<TouchableOpacity onPress={()=>this.showToast()} >
							<View style={styles.saveButton}>
								<Text style={{color:'white'}}>Save</Text>	
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
 textInput: {
      color: '#000',
	  borderColor: '#000',
	  alignSelf: 'stretch',
		  marginLeft:12,
			  marginRight:12,
	  borderWidth:0.6,
		  borderRadius:15,
      backgroundColor: 'rgba(255,255,255,0.3)',
      padding: 10,
	  marginBottom:12,
		  
  },
	saveButton:
	{
		marginTop:10,
		backgroundColor:'#003d00',
		width:160,
		padding:20,
		marginTop:20,
		alignItems:'center',
		marginLeft:95,
		borderRadius: 28,
			elevation: 20, 
		shadowOffset: { width: 10, height: 10 }, 
		shadowOpacity: 1,
	
	},avatar: {
    borderRadius: 75,
    width: 120,
    height: 120,
	margin:8
  },avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
});
