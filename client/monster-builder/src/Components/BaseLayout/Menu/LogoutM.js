import React from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
// import '../../../public/css/Menu.css'

const LogoutM = () => {
    return (
        <div className="navbar">
            <div className="logo">Logo</div>
            <ul className="nav-items">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/register'>Register</Link></li>
                <li><Link to='/login'>Login</Link></li>
            </ul>
        </div>
        
    )
}

export default LogoutM