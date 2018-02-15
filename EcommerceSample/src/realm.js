'use-strict';
import Realm from 'realm';

class User extends Realm.Object {}
User.schema = {
  name: 'User',
	 primaryKey: 'item_name',
  properties: {
  // id:'int',
	 item_name: 'string',
	  item_description:'string',
	  item_weight:'string',
	  item_Price:'float',
	  item_number:'int',
	  item_image:'string',
  },
};
class WishList extends Realm.Object {}
	WishList.schema={
	name:'WishList',	
	 primaryKey: 'item_name',
  	 properties: {
	 item_name: 'string',
	  item_description:'string',
	  item_weight:'string',
	  item_Price:'float',
	  item_number:'int',
	  item_image:'string',
  },
	};

export default new Realm({schema: [User,WishList]});