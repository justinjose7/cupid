import axios from 'axios'
import { Toast } from 'antd-mobile'

//block request
axios.interceptors.request.use(function (config) {
    Toast.loading('loading',0)
    return config
})

//request respone 
axios.interceptors.response.use(function(config){
	setTimeout(() => {
			Toast.hide()
	}, 500)
	return config
})