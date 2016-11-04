import 'css/pagination.less'
import Pagination from 'react-js-pagination'
import { queryRef, hashtagRef, influencerRef } from 'config'
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Widget } from './Widget';
import { createUserSession } from 'actions/user'
//import { listenForQueryResults } from 'actions/queryResults'
import SearchContainer  from './SearchComponent';
//import { StatComponent } from './StatComponent';
import { EmailComponent } from './EmailComponent';

//import ExportComponent  from './ExportComponent';

class Dashboard extends Component {

  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      query: '',
      lastQuery: null,
      result: {},
      sessionId: null,
      queryId: null,
      queryType: null,
      placeholderText: null,
      activePage: 1,
      itemsCountPerPage: 5
    }
    this.onSearch = this.onSearch.bind(this);
    this.onQueryChanged = this.onQueryChanged.bind(this);
    this.changePage = this.changePage.bind(this)

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
    console.log('on search called', query)
    const { queryType } = this.state
    let newQuery = queryRef.push()
    newQuery.set({
      query: {
        type: queryType,
        query,
        id: newQuery.key,
        sessionId: this.state.sessionId,
        status: 'needs love'
      }
    })
    this.setState({
      queryId: newQuery.key
    })
    switch(queryType) {
      case 'influencer':
        influencerRef.child(newQuery.key).on('child_changed', snap => {
          this.setState({
            result: Object.assign({}, this.state.result, {[snap.key]:snap.val()})
          })
        })
      case 'hashtag':
        hashtagRef.child(newQuery.key).on('child_added', snap => {
          this.setState({
            result: Object.assign({}, this.state.result, {[snap.key]: snap.val()})
          })
        })
        hashtagRef.child(newQuery.key).on('child_changed', snap => {
          this.setState({
            result: Object.assign({}, this.state.result, {[snap.key]: snap.val()})
          })
        })
    }

  }

  onQueryChanged(input) {
    console.log(input)
    if(input.length === 0 && this.state.queryId || input.length === 1 && this.state.queryId) {
      switch(this.state.queryType) {
        case 'influencer':
          influencerRef.child(this.state.queryId).off()
        case 'hashtag':
          hashtagRef.child(this.state.queryId).off()
      }
      this.setState({
        result: {},
        queryId: null,
        queryType: null,
      })
    }
  }

  changePage(pageNumber) {
    console.log('changePage called', pageNumber)
    this.setState({
      activePage: pageNumber
    })
  }

  render() {
    let emailCount = 0
    this.state.result.emails ? Object.keys(this.state.result.emails).map(k => {
      if(this.state.result.emails[k]) {
        emailCount +=1
      }
    }):null

    return (
      <div>
        <div className='jumbotron row'>
          <h1 className='display-3 '> Find Emails on Instagram </h1>
          <p className='lead'> Try it now with any <span></span> 
          <span> 
            <button onClick={() => this.setState({
              placeholderText:'#startups',
              slug: 'type in a hashtag',
              queryType: 'hashtag'
            })} className='btn btn-success'> Hashtag</button>
          </span>
          <span> or </span>
          <span>
            <button onClick={() => this.setState({
              placeholderText: 'garyv',
              slug: 'type in a influencer',
              queryType: 'influencer'
            })} className='btn btn-warning'> Influencer</button> 
          </span></p>
            {this.state.queryType ? 
              <SearchContainer slug={this.state.slug} onQueryChanged={this.onQueryChanged} onSearch={this.onSearch} />: null
            }
        </div>
        <div className='row stats'>
          <div className='col-md-4'> 
            <Widget stats={[
              {description:'profiles searched', number:this.state.result.profilesParsed ? this.state.result.profilesParsed: this.state.result.followersParsed }, 
              {description: 'emails found', number:this.state.result.emails_found},
              this.state.result.followersCount ? {description: 'Follower Count', number: this.state.result.followersCount.count}:{}
              ]} title='Result Summary'/>
          </div>
          <div className='col-md-4'>
            <Widget stats={[{description:'Bot is currently', number:this.state.result.status}]} title={'Query Status For ' +this.state.query}/>
          </div>
        </div> 
        <div className='row table'> 
          <EmailComponent result={this.state.result} activePage={this.state.activePage} itemCountPerPage={this.state.itemsCountPerPage} />
          <Pagination
          activeClass='active' 
          activePage={this.state.activePage} 
          itemsCountPerPage={10} 
          totalItemsCount={emailCount} 
          pageRangeDisplayed={5}
          onChange={this.changePage}
          />
        </div>
      </div>

    )
  }
}

export default connect(state => {
  return {
    userSession: state.userSession
  }
})(Dashboard)


