import {
  INITIAL_CONTACT_LISTS_FETCHED,
  CONTACT_LIST_ADDED
} from 'constants'


export const contactLists = (state=[], action) => {
  switch(action.type) {
    case INITIAL_CONTACT_LISTS_FETCHED:
      return action.contactLists
    case CONTACT_LIST_ADDED:
      let newState = [...state, action.contactList]
      return newState
    default:
      return state
  }
}