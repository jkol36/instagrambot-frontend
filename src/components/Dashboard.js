import { connect } from 'react-redux';
import React, { Component } from 'react';
import { queryRef, hashtagRef, influencerRef } from 'config'
import { Widget } from './Widget';
import { createUserSession } from 'actions/user'
import SearchContainer  from './SearchContainer';
import { EmailComponent } from './EmailComponent';

class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      queryType: null
    }
    this.onSearch = this.onSearch.bind(this)

  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(createUserSession())
    .then(sessionId => {
      this.setState({
        sessionId
      })
    })
  }
  onSearch(query) {
    console.log('on search called with', query)
    return
    let { queryType } = this.state
    let newQueryRef = queryRef.push()
    newQueryRef.set({
      query: {
        type: queryType,
        query,
        id: newQueryRef.key,
        sessionId: this.state.sessionId,
        status: 'needs love'
      }
    })
    this.setState({
      queryId: newQueryRef.key
    })
    switch(queryType) {
      case 'influencer':
        influencerRef.child(newQueryRef.key).on('child_changed', snap => {
          this.setState({
            result: Object.assign({}, this.state.result, {[snap.key]:snap.val()})
          })
        })
      case 'hashtag':
        hashtagRef.child(newQueryRef.key).on('child_added', snap => {
          this.setState({
            result: Object.assign({}, this.state.result, {[snap.key]: snap.val()})
          })
        })
        hashtagRef.child(newQueryRef.key).on('child_changed', snap => {
          this.setState({
            result: Object.assign({}, this.state.result, {[snap.key]: snap.val()})
          })
        })
    }
  }
  

  render() {
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
              {description:'profiles searched', number:this.props.profilesParsed ? this.props.profilesParsed: this.props.followersParsed}, 
              {description: 'emails found', number:this.props.emailsFound},
              this.props.followersCount ? {description: 'Follower Count', number: this.props.followersCount.count}:{}
              ]} title='Result Summary'/>
          </div>
          <div className='col-md-4'>
            <Widget stats={[{description:'Bot is currently', number:this.props.status}]} title={'Query Status For ' +this.state.query}/>
          </div>
        </div> 
        <div className='row table'> 
          <EmailComponent result={this.props.emails} activePage={this.state.activePage} itemCountPerPage={this.state.itemsCountPerPage} />
          
        </div>
      </div>

    )
  }
}

export default connect(state => {
  return {
    userSession: state.userSession,
    profilesParsed: state.profilesParsed,
    emailsFound: state.emailsFound,
    emails: state.emails,
    followersCount: state.followersCount,
    followersParsed: state.followersParsed
  }
})(Dashboard)


