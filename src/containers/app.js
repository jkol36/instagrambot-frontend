import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navbar } from 'components/Navbar'
import 'css/app.less'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='container'>
        <div className='header-clearfix'>
          <Navbar navLinks={[{'text':'pricing', 'href':'#'}, {'text':'help', 'href':'#'}]} />
        </div>
        <div className='page-wrapper'>
          { React.cloneElement(this.props.children, {store: this.props.store}) }
        </div>
    </div>
    )
  }
}

export default connect(state => state)(App)
