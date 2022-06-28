import './App.css';
import PostForm from './components/PostForm';
import Food from './views/Food'
import Housing from './views/Housing'
import Other from './views/Other'
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import Signupform from './views/Signupform'
import LoginForm from './views/LoginForm'
import Dashboard from './views/Dashboard'
import AddFollower from './components/AddFollower'
import React from 'react'
import trust from "./styles/icons8-trust-50.png"
import menu from "./styles/icons8-menu-80.png"
import PostDisplay from './components/PostDisplay';

function App() {

    return (
        <div className='App'>
            <div class="nav-bar">
                <div class="nav-center">
                    <h1 class="logo">ResourceUkraine</h1>
                    <img src={trust} alt="hand with heart" />
                </div>
                <div class="dropdown">
                    <div class="dropbtn">
                        <img src={menu} alt="hamburger menu" />
                    </div>
                    <div class="dropdown-content">
                        <Link to={"/food"}>Food Suppliers</Link>
                        <Link to={"/housing"}>Housing</Link>
                        <Link to={"/other"}>Other</Link>
                        {/* Link to Post (Pass id of user in session) */}
                        <div>
                            <Link to={"/PostForm"}>Provide a Resource</Link>
                            {/* <Link to={`/users/messageboard/${_id}`}>MessageBoard</Link> */}
                        </div>
                        <div class="login-reg">
                            <Link to={"/loginForm"}>Login</Link>
                            <Link to={"/signinform"}>Register</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Switch>

                <Route exact path="/">
                    <Redirect to="/dashboard" />
                </Route>

                <Route exact path="/signinform">
                    <Signupform />
                </Route>

                <Route exact path="/loginform">
                    <LoginForm />
                </Route>

                <Route exact path="/dashboard">
                    <Dashboard />
                </Route>

                <Route exact path="/PostForm">
                    <PostForm />
                </Route>

                <Route exact path="/food">
                    <PostDisplay />
                </Route>

                <Route exact path="/housing">
                    <Housing />
                </Route>

                <Route exact path="/other">
                    <Other />
                </Route>

                <Route exact path="/addFollower/:_id">
                    <AddFollower />
                </Route>

                <Route path="*" >
                    <h1>There's nothing here: 404!</h1>
                    <Link to={"/dashboard"}><button>Dashboard</button></Link>
                </Route>
            </Switch>
        </div>
    );
}

export default App;


