import { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const LogoutRedirect = (props) => {
    useEffect(() => {
        props.handleLogout()
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