const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const productSchema = new mongoose.Schema({
	name : {
		type : String,
		required : true,
		trim : true
		},
	slug : {
		type : String,
		required : true,
		unique : true
	},
	price : {
		type : Number,
		required : true
	},
	description : {
		type : String,
		required : true,
		unique : true
	},
	offer : {
		type : Number
	},
	quantity : {
		type : Number,
		required:true
	},
	productPictures : [
		{img : {type:String}}
	],
	category : { type : mongoose.Schema.Types.ObjectId, ref : 'Category',required:true},
	reviews : [
		{
			userId : {type : mongoose.Schema.Types.ObjectId, ref : 'users'},
			review : String
		}
	],
	createdBy : { type : mongoose.Schema.Types.ObjectId, ref : 'users',required:true},
	updatedAt : Date,
},{timestamps : true});


module.exports = mongoose.model('products',productSchema);