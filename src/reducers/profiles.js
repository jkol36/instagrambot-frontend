export const profilesParsed = (state=0, action) => {
	switch(action.type) {
		case 'PROFILE_PARSED':
			return state + 1
		default:
			return state
	}
}

export const followersCount = (state=0, action) => {
	switch(action.type) {
		case 'NEW_FOLLOWER':
			return state + 1
		default:
			return state
	}
}

export const followersParsed = (state=0, action) => {
	switch(action.type) {
		case 'NEW_FOLLOWER_PARSED':
			return state + 1
		default:
			return state
	}
}