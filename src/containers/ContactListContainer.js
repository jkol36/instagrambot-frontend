import { contactListRef } from 'config'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import { createContactList, fetchContactLists } from 'actions/contactList'
import ContactListComponent from 'components/ContactListComponent'
import ReactTooltip from 'react-tooltip'
import AddContactList from 'components/AddContactList'
import Widget from 'components/Widget'
import 'css/contactList.less'

class ContactListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listName:'',
      error:null,
      message: null,
      contactLists: []
    }
    this.handleListNameChange = this.handleListNameChange.bind(this)
    this.addContactToList = this.addContactToList.bind(this)
    this.saveList = this.saveList.bind(this)

  }
  addContactToList(listId) {

  }
  handleListNameChange(e) {
    this.setState({
      listName:e.target.value
    })
  }
  componentDidMount() {
    const {dispatch, auth } = this.props
    dispatch(fetchContactLists(auth.user.uid))
    .then(contactLists => this.setState({
      contactLists
    }))
    contactListRef.child(auth.user.uid).on('child_added', snap => {
      this.setState({
        contactLists: [...this.state.contactLists, snap.val()]
      })
    })
  }
  
  saveList() {
    const { dispatch, auth } = this.props
    if(this.state.listName.length > 3) {
      dispatch(createContactList({name:this.state.listName},auth.user.uid))
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
    let contactListNodes = []
    if(this.state.contactLists) {
      contactListNodes = this.state.contactLists.map(contactList => {
        return (
          <div className='col-md-6'>
            <ReactTooltip />
            <Widget title={contactList.name} widgetHeaderButtons={[{icon:'ion ion-person-add', dataTip:`add contact to ${contactList.name}`, onClick:() => this.addContactToList(contactList.id)}]}  color='green' key={contactList.id} caption={contactList.name}> 
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

export default connect(state => state)(ContactListContainer)