import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Card, WhiteSpace,WingBlank} from 'antd-mobile'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'

@connect(
	state=>state.chatuser,
	{getUserList}
)
class Student extends React.Component{
	componentDidMount() {
		this.props.getUserList('professor')
	}
	render(){
		return <UserCard userlist={this.props.userlist}></UserCard>
  }
}
export default Student
