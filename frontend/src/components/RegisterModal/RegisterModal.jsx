import React, { useState } from 'react'
import "./RegisterModal.css"
import config from '../../config.js'

const RegisterModal = ({closeModal, openLoginModal}) => {
	const [loading, setLoading] = useState(false)

  	const handleOnSubmit = async (e) =>{
		e.preventDefault()
		setLoading(true)

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
					password: e.target.elements.password.value,
				})
			})
			const data = await response.json()
			setLoading(false)
			console.log(data.status);

		} catch (error) {
			console.error(error);
		}
  	}

	return (
		<div className="registerModalContainer">
			<div className="registerModalContent">
				<div className="closeRegisterModal-container">
                    <button onClick={() => closeModal(false)} className="closeRegisterModalBtn"> X </button>
                </div>
				<h1 className="text-center mt-0">Register</h1>
				<form onSubmit={handleOnSubmit} className="d-flex flex-column p-3" > 
					<div className="form-floating mb-3">
                        <input type="text" className="form-control" id="first_name" name="first_name" placeholder="Enter your name" autoComplete="on" required/>
                        <label htmlFor="first_name">First Name</label>
                    </div>
                    <div className="form-floating mb-3">
						<input type="text" className="form-control" id="last_name" name="last_name" placeholder="Enter your last name" autoComplete="on" required/>
                        <label htmlFor="last_name">Last Name</label>
                    </div>
					<div className="form-floating mb-3">
                        <input type="email" className="form-control" id="email" name="email" placeholder="Enter your email" autoComplete="on" required/>
                        <label htmlFor="email">Email address</label>
                    </div>
					<div className="form-floating">
                        <input type="password" className="form-control" id="password" name="password" placeholder="Enter your password" autoComplete="on" required/>
                        <label htmlFor="password">Password</label>
                    </div>
					{
						loading ? 
						(
							<div className="text-center mt-3">
								<div className="spinner-border" role="status">
								</div>
							</div>
						) : (
							<div className='text-center'>
								<button type="submit" className="registerBtn"> Register! </button>
								<button onClick={() =>{ closeModal(false);openLoginModal(true)}} className="goLoginModal"><p>Already have an account? Login!</p></button>
							</div>
						)
					}
				</form>
			</div>
		</div>
	)
}

export default RegisterModal
