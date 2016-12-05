import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from 'components/Navbar'
import Sidebar from 'components/Sidebar'
import PageHeader from 'components/PageHeader'
import BreadCrumb from 'components/BreadCrumb'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRoute:0,
      loading:true
    }
  }
  //fetch all user queries
  //fetch all user contacts

  render() {
    //let navLinks = [{href:'/search', text:'Search', icon:'fa fa-search'}, {href:'/contact-lists', text:'contact lists', icon:'fa fa-address-book'}]
    return (
      <div>
        <Navbar />
        <div className="main-container container-fluid">
          <div className="page-container">
            <Sidebar />
            <div className='page-content'>
              <BreadCrumb />
              <PageHeader title={this.props.location.pathname.split('/')[1]} />
            <div className='page-body'>
              {React.cloneElement(this.props.children, {store:this.props.store, user:this.props.auth})}
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default connect(state => state)(App)