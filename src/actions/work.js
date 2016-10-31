import { workRef } from 'config'
export const addWork = (work) => (dispatch) => {
	console.log('calleds')
	console.log(work.type)
	workRef.child(work.type).push({query:work.query}, () => {
		dispatch({type: 'WORD_ADDED', work})
	})

}