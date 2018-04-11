import { authHeader, config } from './service';
import axios from 'axios';

export default function HandleSignupClick (email, fullname, user, password) {
    console.log(email, fullname, user, password)
    axios.post('http://199.98.27.118:6969/api/user/',
      { 
        "fullname": fullname,
        "username": user,
        "email": email,
        "password": password        
      })
      .then(function (response) {
        console.log(response.data.msg);
          if(response.data.msg.includes("failure")) {
            alert(response.data.msg);
          } else {
            window.location.href = "/survey";
          }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}