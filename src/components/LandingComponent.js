import React, { Component } from 'react'
import SearchBarContainer from 'containers/SearchBarContainer'
import { ResultTable } from 'components/ResultTable'
import { stopListeningForQueryResults, setActiveQuery } from 'actions/queries'
import { getSummary, getEmails } from '../helpers'
import { Link } from 'react-router'
import { connect } from 'react-redux'


class LandingComponent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			queryType:null,
			placeholder:null,
		}
		this.canRefresh = true
		this.shouldUpdate = false
    this.intervalTrigger = null
    this.clearResults = this.clearResults.bind(this)
    this.updateResults = this.updateResults.bind(this)
    this.tick = setTimeout(() => this.updateResults(), 1000)

  }

  componentWillMount() {
  	const {location} = this.props
  	if(location.action === 'PUSH') {
      if(this.canRefresh) {
        this.canRefresh = false
        window.location.reload()
      }
    }
    this.shouldUpdate = true
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
		console.log(this.props)
		let result = this.props.results ? this.props.results[this.props.activeQuery]: null
		let emails = []
		let modalText = ''
		if(result) {
			let {parsedCount, emails_found} = getSummary(result)
			modalText = <p> it looks like we've parsed through <strong> {parsedCount}</strong> profiles and found <strong> {emails_found} </strong> emails </p>
			emails = getEmails(result)
		}
		return (
			<div className='welcome-message'>
				<div className="row">
		      <div className="col-md-6">
		        <h1>Find emails easily on Instagram</h1>
		        <h2>Try it now with any </h2>
		      </div>
		    </div>
		    <div className='row'>
		      <div className='col-md-6'> 
		        <div className="form-try-hashtag"> <a onClick={() => this.setState({
		        	queryType:'hashtag',
		        	placeholder: 'Enter a hashtag'
		        })} className="btn">Hashtag</a> </div>
		      </div>
		    </div>
		    <div className="row">
		      <div className="col-sm-6 col-md-6 center-block text-center">
		        <div className="ortext">Or</div>
		      </div>
		    </div>
		    <div className='row'> 
		      <div className='col-md-6'>
		        <div className="form-try-influencer"> <a onClick={() => this.setState({
		        	queryType:'influencer',
		        	placeholder: 'Enter an influencer'
		        })} className="btn">Influencer</a> </div>
		      </div>
		    </div>
		    <div className='row'> 
		      <div className='col-md-6 col-md-offset-6' id='photo-container'> 
		          <img src='static/img/ig-background.png'/>
		      </div>
		    </div>
		    <div className='row'>
		    	<div className='col-md-6'>
		    		{
		    			this.state.queryType ? <SearchBarContainer
              className={'landing'} 
				    	 queryType={this.state.queryType} 
		           placeholder={this.state.placeholder}
				    />: ''
		    		} 
				  </div>
			  </div>
			  <div className='row'>
			  	<div className="modal fade" tabindex="-1" id='resultModal' role="dialog">
		        <div className="modal-dialog" role="document">
		          <div className="modal-content">
		            <div className="modal-header">
		            	{modalText}
		              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.clearResults}><span aria-hidden="true">&times;</span></button>
		            	
		            </div>
		            <div className="modal-body">
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
		            <div className='modal-footer'> 
		            	<Link to='/signup' className='btn btn-primary'> View all results</Link>
		            	<a href='#' className='btn btn-warning' onClick={this.clearResults}> Clear Results </a>
		            </div>
		          </div>
		        </div>
		      </div>
		    </div>
			  
		  </div>

		)
	}
}

export default connect(state => {
  return {
    results: state.queryResults,
    query: state.queries,
    activeQuery: state.activeQuery
  }
})(LandingComponent)
