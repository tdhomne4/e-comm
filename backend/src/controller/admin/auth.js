const User = require('../../models/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.signup = (req,res) => {
	User.findOne({email : req.body.email})
	.exec(async(error, user) => {
		if(user) return res.status(400).json({
			message : "admin already registered"
		});

		const {
			firstName,
			lastName,
			email,
			password
		} = req.body;
		const hash_password = await bcrypt.hash(password,10);

		const _user = new User({
			firstName,
			lastName,
			email,
			hash_password,
			username : Math.random().toString(),
			role : "admin"
		});

		_user.save((error,data) => {
			if(error)
 			{
				return res.status(400).json({
					message : "something went wrong"
				});
 			}
			if(data){
				return res.status(201).json({
					message : "Admin Created successsfully"
				});
			}	
		});
	})
}


//signin function
exports.signin = (req,res) => {
	User.findOne({email : req.body.email})
	.exec((error,user) => {
		if(error) return res.status(400).json({error})
		if(user) {
				//if user authenticate then  it return token to use it as session for existing user using secret ssh key
				if(user.authenticate(req.body.password) && user.role === 'admin') {
					const token = jwt.sign({_id : user._id,role:user.role},process.env.JWT_SECRET,{expiresIn : '1d'});
					res.cookie('token',token,{expiresIn:'2d'});
					const {_id, firstName,lastName,email,role,fullName} = user;
					return	res.status(200).json({
							token,
							user: {_id,	firstName,lastName,email,role,fullName}
						});
				}else{
						return	res.status(400).json({
							message : "Invalid message"
						});
					}
		}else{
			return res.status(400).json({message : "something went wrong"})
		}
	})
}

exports.signout = (req,res) => {
	res.clearCookie('token');
	res.status(200).json({
		message : "Signout successfully"
	})
}