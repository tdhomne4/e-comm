const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cartSchema = new mongoose.Schema({
	user : {type : mongoose.Schema.Types.ObjectId, ref : "users", required : true},
	cartItems : [
		{
			product : {type : mongoose.Schema.Types.ObjectId, ref: "products", required:true},
			quantity : {type : Number, default : 1},
			// price : {type:Number, required : true}

		}
	]
},{timestamps : true});


module.exports = mongoose.model('Cart',cartSchema);