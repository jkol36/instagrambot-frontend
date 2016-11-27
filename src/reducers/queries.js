import {
	LISTEN_FOR_QUERY_RESULTS,
	QUERY_ADDED,
	QUERY_RESULT_ADDED,
	QUERY_RESULT_CHANGED,
	SUGGESTION_ADDED,
	SUGGESTION_RESULT_ADDED,
	CLEAR_SUGGESTION_RESULTS,
	SET_ACTIVE_QUERY,
	STOP_LISTENING_FOR_QUERY_RESULTS
} from 'constants'
export const queries = (state={}, action) => {
	switch(action.type) {
		case QUERY_ADDED:
			state[action.queryId] = action.data
			return state
		default:
			return state
	}
}

export const activeQuery = (state=null, action) => {
	switch(action.type) {
		case SET_ACTIVE_QUERY:
			return action.query
		default:
			return state
	}
}
export const queryResults = (state={}, action) => {
	switch(action.type) {
		case QUERY_RESULT_ADDED:
		case LISTEN_FOR_QUERY_RESULTS:
		case STOP_LISTENING_FOR_QUERY_RESULTS:
		case QUERY_RESULT_CHANGED:
			state[action.queryId] = {...state[action.queryId], [action.key]:action.val}
			return state
		default:
			return state
	}
}

export const querySuggestions = (state=[], action) => {
	switch(action.type) {
		case SUGGESTION_ADDED:
			let newState = [...state, {query:action.query, queryType:action.queryType}]
			return newState
		case CLEAR_SUGGESTION_RESULTS:
			return []
		default:
			return state
	}
}

export const suggestionResults = (state=[], action) => {
	switch(action.type) {
		case SUGGESTION_RESULT_ADDED:
			let newState = [...state, action.suggestionResult]
			return newState
		case CLEAR_SUGGESTION_RESULTS:
			return []
		default:
			return state
	}
}