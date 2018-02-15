import React, { Component } from 'react';

const Realm = require('realm');
import realm from '../realm';

module.exports = function() {    
   console.log('inside functions');
   let a = 0;
   try{
   realm.write(() => {			
				let list = realm.objects('User');
				console.log('length ********** == '+ list.length);
				a=list.length;
				 console.log('global class ********** == '+ a);
			});
   }catch(e){
	   console.log("error" + e);
   }
   return a;
}

/*
module.exports cartCounter() {
    console.log('inside functions');
   let a = 0;
   try{
   realm.write(() => {			
				let list = realm.objects('User');
				console.log('length ********** == '+ list.length);
				a=list.length;
				 console.log('global class ********** == '+ a);
			});
   }catch(e){
	   console.log("error" + e);
   }
   return a;
}

/*
module.exports = function() {    
   console.log('inside functions');
   let a = 0;
   try{
   realm.write(() => {			
				let list = realm.objects('User');
				console.log('length ********** == '+ list.length);
				a=list.length;
				 console.log('global class ********** == '+ a);
			});
   }catch(e){
	   console.log("error" + e);
   }
   return a;
}*/
/*
//export default class GlobalMethods extends Component<{}> {
module.exports = {
	 a:
	//var a;
	//console.log('---------inside  cartCount-------');
 realm.write(() => {			
				let list = realm.objects('User');
				console.log('length ********** == '+ list.length);
				 a=list.length;
				 console.log('global class ********** == '+ a);
			}),
 		b:a,
	/*getFunction(){
	 console.log('getFunction class ********** == '+ a);
	}*/
 //console.log("-aaaaaaaaaaaaaaaaa-"+a);
//	}	
//}
