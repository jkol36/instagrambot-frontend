import { contactListRef } from 'config'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import 'css/app.less'
import 'css/contactList.less'
import { createContactList, fetchContactLists } from 'actions/contactList'
import ContactListComponent from 'components/ContactListComponent'
import ReactTooltip from 'react-tooltip'
import AddContactList from 'components/AddContactList'
import Widget from 'components/Widget'

class ContactListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listName:'',
      error:null,
      message: null,
      contactLists: null
    }
    this.handleListNameChange = this.handleListNameChange.bind(this)
    this.saveList = this.saveList.bind(this)
  }
  handleListNameChange(e) {
    this.setState({
      listName:e.target.value
    })
  }
  componentWillMount() {
    const { dispatch, userId } = this.props
    dispatch(fetchContactLists(userId)).then((contactLists) => {
      console.log('got contact lists', contactLists)
      this.setState({
        contactLists
      })
    })
    contactListRef.child(userId).on('child_added', snap => {
      this.setState({
        contactLists: [...this.state.contactLists, snap.val()]
      })
    })

  }
  saveList() {
    const { dispatch, userId } = this.props
    if(this.state.listName.length > 3) {
      dispatch(createContactList({name:this.state.listName},userId))
      .then(() => {
        this.setState({
          message: 'List added!'
        })
      })
    }
    else {
      this.setState({
        error: 'Your list name must be more than 3 letters'
      })
    }
  }
  render() {
    console.log(this.state)
    let contactListNodes = []
    if(this.state.contactLists) {
      contactListNodes = this.state.contactLists.map(contactList => {
        return (
          <div className='col-md-6 contactListNode'>
            <Widget title={contactList.name} key={contactList.id} texts={[{label:'Members', value:contactList.members ? contactList.members: 0}]}> 
              <div className='card-header'>
                <div className='text-lg-right'>
                  <i className='ion-person-add' data-tip={`add contacts to ${contactList.name}`}></i> 
                </div>
              </div>
            </Widget>
          </div>
        )
      })
    }
    return (
      <div id='contactListContainer'>
        <ReactTooltip />
        <i id='addContactList' data-toggle='modal' data-target='#newContactList' data-tip='Add a new list' className='ion-plus-circled clearfix'> </i>
          {contactListNodes}
          <AddContactList 
            listName={this.state.listName}
            handleListNameChange={this.handleListNameChange}
            error={this.state.error}
            saveList={this.saveList}
            dismissError={() => this.setState({
              error:null
            })}
            message={this.state.message}
            dismissMessage={() => this.setState({message:null})}

          />
      </div>
    )
  }
}

export default connect(state => {
  return {
    userId: state.auth.user.uid
  }
})(ContactListContainer)