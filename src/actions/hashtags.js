import { hashtagRef } from 'config'
import { INITIAL_HASHTAGS } from 'reducers/hashtags'
export const getInitialHashtags = () => (dispatch) => {
	hashtagRef.once('value', s => {
		if(s.exists()) {
			console.log('got hashtags', s.val())
			dispatch({type:INITIAL_HASHTAGS, hashtags:s.val()})
		}
		else {
			console.log('no hashtags')
		}
	})
}


export const listenForHashtagChanges = () => (dispatch) => {
	hashtagRef.on('child_changed', s => {
		dispatch({type: 'HASHTAG_CHANGED',  hashtag:s.val()})
	})
	hashtagRef.on('child_added', s => {
		dispatch({type: 'HASHTAG_ADDED', hashtag:s.val()})
	})
}