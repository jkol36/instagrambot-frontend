import { connect } from 'react-redux';
import React, { Component } from 'react';
import { getSummary, getEmails} from 'helpers'
import { ResultTable } from 'components/ResultTable'
import { stopListeningForQueryResults, setActiveQuery } from 'actions/queries'
import SearchBarContainer  from './SearchBarContainer';
import Widget from 'components/Widget'
import Switch from 'react-toggle-switch'
import '../css/searchbar.less'
import '../css/switch.less'
class SearchContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      queryType: null,
      hashtagSelected: false,
      influencerSelected: false,
      placeholder:''
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
    let result = this.props.results ? this.props.results[this.props.activeQuery]: null
    let emails = []
    let parsedCount = 0
    let emails_found = 0
    let currentQuery = 'Your search term will appear here'
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
        <div className='col-md-6'>
          <Widget texts={[]} title='select a query type'>
            <div className='form-group'>
              <label for='hashtagSwitch'>Hashtag</label> 
              <Switch label='testing' on={this.state.queryType === 'hashtag'} id='hashtagSwitch' onClick={() => this.setState({
                queryType: 'hashtag',
                placeholder: 'startups'
              })}/>
            </div>
            <div className='form-group'>
              <label for='influencerSwitch'>Influencer</label>
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
        <div className='col-md-6'> 
          <Widget title={'Result Summary'} texts={[{label:'profiles parsed', value: parsedCount}, {label:'emails found', value:emails_found}, {label:'current query', value:currentQuery}]}/>
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


