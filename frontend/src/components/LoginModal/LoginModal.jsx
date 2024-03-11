import React from "react"
import "./LoginModal.css"

const LoginModal = ({ closeModal }) => {
    return (
        <div className="loginModalContainer">
            <div className="loginModalContent">
                <button onClick={() => closeModal(false)}> X </button>
                <form className="d-flex flex-column"> 
                    <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"/>
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
                        <label for="floatingPassword">Password</label>
                    </div>
                        <button type="submit"> Login! </button>
                </form>
            </div>
        </div>
    )
}

export default LoginModal;
