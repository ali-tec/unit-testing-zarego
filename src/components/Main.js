import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Login from './Login';
import Home from './Home';

const Main = () => {
    return (
        <Router>
            {!localStorage.getItem("logged") && <Redirect to="/login" />}
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
            </Switch>
        </Router>
    )
}

export default Main;