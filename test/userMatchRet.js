const { matchUser_toUsers, matchUsers } = require("match");
const _ = require("lodash");

const users = [
        {
            "_id": {
                "$oid": "5ae25a5fe30289659e274321"
            },
            "email": "cw@gmail.com",
            "user": "whatscoolkins",
            "name": "whatkins",
            "type": "human",
            "pwd": "4271e4587f2603887210508a0ffe1645",
            "__v": 0,
            "latLng": {
                "lat": 42.7297312,
                "lng": -77.98936179999998
            },
            "maxdist": 1000,
            "desc": "i speak computer",
            "avatar": "https://res.cloudinary.com/dbormtzbg/image/upload/v1524783721/h9sl5jbc5w5fv3lnplvh.jpg",
            "surveycomplete": true,
            "interests": {
                "sports": false,
                "politics": false,
                "food": false,
                "popmusic": false,
                "rap": true,
                "religion": false
            }
        }
        , {
            "_id": {
                "$oid": "5ae25a5fe30289659e274321"
            },
            "email": "cw@gmail.com",
            "user": "justinjose",
            "name": "whatkinssssssuuuu",
            "type": "human",
            "pwd": "4271e4587f2603887210508a0ffe1645",
            "__v": 0,
            "latLng": {
                "lat": 41.7297312,
                "lng": -74.98936179999998
            },
            "maxdist": 1000,
            "desc": "i speak computer",
            "avatar": "https://res.cloudinary.com/dbormtzbg/image/upload/v1524783721/h9sl5jbc5w5fv3lnplvh.jpg",
            "surveycomplete": true,
            "interests": {
                "sports": true,
                "politics": false,
                "food": false,
                "popmusic": false,
                "rap": true,
                "religion": false
            }
        }
];

const user = users[0];

function what() {
	// this is the user object with matches
	const matchedUser = matchUsers(users)[0];
	

	// this is the list of match objects, which look like:
	//   {
	//       "user": "username"
	//       , "dist": 60 // sample distance in miles
	//   }
	const matchedObjects = _.get(matchedUser, "matches");
	const matches = _.map(matchedObjects, obj => _.get(obj, "user"));



	// transform user array into users object; has all matched users
	const usersObject = _.reduce(users, (usrObj, usr) => {
		// get the index of matched user
		const idx = _.indexOf(matches, _.get(usr, "user"));

		// if the user is a "matched" user, add them
		if(idx < 0) {
			return usrObj;
		}

		
		// if the user is "matched", add them
		return _.assign({}, usrObj, {
			[_.get(usr, "user")]: _.assign({}, usr, { "dist": _.get(matchedObjects[idx], "dist") })
		});
	}, {});

	// get the relevant information
	const relevantUsers = _.mapValues(usersObject, usr => {
		return {
			  "name": _.get(usr, "name")
			, "avatar": _.get(usr, "avatar")
			, "dist": _.get(usr, "dist")
			, "desc": _.get(usr, "desc")
		};
	});

	return relevantUsers;
}

console.log(what());
