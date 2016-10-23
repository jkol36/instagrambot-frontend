
export const hashtags = (state = {}, action) => {
	switch(action.type) {
		case HASHTAG_ADDED:
			return {...state, action.hashtag}
		case INITIAL_HASHTAGS:
			return action.hashtags
	}
}