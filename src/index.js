
import React from 'react'
import ReactDom from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {
    BrowserRouter,
    Route,
    Link,
    Redirect,
    Switch
} from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './config'
import reducers from './reducer'
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'
import Profile from './container/profile/profile'
import Dashboard from './component/dashboard/dashboard'
import Navbar from './component/navbar/navbar'
import Chat from './component/chat/chat'
import SurveyCards from './container/survey/surveyCards'
import { slide as Menu } from 'react-burger-menu'
import './index.css'

const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
))

ReactDom.render(
    /*Login AUTH*/
    (<Provider store={store}>
        <BrowserRouter>
            <div>
              <Navbar> </Navbar>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path='/survey' component={SurveyCards}></Route>
                    <Route path='/profile' component={Profile}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path="/register" component={Register}></Route>
                    <Route path="/chat/:user" component={Chat}></Route>
                    <Route component={Dashboard}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)
