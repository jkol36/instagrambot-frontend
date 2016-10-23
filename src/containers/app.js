import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/app.less'

class App extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <div className='container-fluid'>
        { React.cloneElement(this.props.children) }
    </div>
    )
  }
}

export default connect(state => state)(App)
