import React from 'react';
import {useState} from 'react'

const Register = () => {
    const [user, setUser] = useState({})

    function handleInput(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmitRegistration() {
        console.log("Registering...")
        fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                username: user.username,
                password: user.password
            }) 
        })
    }
    return (
        <div>
            <h1>Register</h1>
            <label>Enter username</label>
            <input name="username" onChange={handleInput}  type="text" placeholder="Enter username" />
            <label>Enter password</label>
            <input name="password" onChange={handleInput}  type="text" placeholder="Enter password" />
            <button onClick={handleSubmitRegistration}>Register</button>
        </div>
    )
}

export default Register