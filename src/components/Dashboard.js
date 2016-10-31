import firebase from 'firebase'
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { getInitialHashtags, listenForHashtagChanges } from 'actions/hashtags'
import { getInitialInfluencers, listenForInfluencerChanges } from 'actions/influencers'
import { addWork } from 'actions/work'
import { Widget } from './Widget'
import { SearchComponent }  from './searchComponent';
//import { StatComponent } from './StatComponent';
//import { EmailComponent } from './EmailComponent';

//import ExportComponent  from './ExportComponent';

class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      message: null,
      query: '',
      result: {},
      queryType: null,
      placeholderText: null
    }
    this.onSearch = this.onSearch.bind(this);
    this.removeMessage = this.removeMessage.bind(this);
    this.onQueryChanged = this.onQueryChanged.bind(this);
    this.setMessage = this.setMessage.bind(this);

  }


  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getInitialHashtags())
    dispatch(getInitialInfluencers())
    dispatch(listenForHashtagChanges())
    dispatch(listenForInfluencerChanges())
    
  }

  removeMessage() {
    this.setState({
      message: ''
    })
  }
  setMessage(message) {
    this.setState({
      message
    })
  }

  onSearch(e) {
    console.log(this.state)
    const {dispatch} = this.props
    e.preventDefault();
    if(this.state.queryType === 'influencer') {
      console.log('true')
      let query
      let influencerInState
      query = this.state.query.split('#')[1] === undefined ? this.state.query: this.state.query.split('#')[1]
      influencerInState = this.props.influencers[query] ? this.props.influencers[query]: null
      if(influencerInState) {
        this.setState({
          result: influencerInState,
        })
      }
      dispatch(addWork({type:'influencers', query}))
      firebase.database().ref('igbot').child('influencers').on('child_changed', s => {
      if(s.key === this.state.query) {
          this.setState({
            result: s.val()
          })
        }
      })
    }
    else if(this.state.queryType === 'hashtag') {
      console.log('true')
      let query
      let hashtagInState
      console.log('query', this.state.query)
      query = this.state.query.split('#')[1] === undefined ? this.state.query: this.state.query.split('#')[1]
      console.log('yooo',this.props.hashtags[query])
      hashtagInState = this.props.hashtags[query] ? this.props.hashtags[query]: null
      dispatch(addWork({type:'hashtags', query}))
      firebase.database().ref('igbot').child('hashtags').on('child_changed', s => {
        if(s.key === this.state.query) {
          this.setState({
            result: s.val()
          })
        }
      })
      if(hashtagInState) {
        this.setState({
          result: hashtagInState,
        })
      }
    }
  }

  onQueryChanged(e) {
    if(this.state.query.length === 0 || this.state.query.length === 1) {
      this.setState({result:{}, query:null})
    }
    this.setState({
      query: e.target.value
    })
  }

  render() {
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
              <SearchComponent slug={this.state.slug} onSearch={this.onSearch} onQueryChanged={this.onQueryChanged} placeholder={this.state.placeholderText} />: null
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
      </div>

    )
  }
}

export default connect(state => {
  return {
    hashtags: state.hashtags,
    influencers: state.influencers
  }
})(Dashboard)

