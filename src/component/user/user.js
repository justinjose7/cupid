import React from 'react'
import {connect} from 'react-redux'
import {List, Modal} from 'antd-mobile'
import browserCookies from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
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
        alert('Sign out', 'Are you sure?', [
            { text: 'Cancel', onPress: () => console.log('cancel') },
            { text: 'Log out', onPress: () => {
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
                    <div className="card-top">
                        <div className="img-card"><img className="img" src={props.avatar} /></div>
                        <div className="name-header-card" ><b>{props.name}</b></div>
                        <div className="text-card"><i>"{props.desc}"</i></div>
                        <br/>
                        <button className="signout-Btn" onClick={this.logout}>Sign out</button>

                    </div>
                </div>
        ):<Redirect to={props.redirectTo}/>
    }


}

export default User
