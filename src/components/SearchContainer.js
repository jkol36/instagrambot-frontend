import firebase from 'firebase'
import { connect } from 'react-redux'
import React, { Component } from 'react';
import SearchBar from './SearchBar'
import { queryAdded, listenForQueryResults } from 'actions/queries'
import '../css/searchbar.css'


class SearchContainer extends Component {
	constructor(props) {
		super(props)
		this.onChange = this.onChange.bind(this)
    this.clearSuggestions = this.clearSuggestions.bind(this)
    this.onSelectedSuggestion = this.onSelectedSuggestion.bind(this)
    this.onSearch = this.onSearch.bind(this)
		this.state = {
			suggestions: [],
      query: '',
      selectedSuggesstion: null,
      suggestionResultRef:null,
		}
	}
	onChange(e) {
    if(e.target.value.length === 0) {
      this.state.suggestionResultRef.off()
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
        let suggestionResultRef = firebase.database().ref(`igbot/querySuggestionResults/${ref.key}/results`)
        this.setState({
          suggestionResultRef
        })
        suggestionResultRef
        .on('child_added', s => {
          users.push(s.val().user)
          this.setState({
            suggestions:users.slice(0,5)
          })
        })
      })
    }
	}
  clearSuggestions() {
    this.state.suggestionResultRef.off()
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

  onSearch(query) {
    console.log('on search called with', query)
    let { queryType } = this.props
    this.clearSuggestions()
    const { dispatch } = this.props
    dispatch(queryAdded(query, queryType, this.props.userSession))
    .then(queryId => dispatch(listenForQueryResults(queryId, queryType)))
    
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
            onSearch={() => this.onSearch(this.state.query)}
            />
		      </div>
		    </div>
		  </form>
		)
	}
}

export default connect(state => state)(SearchContainer)
