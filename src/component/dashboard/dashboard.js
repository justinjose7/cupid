import React from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import NavLinkBar from '../navlink/navlink'
import {Switch,Route} from 'react-router-dom'
import Student from '../../component/student/student'
import User from '../../component/user/user'
import {getMsgList,recvMsg} from '../../redux/chat.redux'
function Msg() {
    return <h2>Messege List</h2>
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
                text:'Potential Students',
                icon:'job',
                title:'Professor List',
                component:Student,
                hide:user.type=='professor'
            },
            {
                path:'/msg',
                text:'Chats',
                icon:'msg',
                title:'Messages',
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
                <div style={{marginTop:45}}>
                    <Switch>
                        {navList.map(v=>(
                            <Route key={v.path} path={v.path} component={v.component}></Route>
                        ))}
                    </Switch>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>


            </div>
        )
    }
}

export default Dashboard
