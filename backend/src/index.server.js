const express = require ('express');
const env = require ('dotenv');
const mongoose = require('mongoose');

const cors = require('cors');
const app = express();
const path = require('path');

//make connection with mongodb
const databaseName = "flipcart";
const connectionURI = "mongodb://localhost:27017/flipcart";
mongoose.connect(connectionURI,{useUnifiedTopology:true}).then(() => {
	console.log("DB connected");
})

//call routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const initialData = require('./routes/admin/initialData');
const pageRoutes = require('./routes/page');
const addressRoutes = require('./routes/address');
//call environment variable or constant
env.config();

//middleware for sending data
app.use(cors());
app.use(express.json());
app.use('public',express.static(path.join(__dirname,'uploads')));
app.use('/api',authRoutes);
app.use('/api',adminRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes);
app.use('/api',initialData);
app.use('/api',pageRoutes);
app.use('/api',addressRoutes);
app.listen(process.env.PORT,() => {
	console.log(`Server is running on PORT ${process.env.PORT}`);
});