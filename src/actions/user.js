import { userSessionRef } from 'config'
import { CREATE_USER_SESSION } from 'reducers/user'

export const createUserSession = () => (dispatch) => {
	return new Promise((resolve) => {
		const userRef = userSessionRef.push()
		userRef.set({
			startedAt: Date.now()
		})
		dispatch({type: CREATE_USER_SESSION, sessionId: userRef.key})
		resolve(userRef.key)
	})
}