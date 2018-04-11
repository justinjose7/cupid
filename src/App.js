import React, { Component } from 'react'
import { BrowserRouter as Router,
          Route,
          Redirect,
          Link,
          withRouter
 } from 'react-router-dom'
import './App.css';

import LoginSignupComponent from './LoginSignupComponent';
import CardStackComponent from './CardStackComponent'
import SurveyCardsComponent from './SurveyCardsComponent'


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path='/login' component={LoginSignupComponent} />
          <PrivateRoute path='/matches' component={CardStackComponent} />
          <PrivateRoute path='/survey' component={SurveyCardsComponent} />
        </div>
      </Router>
    );
  }
}
//put this into route.js and export it plz
const fakeAuth = {
  isAuthenticated : false ,
  authenticate (cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  } ,
  signout (cb) {
    this.isAuthenticated = false
    setTimeout(cb , 100)
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)
class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }
  login = () => {
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
  }
  render() {
    const { redirectToReferrer } = this.state
    if (redirectToReferrer === true) {
      <Redirect to='/matches' />
    }
    return (
      <div>
        <p>You must log in to view the page</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}

const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => {
        fakeAuth.signout(() => history.push('/matches'))
      }}>Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
))
//

export default App;
