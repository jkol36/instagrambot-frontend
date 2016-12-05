import { connect } from 'react-redux'
import React, { Component } from 'react'
import { getSummary, getEmails} from 'helpers'
import { ResultTable } from 'components/ResultTable'
import { stopListeningForQueryResults, setActiveQuery, listenForQueryResults } from 'actions/queries'
import SearchBarContainer  from './SearchBarContainer'
import csv from '../lib/csv'
import StatComponent from 'components/StatComponent'
import Widget from 'components/Widget'
import Switch from 'react-toggle-switch'
import ReactTooltip from 'react-tooltip'
import 'css/switch.less'

class SearchContainer extends Component {
  //results is an object
  //the result we want to see is accessible by this.props.results[this.props.activeQuery]
  constructor(props) {
    super(props)
    this.state = {
      queryType: 'hashtag',
      hashtagSelected: false,
      influencerSelected: false,
      placeholder:'hashtag',
      result: {},
    }
    this.renderCalled = 0
    this.canRefresh = true
    this.shouldUpdate = false
    this.intervalTrigger = null
    this.clearResults = this.clearResults.bind(this)
    this.handleResult = this.handleResult.bind(this)
    this.downloadCSV = this.downloadCSV.bind(this)
    this.buildCSVData = this.buildCSVData.bind(this)

  }

  componentWillMount() {
    console.log('search container mounting got user', this.props.auth.user)

  }
  downloadCSV() {
    let {columns, data} = this.buildCSVData(getEmails(this.state.result))
    console.log(columns)
    let csvFile = csv(columns, data, ' | ')
    let filename = `${this.state.result.query}.csv`
    const a = document.createElement('a');
    let bomCode = '%EF%BB%BF';
    a.textContent = 'download';
    a.download = filename;
    a.href = `data:text/csv;charset=utf-8,${bomCode}${encodeURIComponent(csvFile)}`;
    a.click();
  }
  clearResults() {
    this.setState({
      result: {}
    })
  }
  handleResult(key, val, id, query) {
    this.setState({
      result: Object.assign({}, this.state.result, {[key]:val}, {id}, {query})
    })
  }
  buildCSVData(emails){
    console.log('buildCSVData', emails)
    const columns = [{
        'id': 'InstagramUsername',
        'displayText': 'Instagram Username',
      }, {
        'id': 'Followers',
        'displayText': 'Followers'
      },
      {
        'id': 'fullName',
        'displayText': 'Full Name'
      }, {
        'id': 'Email',
        'displayText': 'Email'
      }]
      const data = emails.map((email, index) => {
        return {
          'InstagramUsername': email.username,
          'Followers': email.metaData.user.followed_by.count,
          'fullName': email.metaData.user.full_name,
          'Email': email.email,
        }
      })
      return {
        columns,
        data
      }
  }
      



  render() {
    let emails = []
    let emailsForExport
    let parsedCount = 0
    let emails_found = 0
    let activeQuery = 'Nothing yet' 
    //let activeQueries = this.props.query ? Object.keys(this.props.query).map(k => Object.assign({}, {id:k}, this.props.query[k])):[]
    const getOppositeQueryType = () => {
      switch(this.state.queryType) {
        case 'influencer':
          return 'hashtag'
        case 'hashtag':
          return 'influencer'
        default:
      }
    } 
    if(Object.keys(this.state.result).length > 0) {
      parsedCount = getSummary(this.state.result).parsedCount
      emails_found = getSummary(this.state.result).emails_found
      emails = getEmails(this.state.result)
      //activeQuery = this.state.result.hashtag.query
    }

    return (
      <div id='searchContainer'>
        <div className='row'> 
          <div className='col-md-12 col-lg-12 text-center'> 
            <h4> Showing results for {this.state.result.query} </h4>
          </div>
        </div>
        <div className='row stats'>
          <div className='col-md-6'>
            <StatComponent color='pink' title='Profiles Visited' value={parsedCount ? parsedCount: 0}/>
          </div>
          <div className='col-md-6'>
            <StatComponent color='blue' title='emails found' value={emails_found ? emails_found: 0}/>
          </div>
        </div> 
        <div className='row'>
          <div className='col-md-12 col-lg-12'>
            <Widget
              title='Search for emails'
              widgetHeaderButtons={[]}
              icon='search'
              color='green'
              caption='Search for emails by Hashtag or Influencer'
              >
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
                handleResult = {this.handleResult}
              /> 
            </Widget>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12 col-lg-12'>
            <ReactTooltip />
              <Widget
                widgetHeaderButtons={[{icon:'download', onClick:this.downloadCSV, dataTip:'Download results as CSV'}]}
                title='Emails'
                icon='email'
                color='blue'
                caption='Emails found will appear here'
              >
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
                      <img width='20' src={email.metaData.user.profile_pic_url}></img>
                    </td>
                    <td> 
                      {email.username}
                    </td>
                    <td> {email.email} </td>
                    <td> {email.metaData.user.followed_by.count} </td>
                    <td> {email.metaData.user.full_name} </td>
                  </tr>
                )
              })}
            </ResultTable>
          </Widget>
        </div>
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
    queryResults:state.queryResults
  }
})(SearchContainer)


