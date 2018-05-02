const express = require('express')
const utils = require('utility')  //md5
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const Matches = model.getModel('matches') // bring in the Matches model
const _filter = {'pwd':0,'__v':0}

const Promise = require("bluebird");

// include the user matching function
const { matchUser_toUsers } = require("../local_modules/match");
const _ = require("lodash");

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
        //console.log(userDoc)
        userDoc.forEach(v => {
            users[v._id] = {name: v.user,avatar: v.avatar}
        })
        Chat.find({'$or':[{from:user},{to:user}]}, function (err,doc) {
            if (!err) {
                //console.log(doc)
                return res.json({code:0,msgs:doc,users:users})
            }
        })
    })
})

Router.post('/getMatches', function(req, res) {
	// return an array of all confirmed matches
	// along with pertinent information
	const { user } = req.body;
	const userObjectQuery = { "user": user };

	// get all the users for a given user
	Matches.findOne(userObjectQuery).exec()
  .then(m => {
		if(!m) {
			// this user doesn't exist lmao wat r u doing
			return res.json({ "matches": [] });
		}

		// if we can find the user, let's look at their matches
		else {
			// this is an object that looks like
			// {
			//	"usernameMatch": Boolean
			// }
			const matches = _.reduce(_.get(_.get(m, "_doc"), "matches"), (acc, val, key) => {
				const like = (val) ? [ key ] : [];
				return _.concat([], acc, like);
			}, []);

			// take array of matches and look them up to see if they have me in their thing
			Promise.all(Promise.reduce(matches, (acc, match) => Matches.findOne({ "user": match }).exec()
        .then(otherUser => {
					const otherMatches = _.get(_.get(otherUser, "matches"), user);

					// they both match!
					if(otherMatches) {
						// look up the user data
						// then concat to the array ASAH DOOD
						return User.findOne({ "user": user }).exec()
						.then(userInfoObj => {
						return _.concat([], acc,
							User.findOne({ "user": match }).exec()
              .then(matchedUserData => {
							const commonInterests = _.reduce(_.get(matchUser_toUsers(userInfoObj, [ userInfoObj, matchedUserData ])[1], "commonInterests"), (acc, val, key) => {
								if(val) return _.concat([], acc, [ key ]);
								else return acc;
							}, []);
                return {
									 "user": match
									, "avatar": _.get(matchedUserData, "avatar")
									, "name": _.get(matchedUserData, "name")
									, "commonInterests": commonInterests
									, "desc": _.get(matchedUserData, "desc")
                }
							}));
					}

					// discrepancy; let's return what we have so far
					return acc;
				}), []))
			.then(results => { // give the matches to the frontend or whatever
        res.json({ "matches": results });
			});
		}
	});
});

Router.put('/confirmMatch', function(req, res) {
	const { user, match } = req.body;

	const userObjectQuery = { "user": user };

	Matches.findOne(userObjectQuery, function(err, m) {
		// the user doesn't exist in the match db yet
		// let's create them then

		if(!m) {
			// create the new match entry for the database
			const newMatchEntry = {
				  "user": user
				, "matches": {
					[_.get(match, "user")]: _.get(match, "resp")
				}
			};

			const matchModel = new Matches(newMatchEntry);

			// save the new match entry to the database
			matchModel.save(function(e,d){
			    if(e) {
				return res.json({code:1,msg:'Server Error',e:e})
			    }
			    const {user} = d;
			    res.json({code:0,data:{user}})
			});
		}

		// if the user does exist in the match db
		// let's update them with our match information
		else {
			// get the modified match
			const upUser = _.get(_.get(m, "_doc"), "user");
			const modMatch = _.assign({}, _.get(_.get(m, "_doc"), "matches"), {
				[_.get(match, "user")]: _.get(match, "resp")
			});

			// save the new match entry to the database
			Matches.update({ "user": upUser }, { $set: { "matches": modMatch } }, function(e,d){
			    if(e) {
				return res.json({code:1,msg:'Server Error',e:e})
			    }
			    const {user} = d;
			    res.json({code:0,data:true})
			});
		}
	});
});

Router.post('/matchUser', function(req, res) {
	// this body should look something like this:
	// {
	//	"user": "username"
	// }
	const body = req.body;

	User.findOne(body, function(err, user) {
		User.find({}, function(err, users) {
			// this is the user object with matches
			const matchedUser = matchUser_toUsers(user, users);

			// this is the list of match objects, which look like:
			//   {
			//       "user": "username"
			//       , "dist": 60 // sample distance in miles
			//   }
			const matchedObjects = _.get(matchedUser, "matches");
			const matches = _.map(matchedObjects, obj => _.get(obj, "user"));

			const fetchedUsers = _.map(users, fetchUser => _.get(fetchUser, "_doc"));

			// transform user array into users object; has all matched users
			const usersObject = _.reduce(fetchedUsers, (usrObj, usr) => {
				// get the index of matched user
				const idx = _.indexOf(matches, _.get(usr, "user"));

				// if the user is a "matched" user, add them
				if(idx < 0) {
					return usrObj;
				}

				// if the user is "matched", add them
				return _.assign({}, usrObj, {
					[_.get(usr, "user")]: _.assign({}, usr, {
						"dist": _.get(matchedObjects[idx], "dist")
						, "commonInterests": _.get(matchedObjects[idx], "commonInterests")
					})
				});
			}, {});

			// get the relevant information
			const relevantUsers = _.mapValues(usersObject, usr => {
				return {
					  "name": _.get(usr, "name")
					, "avatar": _.get(usr, "avatar")
					, "dist": _.get(usr, "dist")
					, "desc": _.get(usr, "desc")
          , "user": _.get(usr, "user")
					, "commonInterests": _.get(usr, "commonInterests")
				};
			});

			// SEND IT BABY
			res.json(relevantUsers);
		});
	});
});

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
    User.findOne({$or: [{user:user,pwd:md5Pwd(pwd)}, {email:user,pwd:md5Pwd(pwd)}]},_filter,function(err,doc){
        if(!doc) {
            return res.json({code:1,msg:'Check if username and password are correct'})
        }
        res.cookie('userid',doc._id)
        return res.json({code:0,data:doc})
    })
})

Router.post('/register',function(req,res){
    const {email, user, name, pwd, type} = req.body
    User.findOne({$or: [{user:user}, {email: email}]},function(err,doc){

        if(doc) {
            return res.json({code:1,msg:'Username or email already exists',doc:doc})
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
