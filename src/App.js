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


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={LoginSignupComponent} />
          <Route path='/matches' component={CardStackComponent} />
          <Route path='/survey' component={SurveyCardsComponent} />
        </div>
      </Router>
    );
  }
}

export default App;
