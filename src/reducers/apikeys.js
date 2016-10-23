import { API_KEYS_RECIEVED } from 'actions/apikeys'

export default function apikeys(state={}, action) {
  switch(action.type) {
    case API_KEYS_RECIEVED:
      return action.apikeys
    default:
      return state
  }
}
