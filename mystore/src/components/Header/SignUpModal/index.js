import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import Header from '..';
import { userSignup } from '../../../actions/user.actions';
import { Modal,MaterialInput,MaterialButton} from '../../MaterialUI';
import { useNavigate } from "react-router-dom";

const SignUpModal = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [SignUpModal, setSignUpModal] = useState(false);
	const [firstName,setFirstName] = useState('');
	const [lastName,setLastName] = useState('');
	const [email,setEmail] = useState('');
	const [password,setPassword] = useState('');
	const signUp = () => {
    const user = {firstName,lastName,email,password};
    if(dispatch(userSignup(user))){
			alert('user your email and password for login and start shopping');
			navigate('/');
		}
    setSignUpModal(false);
  }
	return (
		     <>
				 <Header />
		<div className='signup-page'>
    <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              <h2>SignUp</h2>
              <p>Create a new account and start shopping with us!</p>
            </div>
            <div className="rightspace">
          			<MaterialInput 
                  type="text"
                  label="Enter First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <MaterialInput 
                  type="text"
                  label="Enter Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
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
                />
                <MaterialButton 
                  title="SignUp"
                  bgColor="red"
                  textColor="#ffffff"
									style={{
										margin:'20px 0'
									}}
									onClick ={signUp}
                />
            </div>
          </div>
        </div>
			</div>
				 </>
	)
}

export default SignUpModal