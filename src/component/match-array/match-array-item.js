import React from 'react'
import PropTypes from 'prop-types'

const MatchArrayItem = ({avatar, user }) => (
  <li
    //onClick={onClick}
  >
    <div>
      <img className="img" src={avatar} />
    </div>
    {avatar}
    {user}
  </li>
)

MatchArrayItem.propTypes = {
  //onClick: PropTypes.func.isRequired,
  avatar: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired
}

export default MatchArrayItem;
