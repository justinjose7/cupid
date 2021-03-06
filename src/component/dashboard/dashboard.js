import React from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import NavLinkBar from '../navlink/navlink'
import {Switch,Route,Link,Redirect} from 'react-router-dom'
import Student from '../../component/student/student'
import User from '../../component/user/user'
import MatchCards from '../match-cards/match-cards'
import MatchArray from '../match-array/match-array'
import Profile from '../../container/profile/profile'
import {getMsgList,recvMsg} from '../../redux/chat.redux'
import { slide as Menu } from 'react-burger-menu'
import {logoutSubmit} from '../../redux/user.redux'
import match from '../../redux/match.redux'
import browserCookies from 'browser-cookies'
import '../../css/dashboard.css'
function Msg() {
    return <h2>Matches</h2>
}

@connect(
    state=>state,
    {getMsgList,recvMsg,logoutSubmit}
)


class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
         this.props.getMsgList()
         this.props.recvMsg()

     }

     logout() {
       browserCookies.erase('userid');
       this.props.logoutSubmit();
       this.props.history.push('/login');
     }

    render() {
        const props = this.props
        const user = this.props.user
        const {pathname} = this.props.location
        //console.log(JSON.stringify(this.props))
        console.log(this.props)
        const navList = [
            {
                path:'/nearby',
                text:'People Nearby',
                icon:'job',
                title:'People Nearby',
                component:MatchCards,
            },
            {
                path:'/',
                text:'People Nearby',
                icon:'job',
                title:'People Nearby',
                component:MatchCards,
            },
            {
                path:'/profile',
                text:'Update Profile',
                icon:'job',
                title:'Update Profile',
                component:Profile,
            },
            {
                path:'/matches',
                text:'Matches',
                icon:'msg',
                title:'Matches',
                component:MatchArray
            },
            {
                path:'/myprofile',
                text:'My Profile',
                icon:'user',
                title:'Personal Center',
                component:User
            }
        ]

        return props.user?(
            <div>
                <Menu left noOverlay id="menu-dashboard">
                  <Link to="/nearby" className="menu-item" >People Nearby</Link>
                  <Link to="/matches" id="matches" className="menu-item" >Matches</Link>
                  <Link to="/myprofile" id="profile" className="menu-item" href="/myprofile">My Profile</Link>
                </Menu>
                <Switch>
                    {navList.map(v=>(
                        <Route key={v.path} exact path={v.path} component={v.component}></Route>
                    ))}
                </Switch>

            </div>

        ):<Redirect to={'/login'}/>
    }
}

export default Dashboard
