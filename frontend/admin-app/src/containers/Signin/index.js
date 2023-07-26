import React, { useEffect, useState } from 'react';
import {Container,Row,Col,Form, Button} from "react-bootstrap";
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input/Input';
import {login} from '../../actions';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';

const SignIn = () =>{

	const [email,setEmail] = useState('');
	const [password,setPassword] = useState('');
	const [error,setError] = useState('');
	const auth = useSelector(state => state.auth);
	const dispatch = useDispatch();
	const userLogin = (e) => {
		e.preventDefault();
		const user = {
			email,password
		}
		dispatch(login(user));
	}
	if(auth.authenticate){
		return (
			<Navigate to="/" />
		)
}
	return (
		<div>
				<Layout>
			 <Container>
			 <Row style={{marginTop:"70px"}}>
					<Col md={{span:6,offset:3}}>
					<Form onSubmit={userLogin}>
							<Row> 
							<Col md={6}>
										<Input
								lable="Email"
								placeholder="Email"
								value = {email}
								type="email"
								onChange={(e) =>{setEmail(e.target.value)}}
								>
								</Input>
								</Col>
						</Row>
					<Input
					lable="Password"
					placeholder="Password"
					value = {password}
					type="text"
					onChange={(e) =>{setPassword(e.target.value)}}
					>
					</Input>
					<Button variant="primary" className="add-cat" type="submit">Submit</Button>
					</Form>
					</Col>
				</Row>
			</Container>
				</Layout>
		</div>
	)
}

export default SignIn