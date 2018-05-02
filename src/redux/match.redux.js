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
        return action.payload
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
      console.log("what pops homie")
        // axios.post('/user/matchUser',{ user: user })
        axios.post('/user/getMatches',{ user: user })
            .then(res => {
              if(res.status == 200){
                console.log(res.data);
                console.log("fuck haha");
                // dispatch(returnMatchArray([{ avatar: 'https://cooper.edu/sites/default/files/fontaine1.jpg', name: 'Fred'},{ avatar: 'http://cooper.edu/sites/default/files/keene1.jpg', name: 'Keene'},{ avatar: 'https://res.cloudinary.com/dbormtzbg/image/upload/v1524193299/dskvjqgqigv8smdthp1g.jpg', name: 'Carl'},{ avatar: 'https://engfac.cooper.edu/photos/bailyn.jpg', name: 'Bailyn'},{ avatar: 'https://cooper.edu/sites/default/files/fontaine1.jpg', name: 'Fred'},{ avatar: 'http://cooper.edu/sites/default/files/keene1.jpg', name: 'Keene'},{ avatar: 'https://res.cloudinary.com/dbormtzbg/image/upload/v1524193299/dskvjqgqigv8smdthp1g.jpg', name: 'Carl'},{ avatar: 'https://engfac.cooper.edu/photos/bailyn.jpg', name: 'Bailyn'}]))
                dispatch(returnMatchArray(res.data.matches))
              }
            })
    }
}
