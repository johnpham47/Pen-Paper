import React from 'react'
import { connect } from 'react-redux'
import { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { setAuthenticationHeader } from '../../../utils/authentication'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: 'white'
    },

    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', 
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


const Login = (props) => {
    const [user, setUser] = useState({})
    const [error, setError] = useState(1)

    function handleInput(e) {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    function handleLogin(e) {
        e.preventDefault();
        console.log("Logging in...")
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                username: user.username,
                password: user.password
            })
        })
        .then(response => response.json())
        .then(json => {
            const token = json.token
            localStorage.setItem('jsonwebtoken', token)
            setAuthenticationHeader(token)
            console.log(token)

            if (json.isAuthenticated) {
                props.onLogin()
                props.history.push('/monsters')
            }
            else {
                setError({
                    message: 2
                })
            }

        })
    }
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs" classes={{root: classes.container}}>
            <CssBaseline />
            <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <form className={classes.form} noValidate>
                {error.message === 2 && <p>Invalid credentials, please try again.</p>}
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    onChange={handleInput}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleInput}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleLogin}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item>
                        <Link href="/register" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </div>
    </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: () => dispatch({ type: 'LOGIN'}),
        onLogout: () => dispatch({ type: 'LOGOUT'})
    }
}

export default connect(null, mapDispatchToProps) (withRouter(Login))