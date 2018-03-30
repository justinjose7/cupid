import React from 'react';
import './SignupComponent.css'

const SignupComponent = ({
    handleShowLogin,
    handleSignup,
    email,
    fullname,
    username,
    password,
}) => (
    <section className="box-signup-form">
        <h1 className= "header-title">Cupid</h1>
        <p className= "header-signup">Sign up</p>
        <br/>
        <div tabIndex="0" role="document">
        <form className="form-signup">
        <input
            type="text" 
            className="signup" 
            placeholder="Email address"
            value={email}
        />
        <br/>
        <input
            type="text" 
            className="signup" 
            placeholder="Full name"
            value={fullname}
        />
        <br/>
        <input
            type="text" 
            className="signup" 
            placeholder="Username"
            value={username}
        />
   

        <input
            type="password" 
            className="signup" 
            placeholder="Password"
            value={password}
        />
        <br/>
       <br/>

        <button
            className="signup-Btn"
            onClick={() => { handleSignup('showSurveyPage', true); }}
        >Sign up</button>

        <br/>
        <br/>
        <p className="header-signup">Already have an account?</p>
        <button
            className="login-Btn"
            onClick={() => { handleShowLogin('showSignup', false);}}
        >Log in</button>

        </form>
        </div>
    </section>
);

export default SignupComponent;
