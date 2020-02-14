import React from 'react'
import { connect } from 'react-redux'
import { useState } from 'react'

const Login = () => {
    return (
        <div>
            <h1>Login</h1>
            <label>Username</label>
            <input type="text" name="username" />
            <label>Password</label>
            <input type="text" name="password" />
        </div>
    )
}

export default Login