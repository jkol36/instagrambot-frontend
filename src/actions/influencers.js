import { influencerRef } from 'config'
import { INITIAL_INFLUENCERS } from 'reducers/influencers'

export const getInitialInfluencers = () => (dispatch) => {
	influencerRef.once('value', s => {
		if(s.exists()) {
			dispatch({type:INITIAL_INFLUENCERS, influencers:s.val()})
		}
		else {
			dispatch({type: INITIAL_INFLUENCERS, influencers: {}})
		}
	})
}

export const listenForInfluencerChanges = () => (dispatch) => {
	influencerRef.on('child_added', s => {
		dispatch({type: 'INFLUENCER_ADDED', influencer:s.val()})
	});
	influencerRef.on('child_changed', s => {
		dispatch({
			type: 'INFLUENCER_CHANGED', 
			influencer:s.val(),
			name: s.key
		})
	})

}