import firebase from 'firebase'
import React, { Component } from 'react';
import SearchBar from 'react-search-bar'
import '../css/searchbar.css'



export default class SearchContainer extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
		  <form className='form-inline row'>
		    <div className="form-group search-bar-wrapper">
		      <div className='input-group'>
		       	<SearchBar placeholder={this.props.slug} onSubmit={((query) => { {this.props.onSearch(query)}})} onChange={((input, resolve) => {
		       		this.props.onQueryChanged(input)
		       		let users = []
		       		let ref = firebase.database().ref('igbot/querySuggestions').push()
		       		ref.set({input, postRef:`${ref.key}/results`}, () => {
		       			firebase.database().ref(`igbot/querySuggestionResults/${ref.key}/results`).on('child_added', s => {
		       				users.push(s.val().user.username)
		       				if(users.length >= 10) {
		       					resolve(users)
		       				}
		       			})
		       		})
		       	})}/>
		      </div>
		    </div>
		  </form>
		)
	}
}