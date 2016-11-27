export const CREATE_ANONYMOUS_USER_SESSION = 'CREATE_ANONYMOUS_USER_SESSION'

export const anonymousUserSession = (state={}, action) => {
	switch(action.type) {
		case CREATE_ANONYMOUS_USER_SESSION:
			return action.sessionId
		default:
			return state
	}
}