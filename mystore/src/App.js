import './App.css';
import {BrowserRouter,Routes,Route, useFetcher} from 'react-router-dom';
import HomePage from './containers/HomePage';
import ProductListPage from './containers/ProductListPage';
import { useDispatch,useSelector } from 'react-redux';
import { isUserLoggedIn ,updateCart} from './actions';
import { useEffect } from 'react';
import SignUpModal from './components/Header/SignUpModal';
import ProductDetailsPage from './containers/ProductDetailsPage';
import CartPage from './containers/CartPage';
import CheckoutPage from './containers/CheckoutPage';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  
  useEffect(() => {
    if(!auth.authenticate){
      dispatch(isUserLoggedIn())
    }
  },[auth.authenticate]);
  
  useEffect(() => {
    if(auth.authenticate){
      dispatch(updateCart());
    }
  },[auth.authenticate]);
  return (
    <>
    <div className="App">
        <Routes>    
              <Route path="/" exact element={<HomePage />}></Route>
              <Route path="/cart" element={<CartPage />}></Route>
              <Route path="/signup" element={<SignUpModal />}></Route>
              <Route path="/checkout" element={<CheckoutPage />}></Route>
              <Route path="/:slug" exact element={<ProductListPage />}></Route>
              <Route path="/:productSlug/:productId/p" exact element={<ProductDetailsPage />}></Route>
          </Routes>
    </div>
    </>
  );
}

export default App;
