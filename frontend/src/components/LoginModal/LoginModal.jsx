import React from "react"
import googleIcon from "../../assets/googleIcon.png"
import fbIcon from "../../assets/fbIcon.png"
import "./LoginModal.css"

const LoginModal = ({ closeModal, openRegisterModal, session }) => {

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
            if (data.status === "success") {
                session(true);
                closeModal(false);
            }
            console.log("TOKEN: ",data.jwt);
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
                        <input type="email" className="form-control" id="email" name="email" placeholder="Your email goes here" autoComplete="on"/>
                        <label htmlFor="email">Email address</label>
                        </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="password" name="password" placeholder="Password" autoComplete="on"/>
                        <label htmlFor="password">Password</label>
                    </div>
                    <button type="submit" className="loginBtn"> Login! </button>
                    <div className="otherOptions-container">
                        <div >
                            <button type="button" onClick={() => { closeModal(false); openRegisterModal(true); }} className="registerBtn"><p>Don't have an account?</p></button>
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
