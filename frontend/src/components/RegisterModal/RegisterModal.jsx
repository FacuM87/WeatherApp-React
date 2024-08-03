import React from 'react'
import "./RegisterModal.css"
import config from '../../config.js'

const RegisterModal = ({closeModal}) => {

  	const handleOnSubmit = async (e) =>{
		e.preventDefault()

		const fetchUrl = config.api_register_url 
		try {
			const response = await fetch(fetchUrl,{
				method: "post",
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					first_name: e.target.elements.first_name.value,
					last_name: e.target.elements.last_name.value,
					email: e.target.elements.email.value,
					age: e.target.elements.age.value,
					password: e.target.elements.password.value,
				})
			})
			const data = await response.json()
			console.log(data.status);

		} catch (error) {
			console.log(error);
		}
  	}

	return (
		<div className="registerModalContainer">
			<div className="registerModalContent">
				<button onClick={() => closeModal(false)}> X </button>
				<form onSubmit={handleOnSubmit} className="d-flex flex-column" > 
					<input type="text" name="first_name" autoComplete="off" placeholder="Name" required/>
					<input type="text" name="last_name" autoComplete="off" placeholder="Last name" required/>
					<input type="email" name="email" autoComplete="email" placeholder="Email" required/>
					<input type="number" name="age" autoComplete="off" placeholder="Age" required/>
					<input type="password" name="password" autoComplete="off" placeholder="Password" required/>
					<button type="submit"> Register! </button>
				</form>
			</div>
		</div>
	)
}

export default RegisterModal