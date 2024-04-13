import React from "react"
import "./LoginModal.css"

const LoginModal = ({ closeModal }) => {

    const handleOnSubmit = async (e) =>{
        e.preventDefault()
        try {
            const fetchUrl = process.env.REACT_APP_API_LOGIN_URL
             const response = await fetch (fetchUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"},
                body: JSON.stringify({
                    email: e.target.elements.email.value,
                    password: e.target.elements.password.value
                }),
                credentials: "include"
            })
            const data = await response.json()
            console.log(data.status);
        } catch (error) {
            console.error("Login error: ",error);
        }
    }

    return (
        <div className="loginModalContainer">
            <div className="loginModalContent">
                <button onClick={() => closeModal(false)}> X </button>
                <form className="d-flex flex-column" onSubmit={handleOnSubmit}> 
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="email" name="email" placeholder="Your email goes here"/>
                        <label htmlFor="email">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="password" name="password" placeholder="Password"/>
                        <label htmlFor="password">Password</label>
                    </div>
                        <button type="submit"> Login! </button>
                </form>
            </div>
        </div>
    )
}

export default LoginModal;
