import React from "react"
import config from "../../config.js"
import googleIcon from "../../assets/googleIcon.png"
import fbIcon from "../../assets/fbIcon.png"
import "./LoginModal.css"
import { useDispatch } from "react-redux"
import { login } from "../../redux/userSlice.js"

const LoginModal = ({ closeModal, openRegisterModal }) => {
    const dispatch = useDispatch()

    const handleOnSubmit = async (e) =>{
        e.preventDefault()
        try {
            const fetchUrl = config.api_login_url
            console.log("login Url: ", fetchUrl)
             
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
            if (data.status === "success") {
                const userData = {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    role: data.role
                };
                dispatch(login(userData));             
                closeModal(false);
            }
        } catch (error) {
            console.error("Login error: ",error);
        }
    }

    return (
        <div className="loginModalContainer">
        
            <div className="loginModalContent">
                <div className="closeLoginModal-container">
                    <button onClick={() => closeModal(false)} className="closeLoginModalBtn"> X </button>
                </div>

                <h1 className="text-center">Login</h1>
                <form className="d-flex flex-column p-3" onSubmit={handleOnSubmit}> 
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="email" name="email" placeholder="Your email goes here" autoComplete="on" required/>
                        <label htmlFor="email">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="password" name="password" placeholder="Password" autoComplete="on" required/>
                        <label htmlFor="password">Password</label>
                    </div>
                    <button type="submit" className="loginBtn"> Login! </button>
                    <div className="otherOptions-container">
                        <div >
                            <button type="button" onClick={() => { closeModal(false); openRegisterModal(true); }} className=""><p>Don't have an account?</p></button>
                        </div>
                        <div >
                            <a href="http://"><p className="forgotPassword">Forgot password?</p></a>
                        </div>
                    </div>
                    <div className="separator"></div>
                    <p className="text-center text-dark mb-2">or sign in with:</p>
                    <div className="socialButtons">
                        <button className="socialButton googleButton">
                            <img src={googleIcon} alt="Google Icon" className="me-1"/>
                            <p className="text-dark">Google</p>  
                        </button>
                        <button className="socialButton facebookButton">
                            <img src={fbIcon} alt="Facebook Icon" className="me-1"/>
                            <p className="text-dark">Facebook</p>
                            </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginModal;
