import firebase from 'firebase'
firebase.initializeApp({
		databaseURL: 'https://igbot-dc02d.firebaseio.com//',
		apiKey:'LFqE853MBVW4YepTyKVZ3lr3sbxXpVUvWzjTJ7Lf'
})
global.Promise = require('bluebird')
export const queryRef = firebase.database().ref('igbot/queries')
export const influencerRef = firebase.database().ref('igbot/influencers')
export const hashtagRef = firebase.database().ref('igbot/hashtags')
export const userSessionRef = firebase.database().ref('igbot/userSessions')