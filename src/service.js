export { authHeader, config}
	
function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));
 
    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }

}

const config = {
  apiUrl: '199.98.27.118:6969/api'
};