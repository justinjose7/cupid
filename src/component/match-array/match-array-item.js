import React from 'react'
import '../../css/match-cards.css'
import PropTypes from 'prop-types'

const MatchArrayItem = ({avatar, user }) => (
  <li
style={{listStyle: 'none', textAlign: 'center', font: 'Arial', width: '150px'}}
    //onClick={onClick}
  >
    <div>
      <img className="user-icon" src={avatar} />
    </div>
    {user}
  </li>
)

MatchArrayItem.propTypes = {
  //onClick: PropTypes.func.isRequired,
  avatar: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired
}

export default MatchArrayItem;
