import React, { Component } from 'react'
import { connect } from 'react-redux'
import { routeActions, replace } from 'react-router-redux'
import { fetchUser, saveUserInStore, loginSuccess } from 'actions/auth'
import LoadingComponent from 'components/LoadingComponent'
import { createAnonymousUserSession } from 'actions/anonymousUser'
import firebase from 'firebase'

class _AuthContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
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
    if(this.state.loading && !this.props.auth.user && this.props.location.pathname != 'signup' && this.props.location.pathname != 'signin') {
      console.log('loading')
      return <LoadingComponent />
    }
    return (
      <div id='content'>
        <LoadingComponent />
        { React.cloneElement(this.props.children, {store: this.props.store, user:this.props.auth.user},) }
      </div>
    )
  }
}

export default connect(state => state)(_AuthContainer)
