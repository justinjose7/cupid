import React from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import NavLinkBar from '../navlink/navlink'
import {Switch,Route} from 'react-router-dom'
import Student from '../../component/student/student'
import User from '../../component/user/user'
import {getMsgList,recvMsg} from '../../redux/chat.redux'
function Msg() {
    return <h2>Matches</h2>
}

@connect(
    state=>state,
    {getMsgList,recvMsg}
)


class Dashboard extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
         this.props.getMsgList()
         this.props.recvMsg()

     }

    render() {
        const user = this.props.user
        const {pathname} = this.props.location
        console.log(JSON.stringify(this.props))
        const navList = [
            {
                path:'/home',
                text:'People Nearby',
                icon:'job',
                title:'People Nearby',
                component:Student,
                hide:user.type=='professor'
            },
            {
                path:'/matches',
                text:'Matches',
                icon:'msg',
                title:'Matches',
                component:Msg
            },
            {
                path:'/myprofile',
                text:'My Profile',
                icon:'user',
                title:'Personal Center',
                component:User
            }
        ]

        return (
            <div>
                <Switch>
                    {navList.map(v=>(
                        <Route key={v.path} path={v.path} component={v.component}></Route>
                    ))}
                </Switch>
                <NavLinkBar data={navList}></NavLinkBar>

            </div>

        )
    }
}

export default Dashboard
