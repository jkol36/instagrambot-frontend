import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Widget } from './Widget';
import { createUserSession } from 'actions/user'
import SearchContainer  from './SearchContainer';
import { EmailComponent } from './EmailComponent';

class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      queryType: null,
    }
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(createUserSession())
    setInterval(() => this.forceUpdate(), 1000)
  }

  render() {
    let result = null
    let query = 'nothing'
    if(Object.keys(this.props.queryResults).map(k => this.props.queryResults[k])[0]) {
      result = Object.keys(this.props.queryResults).map(k => this.props.queryResults[k])[0]
      query = result.hashtag.query
    }
    return (
      <div>
        <div className='jumbotron row'>
          <h1 className='display-3 '> Find Emails on Instagram </h1>
          <p className='lead'> Try it now with any <span></span> 
          <span> 
            <button onClick={() => this.setState({
              placeholder:'type in a hashtag',
              queryType: 'hashtag'
            })} className='btn btn-success'> Hashtag</button>
          </span>
          <span> or </span>
          <span>
            <button onClick={() => this.setState({
              placeholder: 'Type in an Influencer',
              queryType: 'influencer'
            })} className='btn btn-warning'> Influencer</button> 
          </span></p>
            {this.state.queryType ? 
              <SearchContainer 
              queryType={this.state.queryType} 
              placeholder={this.state.placeholder}
              onSearch={this.onSearch}
               />: null
            }
        </div>
        <div className='row stats'>
          <div className='col-md-4'> 
            <Widget stats={[
              {description:'profiles searched', number:result ? result.profilesParsed: 0}, 
              {description: 'emails found', number:result ? result.emails_found: 0},
              this.props.followersCount ? {description: 'Follower Count', number:0}:{}
              ]} title='result Summary'/>
          </div>
          <div className='col-md-4'>
            <Widget stats={[{description:'Bot is currently', number:result ? result.status: 'not running'}]} title={'Query Status For ' + query}/>
          </div>
        </div> 
        <EmailComponent result={result ? result: {}} activePage={this.state.activePage} itemCountPerPage={this.state.itemsCountPerPage} />
      </div>

    )
  }
}

export default connect(state => {
  return {
    userSession: state.userSession,
    query: state.queries,
    queryResults: state.queryResults,
  }
})(Dashboard)


