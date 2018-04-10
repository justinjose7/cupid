import React from 'react';
import './LoginComponent.css';
import CardStackComponent from './CardStackComponent';

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
        <form className="form-login">
        <input
            type="text" 
            className="login" 
            placeholder="Email or username"
            onChange={e => handleChange(e.target.name, e.target.value)}
        />
        <br/>
        <input
            type="password" 
            className="login" 
            placeholder="Password"
            onChange={e => handleChange(e.target.name, e.target.value)}
        />
        <br/>
       <br/>
        <button
            className="loginBtn"
            onClick={() => {handleLogin('showMainPage', true)}}
        >Log in</button>

        <br/>
        <p>Don't have an account?</p>
        <button
            className="signupBtn"
            id="signup-button"
            onClick={() => { handleShowSignup('showSignup', true);}}
        >Sign up</button>

        </form>
        </div>
    </section>
);

export default LoginComponent;
