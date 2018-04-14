import React from 'react';
import './css/LoginComponent.css';
import CardStackComponent from './CardStackComponent';
import { Link } from 'react-router-dom';
import HandleLoginClick from './HandleLoginClick';

const LoginComponent = ({
    handleShowSignup,
    handleLogin,
    handleChange,
    username,
    password,
}) => (
    <section className="box-login-form">
        <h2 className="header-title">Cupid</h2>
        <p className= "header-login">Sign in to your account</p>
        <br/>
        <div tabIndex="0" className="form-login" role="document">
        <div className="form-login">
        <input
            type="text"
            name="username"
            className="login" 
            placeholder="Email or username"
            onChange={e => handleChange(e.target.name, e.target.value)}
            value={username}
        />
        <br/>
        <input
            type="password" 
            name="password"
            className="login" 
            placeholder="Password"
            onChange={e => handleChange(e.target.name, e.target.value)}
            value={password}
        />
        <br/>
       <br/>
        <button
            className="loginBtn"
            onClick={() => {HandleLoginClick(username, password)}}
        >Log in</button>
        <br/>
        <p>Don't have an account?</p>
        <button
            className="signupBtn"
            id="signup-button"
            onClick={() => { handleShowSignup('showSignup', true);}}
        >Sign up</button>

        </div>
        </div>
    </section>
);

export default LoginComponent;
