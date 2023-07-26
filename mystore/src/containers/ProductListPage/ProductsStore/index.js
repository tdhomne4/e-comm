import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getProductBySlug } from '../../../actions/product.action';
import { Link } from 'react-router-dom';
import Card from '../../../components/UI/Card';
const ProductsStore = (props) => {
	const product = useSelector(state => state.product);
	const [priceRange, setPriceRange] = useState({
		under5k : 5000,
		under10k : 10000,
		under20k : 20000,
		under30k : 30000
	})
	const dispatch = useDispatch();
	const {slug} = useParams();

useEffect(() => {
		dispatch(getProductBySlug(slug));
	},[]);

	return (
		<>
			<div style={{marginTop:'7%'}}>
			{
				Object.keys(product.productsByPrice).map((key,index) => {
					return (
						
						<Card
							headerLeft={`${slug} under ${priceRange[key]}k`}
							headerRight={<button className='cardBtn'>View All</button>}
							style={{
								width : 'calc(100% - 40px)',
								margin : '20px'
							}}
						>
						<div style={{display:'flex'}}>
						{
							product.productsByPrice[key].map((product,index) => 
								<Link 
										to={`/${product.slug}/${product._id}/p`}
										style={{display:'block'}} 
										className="productContainer" key={index}>
								<div className="productImgContainer">
									<img src={`http://localhost/learning/react-js/e-comm-first-project/backend/src/uploads/${product.productPictures[0].img}`} />
								</div>
								<div className='productInfo'>
									<div style={{margin:'5px 0'}}><h2>{product.name}</h2></div>
									<div className='product-qty'>
										<span>Quantity : {product.quantity}</span>
									</div>
									<div className='productPrice'>Price : {product.price}</div>
								</div>
							</Link>
								)
						}
					</div>
					</Card>
				
					)
				})
			}
			</div>	
		</>
	)
}

export default ProductsStore