import React, { Component } from 'react'
import { BrowserRouter as Router,
          Route,
          Redirect,
          Link,
          withRouter
 } from 'react-router-dom'
import './css/App.css';

import LoginSignupComponent from './LoginSignupComponent';
import CardStackComponent from './CardStackComponent'
import SurveyCardsComponent from './SurveyCardsComponent'
import ProfileSetupComponent   from './ProfileSetupComponent'


class App extends Component {
  state = {
    response: ''
  };
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }
  callApi = async () => {
    const response = await fetch('/api/user/justinjose');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log(body);
    return body;
  };

  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={LoginSignupComponent} />
          <Route exact path='/profile' component={ProfileSetupComponent} />
          <Route path='/matches' component={CardStackComponent} />
          <Route path='/survey' component={SurveyCardsComponent} />
        </div>
      </Router>
    );
  }
}

export default App;
