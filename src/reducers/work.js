export const WORK_ADDED = 'WORK_ADDED';

export const work = (state = {}, action) => {
	switch(action.type) {
		case WORK_ADDED:
			return {...state, ...action.work}
		default:
			return state
	}
}

