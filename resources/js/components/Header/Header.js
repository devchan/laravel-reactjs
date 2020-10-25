import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
class Header extends Component {
    // 1.1
    constructor(props) {
        super(props);
        this.state = {
            user: props.userData,
            isLoggedIn: props.userIsLoggedIn
        };
        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        let appState = {
            isLoggedIn: false,
            user: {}
        };
        localStorage["appState"] = JSON.stringify(appState);
        this.setState(appState);
        this.props.history.push('/login');
        /*  axios.get('/api/auth/logout')
             .then(() => location.href = '/') */
    }

    render() {
        const aStyle = {
            cursor: 'pointer'
        };

        return (
            <nav className="navbar">
                <ul>
                    <li><Link to="/">Index</Link></li>
                    {this.state.isLoggedIn ?
                        <li className="has-sub"><Link to="/dashboard">Dashboard</Link></li> : ""}
                    {this.state.isLoggedIn ?
                        <li className="has-sub"><Link to="/searchUser">Search User</Link></li> : ""}
                    {this.state.isLoggedIn ?
                        <li className="has-sub"><Link to="/searchTicket">Search Ticket</Link></li> : ""}
                    {this.state.isLoggedIn ?
                        <li className="has-sub"><Link to="/searchOrganization">Search Organization</Link></li> : ""}
                    {!this.state.isLoggedIn ?
                        <li><Link to="/login">Login</Link> | <Link to="/register">Register</Link></li> : ""}
                    {this.state.isLoggedIn ?
                        <li><a href="#" onClick={this.logOut}>Logout</a></li> : ""}
                </ul>
            </nav>
        )
    }
}
export default withRouter(Header)
