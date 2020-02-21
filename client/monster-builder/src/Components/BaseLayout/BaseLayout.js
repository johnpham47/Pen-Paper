import React from 'react';
import Menu from '../BaseLayout/Menu/Menu'
import Footer from '../BaseLayout/Footer'
import '../../public/css/Base.css'

const BaseLayout = (props) => {
    return (
        <div className="container">
            <Menu />
            {props.children}
            <Footer />
        </div>
    )
}

export default BaseLayout