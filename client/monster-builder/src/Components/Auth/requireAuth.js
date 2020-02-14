import { connect } from 'react-redux'
import React from 'react'

export default function(ComposedComponent) {

    const Authenticate = (props) => {
        if (!props.isLoggedIn) {
            // Not logged in, kick their asses out
            props.history.push('/login')
        }

        return <ComposedComponent {...props} />
    }

    const mapStateToProps = (state) => {
        return {
            isLoggedIn: state.isAuth
        }
    }
    return connect(mapStateToProps)(Authenticate)
}