import firebase from 'firebase'
firebase.initializeApp({
		databaseURL: 'https://igbot-dc02d.firebaseio.com//',
		apiKey:'LFqE853MBVW4YepTyKVZ3lr3sbxXpVUvWzjTJ7Lf'
})

export const influencerRef = firebase.database().ref().child('igbot').child('influencers')
export const hashtagRef = firebase.database().ref().child('igbot').child('hashtags')
export const workRef = firebase.database().ref('igbot/work')