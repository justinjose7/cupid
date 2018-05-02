import React from 'react'
import PropTypes from 'prop-types'
import MatchArrayItem from './match-array-item'

const MatchArrayPresenter = ({ match }) => (
  <ul id='matchArray' >
    {match.map((match, index) => (
      <MatchArrayItem key={index} {...match} />
    ))}
  </ul>
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
