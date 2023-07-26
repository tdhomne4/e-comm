import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout';
import { useDispatch,useSelector} from 'react-redux';
import getParams from '../../utils/getParams';
import { useParams } from 'react-router-dom';
import './style.css';
import { getProductDetailsById } from '../../actions/product.action';
import { 
  IoIosArrowForward, 
  IoIosStar, 
  IoMdCart 
} from 'react-icons/io';
import { BiRupee } from 'react-icons/bi';
import { AiFillThunderbolt } from 'react-icons/ai';
import { MaterialButton } from '../../components/MaterialUI';
import api  from '../../../src/urlConfig';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { addToCart } from '../../actions/cart.action';
import { useNavigate } from "react-router-dom";



const ProductDetailsPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const product = useSelector(state => state.product);
	const {productSlug} = useParams();
	useEffect(() => {
		const url = window.location.href;
		const params = url.split(productSlug+'/')[1];
		const  productId  = params.split('/p')[0];
	dispatch(getProductDetailsById(productId));
}, []);

const addToCartFun = () => {
		const {_id,name,price,quantity} = product.productDetails;
		const img = product.productDetails.productPictures[0].img;
		dispatch(addToCart({_id,name,price,img,quantity}));
		navigate("/cart");

}
return (
	<Layout>
			<div className="breed">
				<ul>
					<li><a href="#">Home</a><IoIosArrowForward /></li>
					<li><a href="#">Mobiles</a><IoIosArrowForward /></li>
					<li><a href="#">Samsung</a><IoIosArrowForward /></li>
					<li><a href="#">{product.productDetails && product.productDetails.name}</a></li>
				</ul>
			</div>
				{product?.productDetails ?
					<>
			 <div className="productDescriptionContainer">
					<div className="flexRow">
						<div className="verticalImageStack">
							{product?.productDetails?.productPictures ? 
								<div className="thumbnail">
									<img src={`http://localhost/learning/react-js/e-comm-first-project/backend/src/uploads/
													${product.productDetails.productPictures[0].img}`} 
												alt='' />
								</div>
									 : 
								null
							}
						</div>
						<div className="productDescContainer">
							{product.productDetails?.productPictures ? 
								<div className="productDescImgContainer">
									<img src={`http://localhost/learning/react-js/e-comm-first-project/backend/src/uploads/
											${product.productDetails.productPictures[0].img}`} 
												alt='' />
								</div>
									: null
							}
							{/* action buttons */}
							<div className="row">
								<MaterialButton
									title="ADD TO CART"
									bgColor="#ff9f00"
									textColor="#ffffff"
									style={{
										marginRight: '5px',
										width: '44%',
										float : 'left'
									}}
									icon={<IoMdCart />}
									onClick = {addToCartFun}
								/>
								<MaterialButton
									title="BUY NOW"
									bgColor="#fb641b"
									textColor="#ffffff"
									style={{
										marginLeft: '5px',
										width: '44%',
										float : 'right'
									}}
									icon={<AiFillThunderbolt />}
								/>
							</div>
						</div>
					</div>

				<div className="productDetails">
						<p className="productTitle">{product.productDetails && product.productDetails.name}</p>
						<div>
								<span className="ratingCount">4.3 <IoIosStar /></span>
								<span className="ratingNumbersReviews">72,234 Ratings & 8,140 Reviews</span>
						</div>
						<div className="extraOffer">Extra <BiRupee />4500 off </div>
						<div className="flexRow priceContainer">
								<span className="price"><BiRupee />{product.productDetails && product.productDetails.price}</span>
								<span className="discount" style={{ margin: '0 10px' }}>22% off</span>
								{/* <span>i</span> */}
						</div>
						<div>
							<p style={{ 
									color: '#212121', 
									fontSize: '14px',
									fontWeight: '600' 
									}}>Available Offers</p>
								<p style={{ display: 'flex' }}>
									<span style={{
										width: '100px',
										fontSize: '12px',
										color: '#878787',
										fontWeight: '600',
										marginRight: '20px'
								}}>Description</span>
								<span style={{
									fontSize: '12px',
									color: '#212121',
								}}>{product.productDetails && product.productDetails.description}</span>
								</p>
					</div>
		</div> 
		</div>

		</>
			: 
			null
		}
	</Layout>
)

}

export default ProductDetailsPage