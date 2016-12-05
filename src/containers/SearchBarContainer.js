import { connect } from 'react-redux'
import React, { Component } from 'react';
import SearchBar from 'components/SearchBar'
import { 
  queryAdded, 
  listenForQueryResults,
  suggestionAdded,
  clearSuggestionResults,
  listenForSuggestionResults,
  stopListeningForQueryResults,
  setActiveQuery
} from 'actions/queries'


class SearchBarContainer extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.clearSuggestions = this.clearSuggestions.bind(this)
    this.onSelectedSuggestion = this.onSelectedSuggestion.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.state = {
      query: '',
      selectedSuggesstion: null,
      suggestionResultRef:null,
      currentQueryId: null
    }
  }
  componentWillUnMount() {
    if(this.state.currentQueryId) {
      dispatch(stopListeningForQueryResults(this.state.currentQueryId))
    }
  }
  onChange(e) {
    const { dispatch } = this.props
    if(e.target.value.length === 0 && this.state.suggestionResultRef != null) {
      dispatch(clearSuggestionResults(this.state.suggestionResultRef))
      .then(this.setState({
        suggestionResultRef:null,
        query:e.target.value.trim()
      }))
    }
    else {
      let queryForLookup 
      let withoutHashtag = this.props.queryType === 'hashtag' ? e.target.value.split('#')[1]: null
      if(withoutHashtag) {
        queryForLookup = withoutHashtag.trim()
        
      }
      else {
        queryForLookup = e.target.value.trim()
      }
      this.setState({query:e.target.value})
      dispatch(suggestionAdded(queryForLookup, this.props.queryType))
      .then(ref => {
        if(this.state.suggestionResultRef) {
          dispatch(clearSuggestionResults(this.state.suggestionResultRef))
        }
        dispatch(listenForSuggestionResults(ref))
        this.setState({suggestionResultRef:ref})
      })
    }
  }

  onSelectedSuggestion(name) {
    this.setState({
      query: name,
      selectedSuggestion: name
    })
  }

  clearSuggestions() {
    const { dispatch } = this.props
    dispatch(clearSuggestionResults(this.state.suggestionResultRef))
    this.setState({
      query:null
    })
  }

  onSearch(query) {
    let { queryType, activeQuery, userSession, auth, handleResult } = this.props
    this.clearSuggestions()
    const { dispatch } = this.props
    let sessionId = auth.user.uid ? auth.user.uid: userSession
    dispatch(queryAdded(query, queryType, sessionId))
    .then(queryId => {
      dispatch(listenForQueryResults(queryId, queryType, query, handleResult))
      this.setState({
        currentQueryId: queryId
      })
    })
    
  }


  render() {
    return (
      <div className={this.props.className + ' ' + 'searchbar-container'}>
        <form className='form-inline'>
          <div className="form-group">
            <div className='input-group'>
              <SearchBar 
              value={this.state.query} 
              suggestions={this.props.querySuggestionResults}
              queryType={this.props.queryType}
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
      </div>
           
    )
  }
}

export default connect(state => {
  return {
    auth: state.auth,
    querySuggestions:state.querySuggestions,
    querySuggestionResults: state.suggestionResults.slice(0,10),
    activeQuery: state.activeQuery,
    userSession: state.anonymousUserSession
  }
})(SearchBarContainer)
