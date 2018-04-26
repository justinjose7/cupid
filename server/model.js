const mongoose = require('mongoose')
const DB_URL = 'mongodb://cooper:58OfWT!@ds239439.mlab.com:39439/cupid'
mongoose.connect(DB_URL)

const models = {
    user:{
        'email':{'type':String,'require':true},
        'user':{'type':String,'require':true},
        'pwd':{'type':String,'require':true},
        'name':{'type':String,'require':true},
        'type':{'type':String,'require':true},
        'maxdist':{'type':Number},
        'latLng':{
            'lat': {'type': Number},
            'lng': {'type': Number}
        },
        'interests':{
            'sports': {'type': Boolean},
            'politics': {'type': Boolean},
            'food': {'type': Boolean},
            'popmusic': {'type': Boolean},
            'rap': {'type': Boolean},
            'religion': {'type': Boolean},
        },
        'surveyComplete':{'type':Boolean},
        'avatar':{'type':String},
        'desc':{'type':String},
    },
    chat:{
        'chatid':{'type':String,'require':true},
        'from':{'type':String,require:true},
        'to':{'type':String,require:true},
        'read':{'type':String,'default':false},
        'content':{'type':String,'require':true,'default':''},
        'create_time':{'type':Number,'default':new Date().getTime()}
    }
}

for(let m in models) {
    mongoose.model(m,new mongoose.Schema(models[m]))
}

module.exports = {
    getModel:function(name) {
        return mongoose.model(name)
    }
}
