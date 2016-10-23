import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../css/email.less'
export default class TestTransition extends Component {
		render() {
		  return (
		    <ReactCSSTransitionGroup
		      transitionName="example"
		      transitionAppear={true}
		      transitionAppearTimeout={500}>
		      <h1>Fading at Initial Mount</h1>
		      <h1>Fading at Initial Mount</h1>
		      <h1>Fading at Initial Mount</h1>
		      <h1>Fading at Initial Mount</h1>
		    </ReactCSSTransitionGroup>
		  );
	}
}