import { queryRef, 
	suggestionRef, 
	suggestionResultRef,
 	influencerRef, 
 	hashtagRef 
 } from 'config'
 import { 
 	QUERY_ADDED,
 	QUERY_RESULT_ADDED,
 	QUERY_RESULT_CHANGED,
 	CLEAR_SUGGESTION_RESULTS,
 	SUGGESTION_ADDED,
 	SUGGESTION_RESULT_ADDED,
 	SET_ACTIVE_QUERY,
 	STOP_LISTENING_FOR_QUERY_RESULTS
 } from 'constants'
export const queryResultChanged = (key, val, queryId) => (dispatch) => {
	dispatch({
		type: QUERY_RESULT_CHANGED,
		key,
		val,
		queryId
	})
}
export const setActiveQuery = (query) => (dispatch) => {
	dispatch({
		type: SET_ACTIVE_QUERY,
		query
	})
}
export const queryResultAdded = (key, val, queryId) => (dispatch) => {
	dispatch({
		type: QUERY_RESULT_ADDED,
		key,
		val,
		queryId
	})
}
export const queryAdded = (query, queryType, sessionId) => (dispatch) => {
	console.log('query added called with', query, queryType, sessionId)
	return new Promise((resolve) => {
		let newQueryRef = queryRef.push()
	  newQueryRef.set({
	    query: {
	      type: queryType,
	      query,
	      id: newQueryRef.key,
	      sessionId,
	      status: 0
	    }
	  })
	  dispatch({
	  	type: QUERY_ADDED,
	  	queryId: newQueryRef.key,
	  	data: {
	  		query,
		  	queryType,
	  	}
	  })
	  resolve(newQueryRef.key)
	})
}

export const suggestionAdded = (query, queryType) => (dispatch) => {
	console.log('suggestionAdded called with', query, queryType)
	return new Promise((resolve) => {
		let ref = suggestionRef.push()
		ref.set({
			query,
			queryType,
			postRef: `${ref.key}/results`,
			status:0
		})
		let thisResultRef = suggestionResultRef.child(ref.key).child('results')
		dispatch({
			type: SUGGESTION_ADDED,
			query,
			queryType
		})
		resolve(thisResultRef)
	})
}

export const suggestionResultAdded = (suggestionResult) => (dispatch) => {
	dispatch({
		type: SUGGESTION_RESULT_ADDED,
		suggestionResult
	})
}

export const clearSuggestionResults = (ref) => (dispatch) => {
	return new Promise((resolve) => {
		ref.off()
		dispatch({
			type: CLEAR_SUGGESTION_RESULTS
		})
		resolve()
	})
}

export const listenForSuggestionResults = (ref) => (dispatch) => {
	console.log('listening for suggestion results', ref)
	ref.on('child_added', s => {
		dispatch(suggestionResultAdded(s.val()))
	})
	ref.on('child_changed', s => {
		dispatch(suggestionResultAdded(s.val()))
	})
}

export const listenForQueryResults = (queryId, queryType) => (dispatch) => {
	console.log('listening for results for query id', queryId)
	switch(queryType) {
    case 'influencer':
    	console.log('should listen to influencer endpoint')
      return influencerRef.child(queryId).on('child_changed', snap => {
        dispatch(queryResultChanged(snap.key, snap.val(), queryId))
	        influencerRef.child(queryId).on('child_added', snap => {
	        dispatch(queryResultChanged(snap.key, snap.val(), queryId))
	      })
      })
    case 'hashtag':
      return hashtagRef.child(queryId).on('child_added', snap => {
        dispatch(queryResultAdded(snap.key, snap.val(), queryId))
          hashtagRef.child(queryId).on('child_changed', snap => {
	        dispatch(queryResultAdded(snap.key, snap.val(), queryId))
	      })
      })
  }
}
export const stopListeningForQueryResults = (queryId, queryType) => (dispatch) => {
	console.log('stop listening to', queryId)
	switch(queryType) {
		case 'influencer':
			influencerRef.child(queryId).off()
			return
		case 'hashtag':
			hashtagRef.child(queryId).off()
	}
	dispatch({
		type: STOP_LISTENING_FOR_QUERY_RESULTS
	})
}