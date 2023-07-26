import {categoryConstants } from "../actions/constants";

const initialState = {
	categories : [],
	loading : false,
	errro : null
};
const buildNewCategories = (parentId,categories,category) => {
	let mycategories = [];
	// console.log(parentId);
	if(parentId == undefined){
		return [
			...categories,
			{
				_id : category._id,
				name : category.name,
				slug : category.slug,
				type : category.type,
				children : []
			}
		];
	}

	for(let cat of categories){
		if(cat._id == parentId){
			const newCategory = {
				_id : category._id,
				name : category.name,
				slug : category.slug,
				type : category.type,
				parentId : category.parentId,
				children : []
			}
			mycategories.push({
				...cat,
				children : cat.children.length > 0 ?
										[...cat.children,newCategory] : 
										[newCategory]
			})
		}else{
			mycategories.push({
				...cat,
				children : cat.children ? buildNewCategories(parentId,cat.children,category):[]
			})
		}
	}
	return mycategories;
	
}
export default (state=initialState,action) =>{
	switch(action.type){
		case categoryConstants.GETALLCATEGORY_SUCCESS : 
			state = {
				...state,
				categories : action.payload.categories
			}
			break;
			case categoryConstants.ADDNEWCATEGORY_REQUEST : 
			state = {
				...state,
				loading : true
			}
			break;
			case categoryConstants.ADDNEWCATEGORY_SUCCESS : 
				const category = action.payload.category;
 				const updatedCategories = buildNewCategories(category.parentId,state.categories,category);
				console.log(updatedCategories);
				state = {
					...state,
					categories : updatedCategories,
					loading : false
				}
			break;
			case categoryConstants.ADDNEWCATEGORY_FAILURE : 
			state = {
				...initialState	
			}
			break;

			case categoryConstants.UPDATE_CATEGORIES_REQUEST : 
				state = {
					...state,
					loading : true
				}
			break;
			case categoryConstants.UPDATE_CATEGORIES_SUCCESS : 
			state = {
				...state,
					loading : false
			}
			break;
			case categoryConstants.UPDATE_CATEGORIES_FAILURE : 
			state = {
				...state,
					error : action.payload.error,
					loading: false
			}
			break;

			case categoryConstants.DELETE_CATEGORIES_REQUEST : 
			state = {
				...state,
				loading : true
			}
			break;
			case categoryConstants.DELETE_CATEGORIES_SUCCESS : 
			state = {
				...state,
					loading : false
			}
			break;
			case categoryConstants.DELETE_CATEGORIES_FAILURE : 
			state = {
				...state,
					error : action.payload.error,
					loading:false
			}
			break;
	}
	return state;
}