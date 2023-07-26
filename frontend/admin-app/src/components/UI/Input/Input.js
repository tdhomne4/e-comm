import React from 'react'
import {Form} from "react-bootstrap"
/**
* @author
* @function Input
**/

const Input = (props) => {
	return(
		<>
			<Form.Group className="mb-3" controlId="formBasicEmail">
			{props.lable &&  <Form.Label className='lable'>{props.lable}</Form.Label>}
						<Form.Control type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.onChange} />
						<Form.Text className="text-muted">
							{props.errormessage}
						</Form.Text>
					</Form.Group>
		</>
	 )

 }
 export default Input