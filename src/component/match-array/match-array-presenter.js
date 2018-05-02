import React from 'react'
import PropTypes from 'prop-types'
import MatchArrayItem from './match-array-item'
import UserCard from '../usercard/usercard'
const USER_CLICKED = 'USER_CLICKED'

const MatchArrayPresenter = ({ match, onMatchClick }) => (
  <div>
    <ul id='matchArray' >
      {match.map((match, index) => (
        <MatchArrayItem onClick={() => onMatchClick(index)} key={index} {...match} />
      ))}
    </ul>
    <UserCard> </UserCard>
  </div>
)

MatchArrayPresenter.propTypes = {
  match: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
}

export default MatchArrayPresenter;
