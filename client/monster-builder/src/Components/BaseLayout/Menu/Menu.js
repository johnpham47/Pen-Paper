import React from 'react';
import { connect } from 'react-redux'
import LogoutM from './LogoutM'
import LoginM from './LoginM'

const Menu = (props) => {
    const isLoggedIn = props.isLoggedIn
    if (isLoggedIn) {
        return <LoginM />
    }
    else {
        return <LogoutM />
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isAuth
    }
}

export default connect(mapStateToProps) (Menu)