export const CREATE_USER_SESSION = 'CREATE_USER_SESSION'

export const userSession = (state={}, action) => {
	switch(action.type) {
		case CREATE_USER_SESSION:
			return action.sessionId
		default:
			return state
	}
}