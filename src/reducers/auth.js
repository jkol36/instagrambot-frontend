import {
  SIGNUP_ERROR, SIGNUP_REQUEST, SIGNUP_SUCCESS,
  LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_REQUEST,
  USER_UPDATED, LOGGED_OUT,
} from 'actions/auth'

function auth(state = {
  user: {},
  error: null,
  loading: false,
}, action) {
  switch(action.type) {
    case SIGNUP_REQUEST:
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        user: {},
        error: null,
        loading: true
      })
    case SIGNUP_ERROR:
    case LOGIN_ERROR:
      return Object.assign({}, state, {
        user: {},
        error: action.error,
        loading: false
      })
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        error: null,
        loading: false
      })
    case USER_UPDATED:
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, action.user)
      })
    case LOGGED_OUT:
      return {
        user: {},
        error: null,
        loading: false
      }
    
    default:
      return state
  }
}

export default auth
