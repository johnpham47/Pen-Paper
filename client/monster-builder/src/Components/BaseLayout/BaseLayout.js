import React from 'react';
import Menu from '../BaseLayout/Menu/Menu'
import Footer from '../BaseLayout/Footer'

const BaseLayout = (props) => {
    return (
        <div>
            <Menu />
            {props.children}
            <Footer />
        </div>
    )
}

export default BaseLayout