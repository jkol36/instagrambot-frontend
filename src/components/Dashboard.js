import firebase from 'firebase';
import React, { Component } from 'react';
import '../css/dashboard.less';
import { SearchComponent }  from './searchComponent';
import { StatComponent } from './StatComponent';
import { EmailComponent } from './EmailComponent';

export default class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      hashtags:null,
      message: null,
      query: '',
      result: {}
    }
    this.onSearch = this.onSearch.bind(this);
    this.removeMessage = this.removeMessage.bind(this);
    this.onQueryChanged = this.onQueryChanged.bind(this);

  }


  componentDidMount() {
    firebase.database().ref('igbot').child('hashtags').once('value', snap => {
      if(snap.exists()) {
        this.setState({
          hashtags: snap.val()
        })
      }
    })
    firebase.database().ref('igbot').child('hashtags').on('child_added', snap => {
      if(snap.key === this.state.query){
        this.setState({
          result: snap.val(),
          loading:false,
        })
      }
    })
    firebase.database().ref('igbot').child('hashtags').on('child_changed', snap => {
      if(snap.key === this.state.query){
        this.setState({
          result: snap.val(),
          loading: false
        })
      }
    })
    
  }

  removeMessage() {
    this.setState({
      message: ''
    })
  }

  onSearch() {
    let hashtagKeys = Object.keys(this.state.hashtags)
    let hashtagInState = hashtagKeys.indexOf(this.state.query.split('#')[1]) != -1 ? this.state.hashtags[this.state.query.split('#')[1]]: null
    if(hashtagInState) {
      this.setState({
        result: hashtagInState,
      })
    }
    firebase.database().ref('igbot').child('work-to-do').push({hashtag:this.state.query.split('#')[1]}, () => console.log('pushed to firebase'))
  }

  onQueryChanged(query) {
    if(this.state.query.length === 0 || this.state.query.length === 1) {
      this.setState({result:{}, query:null})
    }
    this.setState({
      query
    })
  }

  render() {
    return (
      <div className='container-fluid'>
        <div className='page-wrapper'>
          <div className='row'>
            <div className='col-md-6'>
              <div className='jumbotron green' id='searchbox'>
                <h1> Find emails on Instagram </h1>
                <p className='text-muted'> Enter any hashtag to begin </p>
                <SearchComponent onSearch={ this.onSearch } onQueryChanged={ this.onQueryChanged } />
              </div>
            </div>
            <div className='col-md-6'> 
              <StatComponent 
              emails_found = { !this.state.result.emails_found ? 0: this.state.result.emails_found }  
              profiles_parsed = { !this.state.result.profiles_parsed ? 0: this.state.result.profiles_parsed}
              />
            </div>
            <div className='row'>
              <div className='col-md-12'>
                <EmailComponent result = { this.state.result } />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}



