import {combineReducers} from 'redux'
import { user } from './redux/user.redux'
import { chatuser } from './redux/chatuser.redux'
import { chat } from './redux/chat.redux'
import { match } from './redux/match.redux'
export default combineReducers({user,chatuser,chat,match})
