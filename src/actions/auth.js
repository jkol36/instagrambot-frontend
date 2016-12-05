import { userRef } from 'config'
import * as C from 'constants'

export const saveUserInStore = (user) =>  ({
  type: C.SAVE_USER_IN_STORE,
  user
})
export const loginSuccess = (uid) => ({
    type: C.LOGIN_SUCCESS,
    uid
})

export const fetchUser = (uid) => dispatch => {
  console.log('fetch user called', uid)
  return new Promise((resolve, reject) => {
    userRef.child(uid).once('value', s => {
      if(s.exists()) {
        dispatch(saveUserInStore(s.val()))
        userRef.child(uid).on('child_changed', s => {
          dispatch(userChanged(s.key, s.val()))
        })
        resolve(uid)
      }
      else {
        console.log('user does not exist')
        dispatch(loginError('user does not exist'))
        reject({message:'user does not exist'})
      }
    })
  })
}

export const newUser = (data) => dispatch => {
  return userRef.child(data.uid).set(data)
}
const loginError = (error) => ({
  type: C.LOGIN_ERROR,
  error
})

const initialUser = (user) => ({
  type: C.INITIAL_USER,
  user
})

const userChanged = (key, value) => ({
  type: C.USER_CHANGED,
  key,
  value
})
