const express = require('express')
const utils = require('utility')  //md5
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const _filter = {'pwd':0,'__v':0}

Router.get('/list', function (req,res) {
    const { type } = req.query
    User.find({type},function(err,doc){
        return res.json({code:0,data:doc})
    })
})

Router.get('/getmsglist', function (req,res) {
    const user = req.cookies.user
    User.find({}, function (e,userDoc) {
        let users = {}
        console.log(userDoc)
        userDoc.forEach(v => {
            users[v._id] = {name: v.user,avatar: v.avatar}
        })
        Chat.find({'$or':[{from:user},{to:user}]}, function (err,doc) {
            if (!err) {
                console.log(doc)
                return res.json({code:0,msgs:doc,users:users})
            }
        })
    })
})


Router.post('/update',function(req,res){
    const userid = req.cookies.userid
    if (!userid) {
        return json.dumps({code:1})
    }
    const body = req.body
    User.findByIdAndUpdate(userid,body,function(err,doc){
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type
        },body)
        return res.json({code:0,data})
    })
})

Router.post('/login',function(req,res){
    const {user,pwd} = req.body
    User.findOne({user,pwd:md5Pwd(pwd)},_filter,function(err,doc){
        if(!doc) {
            return res.json({code:1,msg:'Check if username and password are correct'})
        }
        res.cookie('userid',doc._id)
        return res.json({code:0,data:doc})
    })
})

Router.post('/register',function(req,res){
    const {email, user, name, pwd, type} = req.body
    User.findOne({user},function(err,doc){

        if(doc) {
            return res.json({code:1,msg:'Username already exists',doc:doc})
        }
        const userModel = new User({email, user, name, type, pwd:md5Pwd(pwd)})
        userModel.save(function(e,d){
            if(e) {
                return res.json({code:1,msg:'Server Error',e:e})
            }
            const {user,type,_id} = d
            res.cookie('userid',_id)
            return res.json({code:0,data:{user,type,_id}})
        })
    })
})

Router.get('/info',function(req,res){
    const {userid} = req.cookies
    if (!userid) {
        return res.json({code:1})
    }
    User.findOne({_id:userid},_filter,function(err,doc){
        if(err) {
            return res.json({code:1,msg:'Server Error'})
        }
        if(doc) {
            return res.json({code:0,data:doc})
        }
    })
})

function md5Pwd(pwd) {
    const salt = 'scott is genuis !@#IUHJh~~'
    return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router
