import React from "react"
import "./LoginModal.css"

const LoginModal = ({ closeModal }) => {
    return (
        <div className="loginModalContainer">
            <div className="loginModalContent">
                <button onClick={() => closeModal(false)}> X </button>
                <form className="d-flex flex-column" action="/api/users/login"> 
                    <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="email" name="email" placeholder="name@example.com"/>
                        <label for="email">Email address</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="floatingPassword" name="password" placeholder="Password"/>
                        <label for="password">Password</label>
                    </div>
                        <button type="submit"> Login! </button>
                </form>
            </div>
        </div>
    )
}

export default LoginModal;
