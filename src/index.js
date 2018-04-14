import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import LoginSignupComponent from './LoginSignupComponent';
import CardStackComponent from './CardStackComponent';
import registerServiceWorker from './registerServiceWorker';
import App from './App'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
