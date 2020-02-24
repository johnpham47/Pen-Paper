import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BaseLayout from './Components/BaseLayout/BaseLayout'
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import reducer from './store/reducer'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Login from './Components/Login-Logout-Reg/Login/Login'
import LogoutRedirect from './Components/Login-Logout-Reg/LogoutRedirect'
import Register from './Components/Login-Logout-Reg/Registration/Register'
import Notes from './Components/Notes/Notes'
import requireAuth from './Components/Auth/requireAuth'


const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
<Provider store={store}>
    <BrowserRouter>
        <BaseLayout>
            <Switch>
                <Route exact path="/" component = {App} />
                <Route path="/register" component = {Register} />
                <Route path="/login" component = {Login} />
                <Route path="/logout" component = {LogoutRedirect} />
                <Route path="/monsters" component = {requireAuth(Notes)} />
            </Switch>
        </BaseLayout>
    </BrowserRouter>
</Provider>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
