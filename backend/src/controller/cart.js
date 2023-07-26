const Cart = require('../models/cart');


exports.addItemToCart = async (req, res) => {
	const userId = req.user._id;
	try {
		let cart = await Cart.findOne({user: userId });
		if (cart) {
			req.body.cartItems.forEach((cartItem) => {
				const product = cartItem.product;
				const quantity = cartItem.quantity;
				//cart exists for user
				if(cart.cartItems){
					let itemIndex = cart.cartItems.findIndex(prod => prod.product == product);
					if(itemIndex > -1){
						let productItem = cart.cartItems[itemIndex];
						//   if(quantity != 0){
						//  		productItem.quantity = Number(quantity) + Number(productItem.quantity);
						//  		console.log('added:',productItem.quantity);
						//   }else{
						// 	 productItem.quantity = quantity;
						// 	 console.log('assign:',quantity);
						//  }
						productItem.quantity = quantity;
						cart.cartItems[itemIndex] = productItem;
					}else{
						cart.cartItems.push({ product, quantity});
					} 
					//console.log(cart);
						cart = cart.save();
						return res.status(201).json(cart);
						
											} 
				});
		 	} else {
				const cart = new Cart({
					user: req.user._id,
					cartItems: req.body.cartItems,
				});
				cart.save((error, cart) => {
					if (error) return res.status(400).json({ error });
					if (cart) {
						return res.status(201).json({ cart });
					}
				});
	
			}
		} catch (err) {
			console.log(err);
			res.status(500).send("Something went wrong");
		}
};




exports.getCartItems = (req, res) => {
  //const { user } = req.body.payload;
  //if(user){
		Cart.findOne({ user: req.user._id })
    .populate("cartItems.product", "_id name price productPictures")
    .exec((error, cart) => {
			if (error) return res.status(400).json({ error });
      if (cart) {
        let cartItems = {};
        cart.cartItems.forEach((item, index) => {
          cartItems[item.product._id.toString()] = {
            _id: item.product._id.toString(),
            name: item.product.name,
            img: item.product.productPictures[0].img,
            price: item.product.price,
            qty: item.quantity,
          };
        });
        res.status(200).json({ cartItems });
      }
    });
  //}
};


exports.deleteCartItem = async (req,res) => {
	const ids = req.body._id;
	const userId = req.user._id;
	try {
		let cart = await Cart.findOne({user: userId });
		if(cart.cartItems){
			let itemIndex = cart.cartItems.findIndex(prod => prod.product.toString() == ids);
			if (itemIndex !== -1) {
				cart.cartItems.splice(itemIndex, 1);
				cart = cart.save();
				return res.status(201).json(cart);
			}
		}
	}
	catch (err) {
		console.log(err);
		res.status(500).send("Something went wrong");
	}
}