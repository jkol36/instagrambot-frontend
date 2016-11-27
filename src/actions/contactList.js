import { contactListRef } from 'config'
import { CONTACT_LIST_ADDED, INITIAL_CONTACT_LISTS_FETCHED } from 'constants'

export const createContactList = (list, userId) => dispatch => {
  return new Promise((resolve, reject) => {
    contactListRef.child(userId).push(list, () => {
      dispatch({
        type:CONTACT_LIST_ADDED,
        list
      })
      resolve(list)
    })
  })
}

export const fetchContactLists = (userId) => dispatch => {
  return new Promise((resolve, reject) => {
    contactListRef.child(userId).once('value', snap => {
      let contactLists = Object.keys(snap.val()).map(k => Object.assign({},snap.val()[k], {id:k}))
      console.log(contactLists)
      dispatch({
        type: INITIAL_CONTACT_LISTS_FETCHED,
        contactLists
      })
      resolve(contactLists)

    })
  })
}