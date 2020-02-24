import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#09070A'
    },

    copyright: {
        color: "whitesmoke",
        variant: 'body2',
        align: "center"
    }
}))

function Copyright() {
    const classes = useStyles()
    return (
        <Typography className={classes.copyright}>
            {'Copyright © '}
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const Footer = () => {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <Copyright />
        </div>
    )
}

export default Footer