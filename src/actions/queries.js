import { queryRef, influencerRef, hashtagRef } from 'config'
export const queryResultChanged = (key, val, queryId) => (dispatch) => {
	dispatch({
		type: 'QUERY_RESULTS_CHANGED',
		key,
		val,
		queryId
	})
}
export const queryResultAdded = (key, val, queryId) => (dispatch) => {
	dispatch({
		type: 'QUERY_RESULT_ADDED',
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
	      status: 'needs love'
	    }
	  })
	  dispatch({
	  	type: 'QUERY_ADDED',
	  	queryId: newQueryRef.key,
	  	data: {
	  		query,
		  	queryType,
	  	}
	  })
	  resolve(newQueryRef.key)
	})
}

export const listenForQueryResults = (queryId, queryType) => (dispatch) => {
	console.log('listening for results for query id', queryId)
	switch(queryType) {
    case 'influencer':
      influencerRef.child(queryId).on('child_changed', snap => {
        dispatch(queryResultChanged(snap.key, snap.val(), queryId))
      })
      influencerRef.child(queryId).on('child_added', snap => {
        dispatch(queryResultChanged(snap.key, snap.val(), queryId))
      })
    case 'hashtag':
      hashtagRef.child(queryId).on('child_added', snap => {
        dispatch(queryResultAdded(snap.key, snap.val(), queryId))
      })
      hashtagRef.child(queryId).on('child_changed', snap => {
        dispatch(queryResultAdded(snap.key, snap.val(), queryId))
      })
  }
}