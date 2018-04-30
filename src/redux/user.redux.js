import axios from 'axios'
import {getRedirectPath} from '../util'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOGOUT = 'LOGOUT'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const DATA_RETURN = 'DATA_RETURN'

const initState = {
    //isAuth:'',
    msg:'',
    user:'',
    pwd:'',
    type:''
}

//reducer
export function user(state=initState,action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...state, msg:'', redirectTo:getRedirectPath(action.payload),...action.payload,}
        case LOAD_DATA:
            return {...state,...action.payload}
        case ERROR_MSG:
            return {...state,isAuth:false,msg:action.msg}
        case LOGOUT:
            return {...initState, redirectTo:'/login'}
        case DATA_RETURN:
            return {...state, payload: action.payload}
        default:
            return state
    }

}

function authSuccess(obj) {
    const {pwd,...data} = obj
    return {type:AUTH_SUCCESS, payload:data}
}

function errorMsg(msg) {
    return {msg, type:ERROR_MSG}
}

export function loadData(userinfo) {
    return {type:LOAD_DATA,payload:userinfo}
}

export function logoutSubmit() {
    return {type:LOGOUT}
}

export function returnMatchData(payload) {
    return {type:DATA_RETURN, payload}
}

export function update(data) {
    return dispatch => {
        axios.post('/user/update',data)
            .then(res=> {
                if(res.status == 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                }else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

export function login({user,pwd}) {
    if(!user || !pwd) {
        return errorMsg('Missing fields')
    }
    return dispatch=>{
        axios.post('/user/login',{user,pwd})
            .then(res => {
                if(res.status == 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                    console.log('hello' + res.data.data)
                }else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

export function register({email, user, name, pwd, type}) {
    if(!user || !pwd || !email || !name || !type) {
        return errorMsg('Form Incomplete')
    }

    return dispatch => {
        axios.post('/user/register',{email,user,name,pwd,type})
            .then(res => {
                console.log(res)
                if(res.status == 200 && res.data.code === 0) {
                    dispatch(authSuccess({user,pwd,type}))
                }else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

export function getMatches({user}) {
    if(!user) {
        return errorMsg('Missing fields')
    }
    return dispatch=>{
        axios.post('/user/matchUser',{ user: user })
            .then(res => {
              if(res.status == 200){
                console.log(res.data);
                dispatch(returnMatchData(res.data))
              }
            })
    }
}
