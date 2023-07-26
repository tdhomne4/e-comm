import React,{useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {Container,Row,Col,Form, Button} from "react-bootstrap";
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input/Input';
import {userSignup} from '../../actions';
 const SignUp = () => {

	const [firstName,setFirstName] = useState('');
	const [lastName,setLastName] = useState('');
	const [email,setEmail] = useState('');
	const [password,setPassword] = useState('');

	const dispatch = useDispatch();
	const userSignupFunc = (e) => {
		e.preventDefault();
		const user = {
			firstName, lastName, email,password
		}
		dispatch(userSignup(user));
	}

	const user = useSelector(state => state.user);
	if(user.loading){
			return (
				<p>loading...</p>
			)
	}
	return(
		<div>
			<Layout>
			 <Container>
			 <Row style={{marginTop:"50px"}}>
					<Col md={{span:6,offset:3}}>
					<Form onSubmit={userSignupFunc}>
						<Row>
							<Col md={6}>
								<Input
								lable="First Name"
								placeholder="First Name"
								value = {firstName}
								type="text"
								onChange={(e) =>{setFirstName(e.target.value)}}
								>
								</Input>
							</Col>
							<Col>
								<Input
									lable="Last Name"
									placeholder="Last Name"
									value = {lastName}
									type="text"
									onChange={(e) =>{setLastName(e.target.value)}}
									>
									</Input>
								</Col>
								</Row>
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
					<Button variant="primary" className="add-cat"  type="submit">Submit</Button>
					</Form>
					</Col>
				</Row>
			</Container>
				</Layout>
		</div>
	 )

 }
 export default SignUp;