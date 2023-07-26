import React from 'react'
import Header from '../Header';
import {Container,Row,Col} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './index.css';
/**
* @author
* @function Layout
**/

 const Layout = (props) => {
	return(
		<>
		<Header />
		{props.sidebar ? 
				<Container fluid>
				<Row>
					<Col md={2} className="sidebar">
						<ul>
						<li><NavLink to={'/'}>Home</NavLink></li>
					</ul>
					<ul>
						<li><NavLink to={'/page'}>Page</NavLink></li>
					</ul>
					<ul>
						<li><NavLink to={'/products'}>Products</NavLink></li>
					</ul>
					<ul>
						<li><NavLink to={'/category'}>Category</NavLink></li>
					</ul>
					<ul>
						<li><NavLink to={'/orders'}>Orders</NavLink></li>
					</ul>
					</Col>
					<Col md={10} style={{marginLeft:'auto',paddingTop:'60px'}}>
					{props.children}
					</Col>
				</Row>
			</Container>
			:
			props.children
			}
	
		</>
	)

 }
 export default Layout;