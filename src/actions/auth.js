import { userRef } from 'config'
import * as C from 'constants'

export const loginSuccess = (uid) => ({
    type: C.LOGIN_SUCCESS,
    uid
})

export const fetchUser = (uid) => dispatch => {
  return userRef.child(uid).once('value')
    .then(snap => {
      const user = snap.val()
      dispatch(initialUser(user))
      userRef.child(uid).on('child_changed', s => {
        dispatch(userChanged(s.key, s.val()))
      })
    }).catch(err => {
      dispatch(loginError(err))
    })
}

export const newUser = (data) => {
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
