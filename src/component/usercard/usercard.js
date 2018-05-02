import React from 'react'
import {connect} from 'react-redux'
import {Switch,Route,Link,Redirect} from 'react-router-dom'
import {List, Modal} from 'antd-mobile'
import browserCookies from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import '../../css/my-profile.css'
@connect(
    state=>state,
)

class UserCard extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
          pleaseUpdate: true,
        }
    }

    render() {
        const props = this.props
        const stateStuff = this.state
        console.log(props)

        var viewedUserIndex = props.match.viewedUser

        console.log(props.match)
        if (props.match.matches[viewedUserIndex] == null){
          return null;
        }
        return props.match.userClicked?(
                <div className="stack-container">
                    <div className="card-top card" style={ {'height':'auto'}}>
                        <div className="img-card"><img className="img" src={props.match.matches[viewedUserIndex].avatar} /></div>
                        <div className="name-header-card" ><b>{props.match.matches[viewedUserIndex].name}</b></div>
                        <div className="text-card"><i>{props.match.matches[viewedUserIndex].desc}</i></div>
                    </div>
                </div>
        ):null
    }
}

export default UserCard
