import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/user.redux'
import { Toast } from 'antd-mobile'
import {logoutSubmit} from '../../redux/user.redux'
import Dropzone from 'react-dropzone';
import browserCookies from 'browser-cookies'
import request from 'superagent';
import '../../css/profile-setup.css'

@connect(
  state=>state.user,
	{update, logoutSubmit}
)
class Navbar extends React.Component{
    constructor(props) {
      super(props)
    }

    render(){
      console.log(this)
      return this.props.user?(
          <div id="nav-bar">
              <a className="nav-item" id ="cupid-logo" href="/nearby">Cupid</a>
              <ul id="nav-links">
                <a href="/nearby"><li className="nav-item"> People Nearby </li></a>
                <a href="/matches"><li className="nav-item"> Matches </li></a>
                <a href="/myprofile"><li className="nav-item"> My Profile </li></a>
                <div id="hamburger-menu"></div>
              </ul>
          </div>
        ):(
          <div id="nav-bar">
              <a className="nav-item" id ="cupid-logo" href="/nearby">Cupid</a>
              <ul id="nav-links">
                <a href="#one"><li className="nav-item"> Meet </li></a>
                <a href="#two"><li className="nav-item"> Match </li></a>
                <a href="#three"><li className="nav-item"> Message </li></a>
              </ul>
          </div>
        )
    }
}

export default Navbar
