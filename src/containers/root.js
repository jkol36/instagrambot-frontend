import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

class Root extends Component {


  get content () {
    return (
      <Router history={this.props.history} store={this.props.store}>
        { this.props.routes }
      </Router>
    )
  }

  get devTools () {
    if (process.env.NODE_ENV !== 'production') {
      if (window.devToolsExtension) {
        window.devToolsExtension.open()
      } else {
        const DevTools = require('containers/DevTools').default
        return <DevTools />
      }
    }
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <div style={{ height: '100%' }}>
          {this.content}
        </div>
      </Provider>
    )
  }
}

Root.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}

export default Root
