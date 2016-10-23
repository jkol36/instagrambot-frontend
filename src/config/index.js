import firebase from 'firebase'
firebase.initializeApp({
		databaseURL: 'https://igbot-dc02d.firebaseio.com//',
		apiKey:'LFqE853MBVW4YepTyKVZ3lr3sbxXpVUvWzjTJ7Lf'
})
export const hashtagRef = firebase.database().ref('hashtags')
export const queryRef = firebase.database().ref('work-to-do')