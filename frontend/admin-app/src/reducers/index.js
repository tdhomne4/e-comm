import { combineReducers } from "redux";
import authReducers from "./auth.reducers";
import userReducers from "./user.reducers";
import productsReducers from "./products.reducers";
import orderReducers from "./order.reducers";
import categoryReducers from "./category.reducers";
import pageReducers from './page.reducers';
const rootReducer = combineReducers({
	auth : authReducers,
	user : userReducers,
	product : productsReducers,
	category : categoryReducers,
	order : orderReducers,
	page : pageReducers
});
export default rootReducer;