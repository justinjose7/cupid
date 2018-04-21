
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
import ProfessorInfo from './container/professorinfo/professorinfo'
import StudentInfo from './container/studentinfo/studentinfo'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'
import './index.css'

const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
))

/*1.存在Switch 没有路由地址path的<Route component={Dashboard}></Route> 在不存在路由的url中存在 可做404页面
* 2.不存在Switch <Route component={Dashboard}></Route>可在每个存在url或不存在的url中显示 可做页面相同部分 如一样的头部
* */
    ReactDom.render(
    /*Login AUTH*/
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path='/studentinfo' component={StudentInfo}></Route>
                    <Route path='/professorinfo' component={ProfessorInfo}></Route>
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