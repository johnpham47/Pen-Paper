import React from 'react'
import { Link } from 'react-router-dom'

const LoggedOutMenu = () => {
    return (
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/register'>Register</Link></li>
            <li><Link to='login'>Login</Link></li>
        </ul>
    )
}

export default LoggedOutMenu