import { queryResultRef } from 'config'


export const listenForQueryResults = (queryId) => {
	queryResultRef.child(queryId).on('child_added', snap => {
		console.log('new result for query id', queryId, snap.val())
	})
}