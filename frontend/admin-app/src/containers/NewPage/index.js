import React, { useEffect,useState }  from 'react';
import Layout from '../../components/Layout';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Container,Col,Row} from 'react-bootstrap';
import Input from '../../components/UI/Input/Input';
import linearCategories from '../../helpers/linearCategories';
import { useDispatch, useSelector } from 'react-redux';
import { createPage } from '../../actions/page.action';

const NewPage = () => {
	const [show,setShow] = useState(false);
	const [categories,setCategories] = useState('');
	const category = useSelector(state => state.category);
	const page = useSelector(state => state.page);
	const dispatch = useDispatch();
	const [categoryId,setCategoryId] = useState('');
	const [title,setTitle] = useState('');
	const [desc,setDesc] = useState('');
	const [banners,setBanners] = useState([]);
	const [products, setProducts] = useState([]);
	const [type,setType] = useState('');
  
	const handleClose = () =>{
		const form = new FormData();
		form.append('title',title);
		form.append('description',desc);
		form.append('category',categoryId);
		form.append('type',type);
		banners.forEach((banner,index) => {
			form.append('banners',banner);
		})
		products.forEach((product,index) => {
			form.append('products',product);
		});
		dispatch(createPage(form));
		setShow(false);
	};
  const handleShow = () => setShow(true);

	useEffect(() => {setCategories(linearCategories(category.categories));},[category]);
	useEffect(() => {
		if(!page.loading){
			setShow(false);
			setTitle('');
			setDesc('');
			setCategoryId('');
			setType('');
			setBanners([]);
			setProducts([]);
	}
},[page]);
	
	const handleBannerImages = (e) => {
		setBanners([...banners,e.target.files[0]]);
	}

	const handleProductImages = (e) => {
		setProducts([...products,e.target.files[0]]);
	}

	const onCategoryChange = (e) => {
		if(categories != ''){
			const category = categories.find(category => category._id == e.target.value);
			setCategoryId(e.target.value);
			setType(category.type);
		}
	}

	// const onSubmitPageForm = (e) => {
	
	// }
	const renderAddProductModal = () => {
	return (
		<>
					<Modal show={show} onHide={handleClose}>
							<Modal.Header closeButton>
								<Modal.Title>Add New Page</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<Row>		
									<Col>
											<select className='form-control'
											onChange={onCategoryChange}
											value={categoryId} >
											<option>select category</option>
											{
											categories != '' ? 
												categories.map(cat => 
													<option key={cat._id} value={cat._id}>{cat.name}</option>) : null
											}
										</select>
									</Col>
								</Row>
								<Row>
									<Col>
											<Input 
										lable = 'Page Name'
										value={title}
										className='form-control'
										placeholder='Enter page Name'
										onChange={(e)=>setTitle(e.target.value)}
										/>
									</Col>
								</Row>
								<Row>
									<Col>
											<Input 
										lable = 'Product Description'
										value={desc}
										className='form-control'
										placeholder='Enter page Name'
										onChange={(e)=>setDesc(e.target.value)}
										/>
									</Col>
								</Row>
								<Row>
								{
									banners.length > 0 ? banners.map((banner,index) => 
												<Row><Col key={index}>{banner.name}</Col></Row>
												):null
								}
									<Col>
									<span>Banner Image</span>
											<input 
										type='file'
										className='form-control'
										name='banners'
										onChange={handleBannerImages}
										/>
									</Col>
								{
									products.length > 0 ? products.map((product,index) => 
												<Row><Col key={index}>{product.name}</Col></Row>
												):null
								}
									<Col>
									<span>Product Image</span>
											<input 
											lable='products'
										type='file'
										className='form-control'
										name='products'
										onChange={handleProductImages}
										/>
									</Col>
								</Row>
							
							</Modal.Body>
							<Modal.Footer>
								<Button variant="primary" className='add-cat' onClick={handleClose}>
									Save Changes
								</Button>
							</Modal.Footer>
				</Modal>
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
									<h3>Page</h3>
									<button className='btn btn-success add-cat' onClick={handleShow}>Add Page</button>
								</div>
							</Col>
						</Row>
					</Container>
						{renderAddProductModal()}
						
		</Layout>
		</>

	)
}

export default NewPage