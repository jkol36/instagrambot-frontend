export const queries = (state={}, action) => {
	switch(action.type) {
		case 'QUERY_ADDED':
			state[action.queryId] = action.data
			return state
		default:
			return state
	}
}

export const queryResults = (state={}, action) => {
	switch(action.type) {
		case 'QUERY_RESULT_ADDED':
		case 'LISTEN_FOR_QUERY_RESULTS':
		case 'QUERY_RESULT_CHANGED':
			state[action.queryId] = {...state[action.queryId], [action.key]:action.val}
			return state
		default:
			return state
	}
}