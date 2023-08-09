import "./App.css";
import React, { useEffect, useState } from "react";
import Home from "./containers/Home";
import SignIn from "./containers/Signin";
import SignUp from "./containers/Signup";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { getInitialdata, isUserLoggedIn } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import Products from "./containers/Products";
import Orders from "./containers/Orders";
import Category from "./containers/Category";
import { getAllCategory } from "./actions/category.action";
import NewPage from "./containers/NewPage";

function App() {
  const auth = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const dispatch = useDispatch();

  //componentDidMount(call only once) or componentDidUpdate(call again when data gets changed)
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if (auth.authenticate) {
      dispatch(getInitialdata(page, limit, ""));
    }
  }, [auth.authenticate]);

  const handlePageQuery = (activePage, limit, searchKey) => {
    dispatch(getInitialdata(activePage, limit, searchKey));
    setPage(activePage);
    setLimit(limit);
    //console.log(activePage, limit);
  };
  return (
    <>
      <div className="App">
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" exact element={<Home />}></Route>
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/page" element={<NewPage />}></Route>
          </Route>
          <Route element={<PrivateRoute />}>
            <Route
              path="/products"
              element={<Products getPageQuery={handlePageQuery} />}
            ></Route>
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/orders" element={<Orders />}></Route>
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/category" element={<Category />}></Route>
          </Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
