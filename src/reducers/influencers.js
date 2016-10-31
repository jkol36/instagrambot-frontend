export const INFLUENCER_ADDED = 'INFLUENCER_ADDED';
export const INITIAL_INFLUENCERS = 'INITIAL_INFLUENCERS';

export const influencers = (state = {}, action) => {
	switch(action.type) {
		case INFLUENCER_ADDED:
			return {...state, ...action.influencer}
		case INITIAL_INFLUENCERS:
			return action.influencers
		default:
			return state
	}
}

