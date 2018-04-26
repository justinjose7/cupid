/**
 * Created by guofei on 2018/2/9.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import '../css/navlink.css'
@withRouter
@connect(
    state => state.chat
)


class NavLinkBar extends React.Component{
    static propTypes = {
        data: PropTypes.array.isRequired
    }

    render() {

        const navList = this.props.data.filter(v=>!v.hide)
        const {pathname} = this.props.location
        console.log(this.props.unread)
        return (
            <ul className="nav-ul">
                {navList.map(v=>(
                    <li
                        className="nav-li"
                        onClick={()=>{
                            this.props.history.push(v.path)
                        }}
                    >{v.text}</li>
                ))}
            </ul>
        )
    }

}

export default NavLinkBar