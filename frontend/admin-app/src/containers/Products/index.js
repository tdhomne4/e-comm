import React, { useEffect,useState }  from 'react';
import Layout from '../../components/Layout';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Container,Col,Row} from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Input from '../../components/UI/Input/Input';
import {useDispatch,useSelector} from 'react-redux';
import { getAllCategory,addCategory } from '../../actions/category.action';
import { addProduct} from '../../actions/products.action';
import { render } from 'react-dom';
import './index.css';

const Products = () => {
	const [name,setName] = useState('');
	const [productPictures,setProductPictures] = useState([]);
	const [price,setPrice] = useState('');
	const [description,setDescription] = useState('');
	const [quantity,setQuantity] = useState('');
	const [categoryId, setCategoryId] = useState(false);

	const [show, setShow] = useState(false);

	const product = useSelector(state=>state.product);

	const dispatch = useDispatch();
  const handleClose = () =>{

		const form = new FormData();
		form.append('name',name);
		form.append('price',price);
		form.append('description',description);
		form.append('quantity',quantity);
		form.append('category',categoryId);
		for(let pic of productPictures){
			form.append('productPictures',pic);
		}
		dispatch(addProduct(form));
		setShow(false)
	};
  const handleShow = () => setShow(true);

	
	const category = useSelector(state => state.category);


	const createCategoriesList = (categories,options=[]) =>{
		for(let category of categories){
			options.push({value:category._id,name:category.name});
			if(category.children.length > 0){
				createCategoriesList(category.children,options)
			}
		}
		return options;
	}

	const handleProductPictures =(e) => {
		setProductPictures([
			...productPictures,
			e.target.files[0]
		])
	}
const renderAddProductModal = () => {
	return (
		<>
					<Modal show={show} onHide={handleClose}>
							<Modal.Header closeButton>
								<Modal.Title>Add New Product</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<Input 
								lable = 'Product Name'
									value={name}
									placeholder='Enter Product Name'
									onChange={(e) => setName(e.target.value)}
								/>
								<Input 
								lable='Price'
									value={price}
									placeholder='Enter Price'
									onChange={(e) => setPrice(e.target.value)}
								/>
								<Input 
								lable = 'Description'
									value={description}
									placeholder='Enter Description'
									onChange={(e) => setDescription(e.target.value)}
								/>
								<lable className='lable form-label' style={{marginBottom:'10px'}}>Select Category</lable>
								<select className='form-control'
									onChange={(e)=>setCategoryId(e.target.value)}
									value={categoryId} >
									<option>select category</option>
									{
										createCategoriesList(category.categories).map(option => 
											<option key={option.value} value={option.value}>{option.name}</option>)
									}
								</select>

								<Input 
								lable ='Quantity'
									value={quantity}
									placeholder='Enter Product Quantity'
									onChange={(e) => setQuantity(e.target.value)}
								/>
								{
									productPictures.length > 0 ?
									productPictures.map((pic,index) => 
											<div key={index}>{JSON.stringify(pic.name)}</div>
										)
										: null
								}
								<lable className='lable form-label' style={{marginBottom:'10px'}}> Add Product Pictures</lable>
								<input type="file" name="productPictures" onChange={handleProductPictures} />
							</Modal.Body>
							<Modal.Footer>
								<Button variant="primary" onClick={handleClose}>
									Save Changes
								</Button>
							</Modal.Footer>
				</Modal>
		</>
	)
}
const renderProducts = () => {
	return (
		<>
			     <Table responsive="sm">
        <thead>
          <tr>
            <th>Index</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Product Pictures</th>
						<th>Description</th>
						<th>Category</th>
          </tr>
        </thead>
        <tbody>
					{
						product.products.length > 0 ?
							product.products.map((product,index) =>
								<tr key={index}>
								<td>{index}</td>
								<td>{product.name}</td>
								<td>{product.price}</td>
								<td>{product.quantity}</td>
								<td>{product.productPictures.map(pic => 
									<img src={`http://localhost/learning/react-js/e-comm-first-project/backend/src/uploads/${pic.img}`} />
									)}</td>
								<td>{product.description}</td>
								{product.category ? <td>{product.category.name}</td> : null}
							</tr>

								) :null
					}
         
        </tbody>
      </Table>
			
		</>
	)
}

return (
		<>
				<Layout sidebar>
			<Container>
						<Row>
							<Col md={12}>
								<div style={{display:'flex',justifyContent:'space-between',marginTop:'10px',marginBottom:'20px'}}>
									<h3>Products</h3>
									<button className='btn btn-success' onClick={handleShow}>Add Products</button>
								</div>
							</Col>
						</Row>
						<Row>
							<Col>
								{renderProducts()}
							</Col>
						</Row>

					</Container>
						{renderAddProductModal()}
						
		</Layout>
		</>

	)
}

export default Products