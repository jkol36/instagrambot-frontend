import { connect } from 'react-redux';
import React, { Component } from 'react';
import { getSummary, getEmails} from 'helpers'
import { ResultTable } from 'components/ResultTable'
import { stopListeningForQueryResults, setActiveQuery, listenForQueryResults } from 'actions/queries'
import SearchBarContainer  from './SearchBarContainer';
import Widget from 'components/Widget'
import Switch from 'react-toggle-switch'
import '../css/searchbar.less'
import '../css/switch.less'
class SearchContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      queryType: 'hashtag',
      hashtagSelected: false,
      influencerSelected: false,
      placeholder:'hashtag'
    }
    this.canRefresh = true
    this.shouldUpdate = false
    this.intervalTrigger = null
    this.clearResults = this.clearResults.bind(this)
    this.updateResults = this.updateResults.bind(this)
    this.tick = setTimeout(() => this.updateResults(), 1000)

  }

  componentWillMount() {
    console.log('dashboard will mount')
    this.shouldUpdate = true
    const {location} = this.props
    if(location.action === 'PUSH') {
      if(this.canRefresh) {
        this.canRefresh = false
        window.location.reload()
      }
    }
  }
   updateResults() {
    if(this.shouldUpdate) {
      this.forceUpdate()
      setTimeout(this.updateResults, 1000)
    }
    return
  }
  componentWillUnmount() {
    this.shouldUpdate = false
  }
  clearResults() {
    const {dispatch, queryType, activeQuery} = this.props
    dispatch(stopListeningForQueryResults(activeQuery, queryType))
    dispatch(setActiveQuery(null))
  }




  render() {
    console.log(this.props.activeQuery)
    let result = this.props.results ? this.props.results[this.props.activeQuery]: null
    let emails = []
    let parsedCount = 0
    let emails_found = 0 
    let activeQueries = this.props.query ? Object.keys(this.props.query).map(k => Object.assign({}, {id:k}, this.props.query[k])):[]
    const getOppositeQueryType = () => {
      switch(this.state.queryType) {
        case 'influencer':
          return 'hashtag'
        case 'hashtag':
          return 'influencer'
        default:
      }
    } 
    if(result) {
      parsedCount = getSummary(result).parsedCount
      emails_found = getSummary(result).emails_found
      emails = getEmails(result)
    }

    return (
      <div id='searchContainer'>
        <div className='col-md-4'>
          <Widget texts={[]} title='select a query type'>
            <div className='form-group'>
              <label htmlFor='hashtagSwitch'>Hashtag</label> 
              <Switch label='testing' on={this.state.queryType === 'hashtag'} id='hashtagSwitch' onClick={() => this.setState({
                queryType: 'hashtag',
                placeholder: 'startups'
              })}/>
            </div>
            <div className='form-group'>
              <label htmlFor='influencerSwitch'>Influencer</label>
              <Switch label='testing' on={this.state.queryType === 'influencer'} id='hashtagSwitch' onClick={() => this.setState({
                queryType: 'influencer',
                placeholder: 'Gary Vee'
              })}/>
            </div>
            <SearchBarContainer
              className='search' 
              queryType={this.state.queryType} 
              placeholder={this.state.placeholder}
            />
          </Widget>
        </div>
        <div className='col-md-4'> 
          <Widget title={'Result Summary'} texts={[{label:'profiles parsed', value: parsedCount}, {label:'emails found', value:emails_found}, {label:'Number of Active Queries', value:activeQueries.length}]}/>
        </div>
        <div className='col-md-4'> 
          <Widget title='Your Active Queries' texts={[]}> 
            {activeQueries.length === 0 ? 'None yet': 
              <ul className='list-group'>
              {activeQueries.map((query, index) => {
              return (
                <li className='list-group-item' key={index}>
                  <div>
                    <label htmlFor='queryType'>query type</label>
                    <em> {query.queryType}</em>
                  </div>
                  <div>
                    <label htmlFor='query'>query</label>
                    <em> {query.query}</em>
                    <div>
                      <button className='btn btn-success' onClick={() => {this.props.dispatch(setActiveQuery(query.id), this.props.dispatch(listenForQueryResults(query.id, query.queryType)))}}> View Results </button>
                    </div>
                  </div>
                </li>
              )
            })}
            </ul>
            } 
          </Widget>
        </div>
        <div className='row'>
          <ResultTable headerRows={
              [
                {text:'Profile Pic'}, 
                {text:'Username'}, 
                {text:'Email'}, 
                {text:'Followers'}, 
                {text:'Full Name'}
              ]}>
              {emails.map((email, index) => {
                return (
                  <tr key={index}> 
                    <td> 
                      <img src={email.metaData.user.profile_pic_url}></img>
                    </td>
                    <td> 
                      {email.username}
                    </td>
                    <td> {email.email} </td>
                    <td> {email.metaData.user.followed_by.count} </td>
                    <td> {email.metaData.user.full_name} </td>
                  </tr>
                )
              }).splice(0,10)}
            </ResultTable>
        </div>

      </div>
    )
  }
}

export default connect(state => {
  return {
    auth: state.auth,
    query: state.queries,
    activeQuery: state.activeQuery,
    results: state.queryResults
  }
})(SearchContainer)


