const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
var mongoose = require('mongoose');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/../public', 'index.html'));
});

app.listen(process.env.PORT || 8080);

//db config
var mongoDB = 'mongodb://cooper:58OfWT!@ds239439.mlab.com:39439/cupid';
mongoose.connect(mongoDB)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var user = {
    a: 'abc'
};

db.collection('aaa').insert(user);