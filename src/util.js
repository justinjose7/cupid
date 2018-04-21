export function getRedirectPath({type,avatar}){
    //user.type /boss /genius
    // user.avatar /bossinfo  /geniusinfo
	let url = (type==='professor')?'/professor': '/student'
    if (!avatar) {
        url += 'info'
    }
    return url
}