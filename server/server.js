/**
 * scott Zhekai Jin
 */
const express = require('express')
const bodyParser = require('body-parser')  
const cookieParser = require('cookie-parser')

const app = express()
const model = require('./model')
const Chat = model.getModel('chat')

//socket.io
const server = require('http').Server(app)
const io = require('socket.io')(server)
/*
Chat.remove({}, function (err,doc) {
})
*/
io.on('connection', function (socket) {
	console.log('user login')
	socket.on('sendmsg', function (data) {
		console.log(data)
		//io.emit('recvmsg',data)
		const {from,to,msg} = data
		const chatid = [from,to].sort().join(' ')
		Chat.create({chatid,from,to,content:msg}, function (err,doc) {
			io.emit('recvmsg',Object.assign({}, doc._doc))
			console.log(doc)
		})


	})
})

const userRouter = require('./user')
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)
server.listen(9093, function () {
	console.log('Node app start at port 9093')
})

