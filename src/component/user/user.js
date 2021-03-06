import React from 'react'
import {connect} from 'react-redux'
import {Switch,Route,Link,Redirect} from 'react-router-dom'
import {List, Modal} from 'antd-mobile'
import browserCookies from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import '../../css/my-profile.css'
@connect(
    state=>state.user,
    {logoutSubmit}
)

class User extends React.Component{

    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }

    logout() {

        const alert = Modal.alert
        alert('See you later!', 'Are you sure you want to sign out?', [
            { text: 'Cancel', onPress: () => console.log('cancel') },
            { text: 'Sign out', onPress: () => {
                browserCookies.erase('userid')
                this.props.logoutSubmit()
            }},
        ])



    }

    render() {
        const props = this.props
        console.log(props)
        return props.user?(
                <div className="stack-container">
                    <div className="card-top card" style={ {'height':'auto'}}>
                        <div className="img-card"><img className="img" src={props.avatar} /></div>
                        <div className="name-header-card" ><b>{props.name}</b></div>
                        <div className="text-card"><i>"{props.desc}"</i></div>
                        <br/>
                        <Link to="/profile"><button className="signout-Btn button" href="/profile">Edit Profile</button></Link>
                        <br/>
                        <br/>
                        <button className="signout-Btn button" onClick={this.logout}>Sign out</button>

                    </div>
                </div>
        ):<Redirect to={props.redirectTo}/>
    }


}

export default User
