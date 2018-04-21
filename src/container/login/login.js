import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/user.redux'
import '../../css/login.css'


@connect(
	state=>state.user,
	{login}
)
class Login extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			user:'',
			pwd:''
		}
		this.register = this.register.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
	}
	register(){
		this.props.history.push('/register') //cookiesave
	}
	handleChange(key,val){
		this.setState({
			[key]:val
		})
		console.log(key, val)
	}
	handleLogin(){
		this.props.login(this.state)
	}
	render(){
		return (
			<div>
				{this.props.redirectTo? <Redirect to={this.props.redirectTo} />:null}
				<section className="box-login-form">
			        <h2 className="header-title">Cupid</h2>
			        <p className= "header-login">Sign in to your account</p>
			        <br/>
			        <div tabIndex="0" className="form-login" role="document">
				        <div className="form-login">
					        <input
					            type="text"
					            name="user"
					            className="login" 
					            placeholder="Email or username"
					            onChange={e => this.handleChange(e.target.name, e.target.value)}
					        />
					        <br/>
					        <input
					            type="password" 
					            name="pwd"
					            className="login" 
					            placeholder="Password"
					            onChange={e => this.handleChange(e.target.name, e.target.value)}
					        />
					        <br/>
					       	<br/>
					        <button
					            className="loginBtn"
					            onClick={ this.handleLogin } type='primary'>Log in</button>
					        <br/>
					        <br/>

					        <p className="header-login">Don't have an account?</p>
					        <button
					            className="signupBtn"
					            id="signup-button"
					            onClick={ this.register }
					        >Sign up</button>

				        </div>
			        </div>
			        {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}

			    </section>

			</div>
		)
	}
}

export default Login
