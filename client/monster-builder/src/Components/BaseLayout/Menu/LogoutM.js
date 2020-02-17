import React from 'react'
import { Link } from 'react-router-dom'
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