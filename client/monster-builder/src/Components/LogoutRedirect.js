import { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

const LogoutRedirect = (props) => {
    useEffect(() => {
        axios.post('http://localhost:8080/logout')
        props.handleLogout()
        localStorage.removeItem('jsonwebtoken')
        props.history.push('/login')

    })

    return null
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogout: () => dispatch({ type: 'LOGOUT' })
    }
}

export default connect(null, mapDispatchToProps) (withRouter(LogoutRedirect))