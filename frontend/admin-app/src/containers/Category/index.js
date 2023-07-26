import React, {useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Layout from '../../components/Layout';
import {Container,Col,Row} from 'react-bootstrap';
import { addCategory,getAllCategory,updateCategories,deleteCategories as deleteCategoriesAction } from '../../actions/category.action';
import Input from '../../components/UI/Input/Input';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {IoIosSquareOutline,IoIosCheckbox,IoIosArrowForward,IoIosArrowDown, IoIosAdd, IoIosCloudUpload,IoIosTrash} 
from 'react-icons/io';
import {AiOutlinePlusSquare,AiOutlineMinusSquare} 
from 'react-icons/ai';
import './style.css';

const Category = () => {
	const dispatch = useDispatch();
	const category = useSelector(state => state.category);
	const [show, setShow] = useState(false);
	const [categoryName,setCategoryName] = useState('');
	const [parentCategoryId,setparentCategoryId] = useState('');
	const [categoryImage,setCategoryImage] = useState('');
	const [checked,setChecked] = useState([]);
	const [expanded,setExpanded] = useState([]);
	const [checkedArray,setCheckedArray] = useState([]);
	const [expandedArray,setExpandedArray] = useState([]);
	const [updateCategoryModal,setUpdateCategoryModal] = useState(false);
	const [deleteCategoryModal,setDeleteCategoryModal] = useState(false);
	
	const handleShow = () => setShow(true);

	const handleClose = () =>{
		const form = new FormData();
		form.append('name',categoryName);
		form.append('parentId',parentCategoryId);
		form.append('categoryImage',categoryImage);
		dispatch(addCategory(form));
		setCategoryName('');
		setparentCategoryId('');
		setShow(false)
	};
	
	const renderCategories = (categories) => {
		let mycategories = [];
		for(let category of categories){
			mycategories.push(
				{
					label :category.name, 
					value : category._id,
					children :  category.children.length > 0 && renderCategories(category.children) 
				}
				// <li key={category._id} className='list-group-item'>
				// 	<FontAwesomeIcon icon={faArrowAltCircleRight} /> {category.name}
				// 	{category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
				// </li>
			)
		}
		return mycategories;
	}

	const createCategoriesList = (categories,options=[]) =>{
		for(let category of categories){
			options.push({value:category._id,name:category.name,parentId : category.parentId,type : category.type});
			if(category.children.length > 0){
				createCategoriesList(category.children,options)
			}
		}
		return options;
	}

	const handleCategoryImage = (e) => {
		setCategoryImage(e.target.files[0]);
	}

	const updateCategory = () => {
		updateCheckedAndExpandedCategories();
		setUpdateCategoryModal(true);
		
	}
	const updateCheckedAndExpandedCategories = () => {
		const categories = createCategoriesList(category.categories);
		const checkedArray = [];
		const expandedArray = [];
		checked.length > 0 && checked.forEach((categoryId,index) => {
			console.log("id"+categoryId);
			const category = categories.find((category,_index) => categoryId==category.value)
			category && checkedArray.push(category);
		})

		expanded.length > 0 && expanded.forEach((categoryId,index) => {
			const category = categories.find((category,_index) => categoryId==category.value)
			category && expandedArray.push(category);
		})
		setCheckedArray(checkedArray);
		setExpandedArray(expandedArray);
	}

	const handleCategoryInput = (key,value,index,type) => {
		if(type == 'checked') {
			const updatedCheckedArray = checkedArray.map((item,_index) => index == _index ? {...item,[key]:value} : item)
			setCheckedArray(updatedCheckedArray);
		}else if(type == 'expanded'){
			const updatedExpandedArray = expandedArray.map((item,_index) => index == _index ? {...item,[key]:value} : item)
			setExpandedArray(updatedExpandedArray);
		}
	}

	const renderAddCategoryModal = () => {
		return (
			<>
					{/** add category modal start*/}
					<Modal show={show} onHide={handleClose}>
							<Modal.Header closeButton>
								<Modal.Title>Add New Category</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<Row>
									<Col>
											<Input 
											value={categoryName}
											label = 'Category Name'
											placeholder='Enter Category Name'
											onChange={(e) => setCategoryName(e.target.value)}
										/>
									</Col>
									<Col>
											<select className='form-control'
											onChange={(e)=>setparentCategoryId(e.target.value)}
											value={parentCategoryId} >
											<option>select category</option>
											{
												createCategoriesList(category.categories).map(option => 
													<option key={option.value} value={option.value}>{option.name}</option>)
											}
										</select>
									</Col>
								</Row>
								<Row>
									<Col>
											<p className='lable form-label' style={{marginBottom:'10px'}}> Add Category Image </p>
											<input type="file" name="categoryImage" onChange={handleCategoryImage} />
									</Col>
								</Row>
								
							</Modal.Body>
							<Modal.Footer>
								<Button variant="primary" className='add-cat' onClick={handleClose}>
									Save Changes
								</Button>
							</Modal.Footer>
				</Modal>
		{/** add category modal end*/}

			</>
		)
	}

	const updateCategoriesForm = () => {
		const form = new FormData();
		expandedArray.forEach((item,index) => {
			form.append('_id',item.value);
			form.append('name',item.name);
			form.append('parentId',item.parentId ? item.parentId : '');
			form.append('type',item.type);
		});
		checkedArray.forEach((item,index) => {
			form.append('_id',item.value);
			form.append('name',item.name);
			form.append('parentId',item.parentId ? item.parentId : '');
			form.append('type',item.type);
		})
		dispatch(updateCategories(form))
		setUpdateCategoryModal(false);

	}

	const deleteCategory = () => {
		updateCheckedAndExpandedCategories();
		setDeleteCategoryModal(true);
	}

	const renderUpdateCategoryModal = () => {
		return (
			<>
					{/** Edit category modal start*/}
		<Modal show={updateCategoryModal} onHide={updateCategoriesForm}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Category</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row>
						<Col>
								<h6>Expanded Categories</h6>
						</Col>
					</Row>
					{
						expandedArray.length > 0 &&
						expandedArray.map((item,index) =>
						
						<Row key={index}>
						<Col>
							<Input 
								value={item.name}
								placeholder='Category Name'
								onChange={(e) => handleCategoryInput('name',e.target.value,index,'expanded')}
							/>
						</Col>
						<Col>
								<select className='form-control'
									onChange={(e) => handleCategoryInput('parentId',e.target.value,index,'expanded')}
									value={item.parentId} >
									<option>select category</option>
									{
										createCategoriesList(category.categories).map(option => 
											<option key={option.value} value={option.value}>{option.name}</option>)
									}
								</select>
						</Col>
						<Col>
									<select className='form-control'
									 value={item.type}
									 onChange={(e) => handleCategoryInput('type',e.target.value,index,'expanded')}
									 >
									 <option value = ''>Select type</option>
										<option value = 'store'>Store</option>
										<option value = 'product'>Product</option>
										<option value = 'page'>Page</option>
									</select>
						</Col>
					</Row>
					)
					}
						<Row>
						<Col>
								<h6>Checked Categories</h6>
						</Col>
					</Row>
					{
						checkedArray.length > 0 &&
						checkedArray.map((item,index) =>
						
						<Row key={index}>
						<Col>
							<Input 
								value={item.name}
								placeholder='Category Name'
								onChange={(e) => handleCategoryInput('name',e.target.value,index,'checked')}
							/>
						</Col>
						<Col>
								<select className='form-control'
									onChange={(e) => handleCategoryInput('parentId',e.target.value,index,'checked')}
									value={item.parentId} >
									<option>select category</option>
									{
										createCategoriesList(category.categories).map(option => 
											<option key={option.value} value={option.value}>{option.name}</option>)
									}
								</select>
						</Col>
						<Col>
									<select className='form-control'
									value={item.type}
									onChange={(e) => handleCategoryInput('type',e.target.value,index,'checked')}
									>
										<option value = ''>Select type</option>
										<option value = 'store'>Store</option>
										<option value = 'product'>Product</option>
										<option value = 'page'>Page</option>
									</select>
						</Col>
					</Row>
					)
					}
					
					{/* <lable className='lable form-label' style={{marginBottom:'10px'}}> Add Category Image </lable>
					<input type="file" name="categoryImage" onChange={handleCategoryImage} /> */}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" className='add-cat' onClick={updateCategoriesForm}>
						Save Changes
					</Button>
				</Modal.Footer>
				</Modal>
			{/** Edit category modal end*/}
			</>
		)
	}

	const deleteCategories = () => {
		const checkedIdsArray = checkedArray.map((item,index) => ({_id:item.value}));
		const expandedIdsArray = expandedArray.map((item,index) => ({_id:item.value}));
		const isIdsArray = expandedIdsArray.concat(checkedIdsArray);
		if(checkedIdsArray.length > 0){
			dispatch(deleteCategoriesAction(checkedIdsArray))
			dispatch(getAllCategory());
					setDeleteCategoryModal(false);
		}
	}

	const renderDeleteCategoryModal = () => {
		return (
			<>
		<Modal show={deleteCategoryModal} onHide={() => setDeleteCategoryModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Delete Category</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row>
						<Col>
								<h6>Are you sure ?</h6>
						</Col>
					</Row>
					<Row>
						<Col>Expanded : {expandedArray.map((item,index) => <span key={index}>{item.name}</span>)}</Col>
					</Row>
					<Row>
						<Col>Checked : {checkedArray.map((item,index) => <span key={index}>{item.name}</span>)}</Col>
					</Row>
					<Row>
						<Col sm={2}>
							<Button className='btn btn-danger' onClick={() => alert('no')}>No</Button>
						</Col>
						<Col>
						<Button variant='primary' className='add-cat' onClick={deleteCategories}>Yes</Button>
						</Col>
					</Row>
				
				</Modal.Body>
				</Modal>
			{/** Edit category modal end*/}
			</>
		)
	}


	return (
		<>
			<div>
				<Layout sidebar>
					<Container>
						<Row>
							<Col md={12}>
								<div style={{display:'flex',justifyContent:'space-between',marginTop:'10px',marginBottom:'20px'}}>
									<h3>Category</h3>
									<div className='actionBtnContainer'>
										<span>Actions : </span>
										<button className='btn btn-success add-cat' onClick={handleShow}>
											<IoIosAdd /><span>Add</span>
										</button>
										<button className='btn btn-success add-cat' style={{margin: '10px'}} onClick={deleteCategory} >
											<IoIosTrash /><span>Delete</span>
										</button>
										<button className='btn btn-success add-cat' onClick={updateCategory}>
											<IoIosCloudUpload /><span>Edit</span>
										</button>
									</div>
								</div>
							</Col>
						</Row>
						<Row>
							<Col md={12}>
								<CheckboxTree
											nodes={renderCategories(category.categories)}
											checked={checked}
											expanded={expanded}
											onCheck={checked =>setChecked(checked)}
											onExpand={expanded => setExpanded(expanded)}
											icons={{
												check : <IoIosCheckbox />,
												uncheck : <IoIosSquareOutline />,
												halfCheck : <IoIosSquareOutline />,
												expandClose : <IoIosArrowForward />,
												expandOpen : <IoIosArrowDown />,
												expandAll: <AiOutlinePlusSquare />,
												collapseAll: <AiOutlineMinusSquare />,
												parentClose: <IoIosArrowForward />,
												parentOpen: <IoIosArrowDown />,
												leaf : <IoIosArrowForward />
											}}
									/>
							</Col>
						</Row>
					</Container>
					{renderAddCategoryModal()}
					{renderUpdateCategoryModal()}
					{renderDeleteCategoryModal()}
				</Layout>
			</div>
		</>
	)
}

export default Category