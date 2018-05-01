import { connect } from 'react-redux'
import { match, getMatchArray } from '../../redux/match.redux'
import MatchArrayPresenter from './match-array-presenter'

const getVisibleMatches = (match) => {
  return match
}

const mapStateToProps = state => {
  return {
    match: state.match
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      // dispatch(toggleTodo(id))
    }
  }
}

const MatchArrayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchArrayPresenter)

export default MatchArrayContainer
