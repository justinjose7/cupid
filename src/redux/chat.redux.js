import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')

const MSG_LIST = 'MSG_LIST'

const MSG_RECV = 'MSG_RECV'

const MSG_READ = 'MSG_READ'

const initState = {
    chatmsg:[],
    users:{},
    unread:0
}

export function chat(state=initState,action) {
    console.log('aaa',action.type)
    switch (action.type){

        case MSG_LIST:
            return {...state, users:action.payload.users,chatmsg:action.payload.msgs,unread:action.payload.msgs.filter(v=>!v.read).length}

        case MSG_RECV:
            return {...state,chatmsg: [...state.chatmsg,action.payload],unread:state.unread+1}
        //case MSG_READ:
        default:
            return state
    }
}
function msgList(msgs,users) {
    console.log('ggg')
    return {type:MSG_LIST,payload:{msgs,users}}
}

function msgRecv(msg) {
    return {type:MSG_RECV,payload:msg}
}

export function recvMsg() {
    return dispatch=> {
        socket.on('recvmsg', function (data) {
            console.log('recvmsg',data)
            dispatch(msgRecv(data))
        })
    }

}

export function sendMsg({from,to,msg}) {
    return dispatch => {
        socket.emit('sendmsg',{from,to,msg})
    }
}

export function getMsgList() {
    return dispatch => {
        axios.get('/user/getmsglist')
            .then(res=>{
                if(res.status == 200 && res.data.code==0) {
                    dispatch(msgList(res.data.msgs,res.data.users))

                }
            })
    }
}