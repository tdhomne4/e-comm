import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { signout } from '../../actions/auth.action';

 const Header = (props) => {
  const auth = useSelector(state=>state.auth);
  const dispatch = useDispatch();
  
  const logout = () => {
    dispatch(signout());
  }
  const renderLoggedInUser = () => {
      return (
        <>
        <Nav>
          <li className='nav-item'>
            <span style={{color:"white"}} onClick={logout}>Signout</span>
          </li>
        </Nav>
      </>
      )
  }
  const renderNotLoggedInUser = () => {
    return (
      <>
        <Nav>
          <Nav.Link href="/signin" style={{color:"white"}}>SignIn</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="/signup" style={{color:"white"}}>SignUp</Nav.Link>
        </Nav>
      </>
    )
  }
  return(
		<>
			 <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark" style={{zIndex:1}}>
      <Container fluid>
        <Navbar.Brand href="/">Admin Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          {auth.authenticate ? renderLoggedInUser() : renderNotLoggedInUser()}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
       
		</>
	 )

 }

 export default Header;