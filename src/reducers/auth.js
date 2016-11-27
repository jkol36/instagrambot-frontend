import * as C from 'constants'

const initialState = {
  uid: null,
  user: null,
  loading: false,
  error: null
}

export const auth = (state=initialState, action) => {
  switch(action.type) {
    case C.LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      }
    case C.LOGIN_SUCCESS:
      return {
        ...initialState,
        uid: action.uid
      }
    case C.LOGIN_ERROR:
      return {
        ...initialState,
        error: action.error
      }
    case C.INITIAL_USER:
      return {
        ...state,
        loading: false,
        error: null,
        user: user(state.user, action)
      }
    case C.USER_CHANGED:
      return {
        ...state,
        user: user(state.user, action)
      }
    default:
      return state
  }
}

const user = (state=null, action) => {
  switch(action.type) {
    case C.INITIAL_USER:
      return { ...action.user }
    case C.USER_CHANGED:
      const newState = { ...state }
      newstate[key] = action.value
      return newState
    default:
      return state
  }
}

