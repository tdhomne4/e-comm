import React, { useEffect, useState } from 'react';
import './style.css';
import logoMyStore from '../../images/logo-my-store.png';
// import goldenStar from '../../images/logo/golden-star.png';
import { IoIosArrowDown, IoIosCart, IoIosSearch,IoIosLogOut } from 'react-icons/io';
import { 
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu
} from '../MaterialUI';
import {useDispatch, useSelector} from 'react-redux';
import { login,signout } from '../../actions/auth.action';
import SignUpModal from './SignUpModal/index'
const Header = (props) => {

  const [loginModal, setLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

	const auth = useSelector(state => state.auth);
	const dispatch = useDispatch();
  
	const userLogin = () => {
		dispatch(login({email,password}))
		setLoginModal(false);
	}
  
	const logout = () => {
	dispatch(signout());
	}

	useEffect(() => {

	},[auth.authenticate]);

	const renderLoggedInMenu = () => {
		return(<DropdownMenu
			menu={
				<a className='fullname'>
					{auth.user.fullName}
				</a>
			}
			menus={[
				{ label: 'My Profile', href: '', icon: null },
				{ label: 'Super Coin Zone', href: '', icon: null },
				{ label: 'Flipkart Plus Zone', href: '', icon: null },
				{ label: 'Orders', href: '', icon: null },
				{ label: 'Wishlist', href: '', icon: null },
				{ label: 'Rewards', href: '', icon: null },
				{ label: 'My Charts', href: '', icon: null },
				{ label: 'Gift Cards', href: '', icon: null },
				{ label: 'Notification', href: '', icon: null },
        { label: 'Logout', href: '', icon: null,onClick:logout }
			]}
		/>);
		
	}
	const renderNonLoggedInMenu = () => {
		return (
			<DropdownMenu
			menu={
        <>
          <a className="loginButton" onClick={() => setLoginModal(true)}>
					Login
				</a>
      </>
			}
			menus={[
				{ label: 'My Profile', href: '', icon: null },
				{ label: 'Flipkart Plus Zone', href: '', icon: null },
				{ label: 'Orders', href: '', icon: null },
				{ label: 'Wishlist', href: '', icon: null },
				{ label: 'Rewards', href: '', icon: null },
				{ label: 'Gift Cards', href: '', icon: null },
			]}
			firstMenu={
				<div className="firstmenu">
					<span>New Customer?</span>
					<a style={{ color: '#000' }} href='/signup'>Sign Up</a>
				</div>
			}
		/>
		);
	}

  return (
    <div className="header">
      {/*Login Modal*/}
      <Modal 
        visible={loginModal}
        onClose={() => setLoginModal(false)}
      >
        <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              <h2>Login</h2>
              <p>Get access to your Orders, Wishlist and Recommendations</p>
            </div>
            <div className="rightspace">
          

                <MaterialInput 
                  type="text"
                  label="Enter Email/Enter Mobile Number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <MaterialInput 
                  type="password"
                  label="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  rightElement={<a href="#">Forgot?</a>}
                />
                <MaterialButton 
                  title="Login"
                  bgColor="red"
                  textColor="#ffffff"
									style={{
										margin:'20px 0'
									}}
									onClick ={userLogin}
                />
            </div>
          </div>
        </div>
      </Modal>


      <div className="subHeader">
				{/*logo*/}
        <div className="logo">
          <a href="">
            <img src={logoMyStore} className="logoimage" alt="" />
          </a>
          <a style={{ marginTop: '-10px' }}>
            {/* <span className="exploreText">Explore</span>
            <span className="plusText">Plus</span> */}
            {/* <img src={logoMyStore} className="goldenStar" alt="" /> */}
          </a>
        </div>
				{/*logo end*/}
				{/*search start*/}
        <div style={{
          padding: '0 10px'
        }}>
          <div className="searchInputContainer">
            <input
              className="searchInput"
              placeholder={'search for products, brands and more'}
            />
            <div className="searchIconContainer">
              <IoIosSearch style={{
                color: '#000'
              }} />
            </div>

          </div>
        </div>
				{/*search ends*/}
        <div className="rightMenu">
        {auth.authenticate ? renderLoggedInMenu() : renderNonLoggedInMenu()}
          <DropdownMenu
            menu={
              <a className="more">
                <span>More</span>
                <IoIosArrowDown />
              </a>
            }
            menus={[
              { label: 'Notification Preference', href: '', icon: null },
              { label: 'Sell on flipkart', href: '', icon: null },
              { label: '24x7 Customer Care', href: '', icon: null },
              { label: 'Advertise', href: '', icon: null },
              { label: 'Download App', href: '', icon: null }
            ]}
          />
          <div>
            <a className="cart">
              <IoIosCart />
              <span style={{ margin: '0 10px' }}>Cart</span>
            </a>
          </div>
					{/* {auth.authenticate ?
					<div className='logout-d'>
            <button className="logout" onClick={logout}>
              <IoIosLogOut />
              <span style={{ margin: '0 10px' }}>Logout</span>
            </button>
					</div>
					 : null} */}
        </div>

      </div>
    </div>
  )

}

export default Header