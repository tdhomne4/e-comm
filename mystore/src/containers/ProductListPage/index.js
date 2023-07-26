import React from 'react';
import Layout from '../../components/Layout'
import './index.css';
import ProductsStore from './ProductsStore';
import getParams from '../../utils/getParams';
import { useParams } from 'react-router-dom';
import ProductPage from './ProductPage';


const ProductListPage = (props) => {
	const {slug} = useParams();
	const renderProduct = () => {
		const url = window.location.href;
		const params = getParams(url.split(slug)[1]);
		let content = null;
		switch(params.type){
			case 'store' :
				content = <ProductsStore {...props} />;
				break;
				case 'page':
					content = <ProductPage {...props} />;
					break;
				default :
				content = null;
		}
		return content;
	}

	return (
	<>
		<Layout>
			{renderProduct()}
		</Layout>
	
	</>
	)
}

export default ProductListPage