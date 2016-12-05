import React, { Component } from 'react'
import { connect } from 'react-redux'


class LandingComponent extends Component {
	constructor(props) {
		super(props)
  }

  componentWillMount() {
  	const {location} = this.props
    window.location.replace('http://localhost:8000')
  }
}

export default connect(state => state)(LandingComponent)