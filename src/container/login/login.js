import React from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/user.redux'
import '../../css/login.css'


@connect(
	state=>state.user,
	{login}
)
class Login extends React.Component{
	render(){
		return (
			<div>
				{this.props.redirectTo? <Redirect to={this.props.redirectTo} />:null}
				<section className="box-login-form card">
			        <h2 className="header-title">Cupid</h2>
			        <p className= "header-login">Sign in to your account</p>
				        <div className="form-login">
					        <input
					            type="text"
					            className="inputbox"
					            placeholder="Email or username"
											ref={input => this.username = input}
					        />
					        <input
					            type="password"
					            className="inputbox"
					            placeholder="Password"
											ref={input => this.password = input}
					        />
					        <button
					          	className="loginBtn button"
					            onClick={ () => this.props.login({user:this.username.value, pwd:this.password.value}) } type='primary'>Log in</button>

					        <p className="header-login">Don't have an account?</p>
					        <button
					            className="signupBtn"
					            id="signup-button"
					            onClick={ () => this.props.history.push('/register') } style={{'font-family':'Proxima Nova'}}>Sign up
									</button>
			        </div>
			        {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
			    </section>
			</div>
		)
	}
}

export default Login
