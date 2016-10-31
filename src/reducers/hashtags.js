export const HASHTAG_ADDED = 'HASHTAG_ADDED';
export const INITIAL_HASHTAGS = 'INITIAL_HASHTAGS';

export const hashtags = (state = {}, action) => {
	switch(action.type) {
		case HASHTAG_ADDED:
			return {...state, ...action.hashtag}
		case INITIAL_HASHTAGS:
			return action.hashtags
		default:
			return state
	}
}

