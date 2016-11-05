import firebase from 'firebase'
import React, { Component } from 'react';
import SearchBar from './SearchBar'
import '../css/searchbar.css'


export default class SearchContainer extends Component {
	constructor(props) {
		super(props)
		this.onChange = this.onChange.bind(this)
    this.clearSuggestions = this.clearSuggestions.bind(this)
    this.onSelectedSuggestion = this.onSelectedSuggestion.bind(this)
		this.state = {
			suggestions: [],
      query: '',
      selectedSuggesstion: null
		}
	}
	onChange(e) {
    if(e.target.value.length === 0 && this.state.queryId || e.target.value.length === 1 && this.state.queryId) {
      switch(this.state.queryType) {
        case 'influencer':
          influencerRef.child(this.state.queryId).off()
        case 'hashtag':
          hashtagRef.child(this.state.queryId).off()
      }
      
    }
    else if(e.target.value.length === 0) {
      this.setState({
        suggestions: [],
        query: e.target.value
      })
    }
    else {
      this.setState({query:e.target.value})
      let users = []
      let query = e.target.value.trim()
      let ref = firebase.database().ref('igbot/querySuggestions').push()
      ref.set({query, postRef:`${ref.key}/results`}, () => {
        firebase.database().ref(`igbot/querySuggestionResults/${ref.key}/results`).on('child_added', s => {
          users.push(s.val().user)
          this.setState({
            suggestions:users.slice(0,5)
          })
        })
      })
    }
	}
  clearSuggestions() {
    this.setState({
      suggestions:[]
    })
  }

  onSelectedSuggestion(name) {
    console.log('selectedSuggesstion called with', name)
    this.setState({
      query: name,
      selectedSuggestion: name
    })
  }


	render() {
		return (
		  <form className='form-inline row'>
		    <div className="form-group search-bar-wrapper">
		      <div className='input-group'>
		       	<SearchBar 
            value={this.state.query} 
            suggestions={this.state.suggestions}
            selectedSuggestion={this.state.selectedSuggestion} 
            onChange={this.onChange} 
            clearSuggestions={this.clearSuggestions}
            onSelectedSuggestion={this.onSelectedSuggestion} 
            placeholder={this.props.placeholder}
            onSearch={() => this.props.onSearch(this.state.query)}
            />
		      </div>
		    </div>
		  </form>
		)
	}
}
