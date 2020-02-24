import React from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import LinkMUI from '@material-ui/core/Link'
import { withStyles } from '@material-ui/core/styles'
import styles from './Styling/LoginS'

const LoginM = (props) => {
    const {classes} = props
    return (
        <div>
            <AppBar className={classes.nav}>
                <Toolbar>
                <Typography className={classes.title}>
                        <img className={classes.img} src="https://i.pinimg.com/originals/de/19/c1/de19c15961ec35adcf8b8453b98ab631.png" alt={'P&P'} />
                </Typography>
                <Button component={Link} to="/" className={classes.navBtn}>Home</Button>
                <Button component={Link} to="/monsters" className={classes.navBtn}>Notes</Button>
                <Button component={Link} to="/logout" className={classes.navBtn}>Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
        
    )
}

export default withStyles(styles) (LoginM)