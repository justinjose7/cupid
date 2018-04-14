import React from 'react';
import './css/SignupComponent.css'
import HandleSignupClick from './HandleSignupClick';


const SignupComponent = ({
    handleShowLogin,
    handleSignup,
    handleChange,
    email,
    fullname,
    new_username,
    new_password,
}) => (
    <section className="box-signup-form">
        <h1 className= "header-title">Cupid</h1>
        <p className= "header-signup">Sign up</p>
        <br/>
        <div tabIndex="0" role="document">
        <div className="form-signup">
        <input
            type="text" 
            name="email"
            className="signup" 
            placeholder="Email address"
            value={email}
            onChange={e => handleChange(e.target.name, e.target.value)}
        />
        <br/>
        <input
            type="text" 
            name="fullname"
            className="signup" 
            placeholder="Full name"
            value={fullname}
            onChange={e => handleChange(e.target.name, e.target.value)}

        />
        <br/>
        <input
            type="text" 
            name="new_username"
            className="signup" 
            placeholder="Username"
            value={new_username}
            onChange={e => handleChange(e.target.name, e.target.value)}

        />
   

        <input
            type="password" 
            name="new_password"
            className="signup" 
            placeholder="Password"
            value={new_password}
            onChange={e => handleChange(e.target.name, e.target.value)}

        />
        <br/>
       <br/>

        <button
            className="signup-Btn"
            onClick={() => { HandleSignupClick(email, fullname, new_username, new_password)}}
        >Sign up</button>

        <br/>
        <br/>
        <p className="header-signup">Already have an account?</p>
        <button
            className="login-Btn"
            onClick={() => { handleShowLogin('showSignup', false);}}
        >Log in</button>

        </div>
        </div>
    </section>
);

export default SignupComponent;
