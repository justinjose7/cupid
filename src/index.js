import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LoginSignupComponent from './LoginSignupComponent';
import CardStackComponent from './CardStackComponent';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<LoginSignupComponent />, document.getElementById('root'));
registerServiceWorker();
