import React, { Component } from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import { fetchUser, loginSuccess } from 'actions/auth'
import LoadingComponent from 'components/LoadingComponent'
import { createAnonymousUserSession } from 'actions/anonymousUser'
import firebase from 'firebase'

class _AuthContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    console.log('auth container mounting')
    console.log(this.props)
  }

  componentDidMount() {
    console.log('mounted')
    let loggedIn = false
    firebase.auth().onAuthStateChanged((data) => {
      console.log('called', loggedIn)
      const { dispatch, location: { pathname }} = this.props
      if (data) {
        if (loggedIn)
          return
        dispatch(loginSuccess(data.uid))
        dispatch(fetchUser(data.uid))
          .then(() => {
            if (pathname === '/signin' || pathname === '/signup' || pathname === '/landing') {
              dispatch(routeActions.push('/search'))
            }
            this.setState({loading: false})
            loggedIn = true
          })
      } else {
        dispatch(createAnonymousUserSession())
        if (pathname !== '/signin' && pathname !== '/signup') {
          dispatch(routeActions.push('/landing'))
          this.setState({loading: false})
        }
        this.setState({
          loading:false
        })
      }
    })
  }

  render() {
    if(this.state.loading) {
      return (<LoadingComponent />)
    }
    return (
      <div className='container-fluid'>
        { React.cloneElement(this.props.children, {store: this.props.store}) }
      </div>
    )
  }
}

export default connect(state => state)(_AuthContainer)
