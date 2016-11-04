import { firebaseRef } from 'config'
import { routeActions } from 'react-router-redux'
export const SIGNUP_ERROR = 'SIGNUP_ERROR'
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGGED_OUT = 'LOGGED_OUT'
export const USER_UPDATED = 'USER_UPDATED'



function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error
  }
}

export function loginRequest() {
  return {
    type: LOGIN_REQUEST
  }
}

export function loginSuccess() {
  return dispatch => {
    dispatch({
      type: LOGIN_SUCCESS
    })
    dispatch(routeActions.push('/me'))
  }
}

export function userUpdated(user) {
  return {
    type: USER_UPDATED,
    user
  }
}

export function changeUser(id, changes) {
  return () => {
    firebaseRef.child('users').child(id).update(changes)
  }
}

function signupError(error) {
  return {
    type: SIGNUP_ERROR,
    error
  }
}

function signupRequest() {
  return {
    type: SIGNUP_REQUEST
  }
}

function signupSuccess() {
  return dispatch => {
    dispatch({
      type: SIGNUP_SUCCESS
    })
    dispatch(routeActions.push('/me'))
  }
}
export function signup(data) {
  const { email } = data
  return dispatch => {
    dispatch(signupRequest())
    firebaseRef.createUser(data, (error) => {
      if (!!error) {
        dispatch(signupError(error.message))
      } else {
        firebaseRef.authWithPassword(data, (error, data) => {
          if (!!error) {
            dispatch(signupError(error.message))
          } else {
            let userObject = {
              email,
              createdAt: Date.now(),
              verified: false,
              permissionLevel: 0,
              currency: 'USD'
            }
            firebaseRef.child('users').child(data.uid).set(userObject)
            let ref = firebaseRef.child('apikeys').child(data.uid)
            ref.set({
              mailgunApiKey: '',
              closeioApiKey: ''
            })
            dispatch(signupSuccess())
          }
        })
      }
    })
  }
}


export function login(data) {
  return dispatch => {
    dispatch(loginRequest())
    firebaseRef.authWithPassword(data, (error) => {
      if (error) {
        dispatch(loginError(error.message))
      } else {
        dispatch(loginSuccess())
      }
    })
  }
}

export function loggedOut() {
  return {
    type: LOGGED_OUT
  }
}

export function logout() {
  console.log('called')
  return dispatch => {
    firebaseRef.unauth()
    dispatch(routeActions.push('/login'))

  }
}
