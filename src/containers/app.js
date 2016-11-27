import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from 'components/Navbar'
import 'css/app.less'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRoute:0,
      loading:true
    }
    this.handleNavLinkChange = this.handleNavLinkChange.bind(this)
  }
  componentWillMount() {
    console.log('app.js will mount')
  }
  componentDidMount() {
    console.log('app.js mounted')
  }
  handleNavLinkChange(selectedRoute) {
    this.setState({
      selectedRoute
    })

  }

  render() {
    let navLinks = [{href:'/search', text:'Search', icon:'fa fa-search'}, {href:'/contact-lists', text:'contact lists', icon:'fa fa-address-book'}]
    return (
      <div id='page-wrapper'>
        <Navbar navLinks={navLinks} user={this.props.auth.user} selected={this.state.selectedRoute} handleNavLinkChange={this.handleNavLinkChange} />
        <div id='content-wrapper'>
          <div className='content'>
            {React.cloneElement(this.props.children, {store:this.props.store})}
          </div>
        </div>

      </div>

    )
  }
}

export default connect(state => state)(App)