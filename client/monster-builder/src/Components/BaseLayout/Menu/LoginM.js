import React from 'react'
import { Link } from 'react-router-dom'

const LoginM = () => {
    return (
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/create'>Create</Link></li>
            <li><Link to='/monsters'>Monsters</Link></li>
            <li><Link to='/logout'>Logout</Link></li>
        </ul>
    )
}

export default LoginM