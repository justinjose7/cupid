import React from 'react'
import ReactDom from 'react-dom'
import '../../css/match-cards.css'
import PropTypes from 'prop-types'
import {match, displayUser } from '../../redux/match.redux'
const USER_CLICKED = 'USER_CLICKED'
// export function displayUser(user) {
//   console.log(user)
//   ReactDom.render(<div>{user}</div>)
// }


const MatchArrayItem = ({avatar, user, name , onClick}) => (
  <li className='matchesArrayIcons'
    onClick={onClick}
  >
    <div>
      <img className="user-icon" src={avatar} />
    </div>
    <span style={{'font-weight': '600', 'font-size' : '15px'}}>{name}</span>
  </li>
)

MatchArrayItem.propTypes = {
  //onClick: PropTypes.func.isRequired,
  avatar: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired
}

export default MatchArrayItem;
