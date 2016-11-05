export const emails = (state=[], action) => {
	switch(action.type) {
		case 'EMAIL_FOUND':
			return [...state, ...action.email]
		default:
			return state
	}
}

export const emailsFound = (state=0, action) => {
	switch(action.type) {
		case 'EMAIL_FOUND':
			return state+1
		default:
			return state
	}
}