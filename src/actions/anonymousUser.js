import { anonymousUserSessionRef } from 'config'
import { CREATE_ANONYMOUS_USER_SESSION } from 'reducers/anonymousUser'

export const createAnonymousUserSession = () => (dispatch) => {
	return new Promise((resolve) => {
		const userRef = anonymousUserSessionRef.push()
		console.log('creating user session', userRef)
		userRef.set({
			startedAt: Date.now()
		})
		dispatch({type: CREATE_ANONYMOUS_USER_SESSION, sessionId: userRef.key})
		resolve(userRef.key)
	})
}