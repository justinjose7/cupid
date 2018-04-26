import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '../../redux/user.redux'
import '../../css/register.css'
@connect(
	state=>state.user,
	{register}
)
class Register extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			email:'',
			user:'',
			name:'',
			pwd:'',
			type:'human'
		}
		this.handleRegister = this.handleRegister.bind(this)
		this.login = this.login.bind(this)

	}
	handleChange(key,val){
		this.setState({
			[key]:val
		})
	}
	handleRegister(){
		this.props.register(this.state)
	}
	login(){
		this.props.history.push('/login') //cookiesave
	}
	render(){
		return (
			<div>
				{this.props.redirectTo? <Redirect to={this.props.redirectTo} />:null}
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
								onChange={e => this.handleChange('email', e.target.value)}
							/>
							<br/>
							<input
								type="text"
								name="fullname"
								className="signup"
								placeholder="Full name"
								onChange={e => this.handleChange('name', e.target.value)}

							/>
							<br/>
							<input
								type="text"
								name="new_username"
								className="signup"
								placeholder="Username"
								onChange={e => this.handleChange('user', e.target.value)}

							/>


							<input
								type="password"
								name="new_password"
								className="signup"
								placeholder="Password"
								onChange={e => this.handleChange('pwd', e.target.value)}

							/>
							<br/>
							<br/>

							<button
								className="signup-Btn"
								onClick={ this.handleRegister }
							>Sign up</button>

							<br/>
							<br/>
							<p className="header-signup">Already have an account?</p>
							<button
								className="login-Btn"
								onClick={this.login}
							>Log in</button>

						</div>
					</div>
					{this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}

				</section>

			</div>

		)
	}
}

export default Register
