const _ = require("lodash");

module.exports = {
          matchUsers
        , matchUser_toUsers
};


// returns map from user id to list of other user IDs
// that are compatible with that particular user


// allows for all users to be "matched"
function matchUsers(users) {
        // need matching threshold
        // need full list of all users

        // consider the location
        // consider the interests

        return _.map(users, (user) => {
                return matchUser_toUsers(user, users);
        });
}


function matchUser_toUsers(user, users) {
        // add "matches" to the user object upon match


        // returns user with added matches
        return _.assign({}, user, {
                "matches": _.reduce(users, (matches, prospect) => {
                        // calculate distance in miles
                        const distance = calcDist(_.get(user, "latLng"), _.get(prospect, "latLng"));

                        // don't include the user itself if they are compared to themselves
                        if(_.isEqual(_.get(user, "user"), _.get(prospect, "user"))) {
                                return matches;
                        }

                        // if too far away, don't add the user to the list
                        if(distance > _.get(user, "maxdist") || distance > _.get(prospect, "maxdist")) {
                                return matches;
                        }

                        // get interest intersection
                        const interest = calcInter(_.get(user, "interests"), _.get(prospect, "interests"));
                        const shared = _.reduce(interest, (share, interested) => share || interested, false);

                        if(shared) {
				const newUsr = {
					"user": _.get(prospect, "user")
					, "dist": distance
					, "commonInterests": interest
				};

                                return _.concat([], matches, newUsr);
                        }

                        return matches;
                }, [])

        });
}


// Haversine method
function calcDist(latLng1, latLng2) {
        const R_mile = 3959;
        const R_meter = 6371e3;

        const phi1 = _.get(latLng1, "lat") * Math.PI / 180;
        const phi2 = _.get(latLng2, "lat") * Math.PI / 180;

        const del_phi = (_.get(latLng2, "lat") - _.get(latLng1, "lat")) * Math.PI / 180;
        const del_lambda = (_.get(latLng2, "lng") - _.get(latLng1, "lng")) * Math.PI / 180;

        // Utilize Haversine formula to calculate the distance
        const a = Math.sin(del_phi/2) * Math.sin(del_phi/2) + Math.cos(phi1) * Math.cos(phi2) * Math.sin(del_lambda/2) * Math.sin(del_lambda/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const dist = R_mile * c;

        return dist;
}

function calcInter(interest1, interest2) {
        // iterate through the interest object
        return _.reduce(interest1, (intersection, like, interest) => {
                // return the intersection
                return _.assign({}, intersection, { [interest]: like && _.get(interest2, interest) });
        }, {});
}
