import React from 'react'
import { connect } from 'react-redux'
import { useState } from 'react'

const Login = () => {
    const [user, setUser] = useState({})

    function handleInput(e) {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    return (
        <div>
            <h1>Login</h1>
            <label>Username</label>
            <input onChange={handleInput} type="text" name="username" />
            <label>Password</label>
            <input onChange={handleInput} type="text" name="password" />
            <button>Login</button>
        </div>
    )
}

export default Login