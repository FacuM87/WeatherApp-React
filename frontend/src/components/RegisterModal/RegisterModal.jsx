import React from 'react'
import "./RegisterModal.css"

const RegisterModal = ({closeModal}) => {
  return (
    <div className="registerModalContainer">
        <div className="registerModalContent">
            <button onClick={() => closeModal(false)}> X </button>
            <form className="d-flex flex-column"> 
                <input type="text" name="email" autoComplete="email" placeholder="Email" />
                <input type="password" name="password" autoComplete="off" placeholder="Password" />
                <button type="submit"> Register! </button>
            </form>
        </div>
    </div>
  )
}

export default RegisterModal