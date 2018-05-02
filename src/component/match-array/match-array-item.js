import React from 'react'
import ReactDom from 'react-dom'
import '../../css/match-cards.css'
import PropTypes from 'prop-types'

// export function displayUser(user) {
//   console.log(user)
//   ReactDom.render(<div>{user}</div>)
// }

const displayUser = ({user}) => (
  <div> {user} </div>
)

const MatchArrayItem = ({avatar, user, name }) => (
  <li className='matchesArrayIcons'
    onClick={() =>
      displayUser(user)
    }
  >
    <div>
      <img className="user-icon" src={avatar} />
    </div>
    {name}
  </li>
)

MatchArrayItem.propTypes = {
  //onClick: PropTypes.func.isRequired,
  avatar: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired
}

export default MatchArrayItem;
