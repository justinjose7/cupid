import axios from 'axios'
import {getRedirectPath} from '../util'
export const MATCH_ACCEPT = 'MATCH_ACCEPT'
export const MATCH_DECLINE = 'MATCH_DECLINE'
export const UPDATE_MATCH_ARRAY = 'UPDATE_MATCH_ARRAY'
export const ERROR_MSG = 'ERROR_MSG'

//reducer
export function match(state = [], action){
  switch (action.type){
    case UPDATE_MATCH_ARRAY:
        console.log('getting to this point')
        return state.concat(action.payload)
    default:
      return state
  }
}

function errorMsg(msg) {
    return {msg, type:ERROR_MSG}
}

export function returnMatchArray(payload) {
  return {type:UPDATE_MATCH_ARRAY, payload}
}

export function getMatchArray({user}) {
    if(!user) {
        return errorMsg('Missing fields')
    }
    return dispatch=>{
        // axios.post('/user/matchUser',{ user: user })
        axios.post('/user/getMatches',{ user: user })
            .then(res => {
              if(res.status == 200){
                console.log(res.data);
                //dispatch(returnMatchArray([{ avatar: 1, user: 'Fred'},{ avatar: 1, user: 'Fontaine'},{ avatar: 1, user: 'The'},{ avatar: 1, user: 'MotherFuckng'}]))
                dispatch(returnMatchArray(res.data))
              }
            })
    }
}
