import { connect } from 'react-redux'
import { match, getMatchArray, displayUser } from '../../redux/match.redux'
import MatchArrayPresenter from './match-array-presenter'
import UserCard from '../usercard/usercard'
const USER_CLICKED = 'USER_CLICKED'

const getVisibleMatches = (match) => {
  return match
}

const mapStateToProps = (state, action)=> {
  switch(action.type){
    case USER_CLICKED:
      console.log(state)
      return {
        ...state,
        userClicked: true,
        viewedUser: action.payload
      }
    default:
      return {
        match:state.match.matches
      }
  }
  // return {
  //   match: state.match
  // }
}

const mapDispatchToProps = dispatch => {
  return {
    onMatchClick: id => {
      dispatch(displayUser(id))
    }
  }
}

const MatchArrayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchArrayPresenter, UserCard)

export default MatchArrayContainer
