import React from 'react'
import { Link } from 'react-router-dom'
// import '../../../public/css/Menu.css'

const LoginM = () => {
    return (
        <div className="navbar">
            <div className="logo">Logo</div>
            <ul className="nav-items">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/create'>Create</Link></li>
                <li><Link to='/monsters'>Monsters</Link></li>
                <li><Link to='/logout'>Logout</Link></li>
            </ul>
        </div>
        
    )
}

export default LoginM