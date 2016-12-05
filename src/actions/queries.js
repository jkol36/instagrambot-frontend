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
//the sessionId will be a users uid to map a user to a array of queries, or a anonymousSessionId to map a 
//anonymous user session to an array of queries.
export const queryAdded = (query, queryType, sessionId) => (dispatch) => {
	console.log('query added called with', query, queryType, sessionId)
	return new Promise((resolve) => {
		let newQueryRef = queryRef.child(sessionId).push()
	  newQueryRef.set({
	     type: queryType,
	     query,
	     id: newQueryRef.key,
	     status: 0
	   })
	  dispatch({
	  	type: QUERY_ADDED,
	  	sessionId,
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

export const listenForQueryResults = (queryId, queryType, query, callback) => (dispatch) => {
	switch(queryType) {
    case 'influencer':
      return influencerRef.child(queryId).on('child_changed', snap => {
        callback(snap.key, snap.val(), queryId, query)
        influencerRef.child(queryId).on('child_added', snap => {
        	callback(snap.key, snap.val(), queryId, query)
        })
      })
    case 'hashtag':
    console.log('got hashtag')
      return hashtagRef.child(queryId).on('child_added', snap => {
        callback(snap.key, snap.val(), queryId, query)
        hashtagRef.child(queryId).on('child_changed', snap => {
        	callback(snap.key, snap.val(), queryId, query)
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