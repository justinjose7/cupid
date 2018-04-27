const { matchUsers, matchUser_toUsers } = require("../local_modules/match");

const users = [
        {
            "_id": {
                "$oid": "5ae25a5fe30289659e274321"
            },
            "email": "cw@gmail.com",
            "user": "whatscoolkins",
            "name": "Whatkins",
            "type": "human",
            "pwd": "4271e4587f2603887210508a0ffe1645",
            "__v": 0,
            "latLng": {
                "lat": 41.7297312,
                "lng": -74.98936179999998
            },
            "maxdist": 10,
            "desc": "i speak computer",
            "avatar": "https://res.cloudinary.com/dbormtzbg/image/upload/v1524783721/h9sl5jbc5w5fv3lnplvh.jpg",
            "surveyComplete": true,
            "interests": {
                "sports": true,
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
            "name": "Whatkins",
            "type": "human",
            "pwd": "4271e4587f2603887210508a0ffe1645",
            "__v": 0,
            "latLng": {
                "lat": 41.7297312,
                "lng": -74.98936179999998
            },
            "maxdist": 500,
            "desc": "i speak computer",
            "avatar": "https://res.cloudinary.com/dbormtzbg/image/upload/v1524783721/h9sl5jbc5w5fv3lnplvh.jpg",
            "surveyComplete": true,
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

const matched = matchUsers(users);

console.log(matched);
