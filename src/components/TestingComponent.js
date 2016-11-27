import firebase from 'firebase'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setActiveQuery, queryResultAdded } from 'actions/queries'

class TestingComponent extends Component {
	constructor(props) {
		super(props)
		this.dispatchQuery = this.dispatchQuery.bind(this)
		this.dispatchListenForQueryResults = this.dispatchListenForQueryResults.bind(this)
		this.dispatchStopListeningForQueryResults = this.dispatchStopListeningForQueryResults.bind(this)
		this.pushQueryToFirebase = this.pushQueryToFirebase.bind(this)
	}

	dispatchQuery() {
		const {dispatch} = this.props
		const queries = [
			{type:'influencers', text:'garyvee', id:1},
			{type: 'hashtags', text:'startups', id:2},
			{type: 'hashtags', text:'vegan', id:3},
			{type: 'influencers', text:'jkol36', id:4}
		]
		let randomInt = Math.floor(Math.random() * queries.length) + 0
		dispatch(setActiveQuery(queries[randomInt]))
	}
	dispatchListenForQueryResults() {
		const {dispatch} = this.props
		console.log(`listening for query results for ${this.props.query.text}`)
		let ref = firebase.database().ref(`igbot/tests/${this.props.query.type}/${this.props.query.id}`)
		ref.child('status').set('needs love')
		firebase.database().ref(`igbot/${this.props.query.type}/${this.props.query.id}`).on('child_added', snap => {
			console.log(snap.val())
			dispatch(queryResultAdded(snap.key, snap.val(), snap.val().id))
		})
	}
	dispatchStopListeningForQueryResults() {
		console.log('then this')
	}
	pushQueryToFirebase() {
		const { dispatch } = this.props
		console.log('push this query to firebase')
		let ref = firebase.database().ref(`igbot/tests/${this.props.query.type}`).push()
		ref.set({...this.props.query, id:ref.key},() => dispatch(setActiveQuery({...this.props.query, id:ref.key})))

	}


	render() {
		return (
			<div> 
				<p> here you should see the current query: {this.props.query.text} </p>
				<button onClick={this.dispatchQuery}> 
					Dispatch a query
				</button>
				<button onClick={this.dispatchListenForQueryResults}> 
					Start listening for query results
				</button>
				<button onClick={this.dispatchStopListeningForQueryResults}> 
					Stop listening for query results
				</button>
				<button onClick={this.pushQueryToFirebase}> 
					Push this query {this.props.query.text} to firebase
				</button>

			</div>
		)
	}
}

export default connect(state => state)(TestingComponent)

