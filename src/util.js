export function getRedirectPath({type,avatar,surveyComplete}){

	let url = '/home'
		if (surveyComplete == false){
			url = '/survey'
		}
    if (!avatar) {
			url = '/profile'
    }
    return url
}
