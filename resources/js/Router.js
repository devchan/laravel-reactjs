import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import NotFound from "./views/NotFound/NotFound";

// User is LoggedIn
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./views/user/Dashboard/Dashboard";
import SearchUser from "./views/user/Dashboard/SearchUser";
import SearchTicket from "./views/user/Dashboard/SearchTicket";
import SearchOrganization from "./views/user/Dashboard/SearchOrganization";

const Main = () => (
    <Switch>
        {/*User might LogIn*/}
        <Route exact path="/" component={Home} />
        {/*User will LogIn*/}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        {/* User is LoggedIn*/}
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/searchUser" component={SearchUser} />
        <PrivateRoute path="/searchTicket" component={SearchTicket} />
        <PrivateRoute path="/searchOrganization" component={SearchOrganization} />

        {/*Page Not Found*/}
        <Route component={NotFound} />
    </Switch>
);
export default Main;
