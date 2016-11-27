import React, { Component } from 'react'

const AddContactList = (props) => {
  console.log('add contact list component mounting')
  let errorComponent = null
  let messageComponent = null
  if(props.error) {
    errorComponent = <div className='alert alert-danger'><i onClick={props.dismissError} className='ion-close-circled'></i>{props.error}</div>
  }
  else if(props.message) {
   messageComponent = <div className='alert alert-success'><i onClick={props.dismissMessage} className='ion-close-circled'></i>{props.message}</div>

  }
  return (
    <div className="modal fade" id='newContactList'>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          {errorComponent}
          {messageComponent}
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 className="modal-title">{props.listName}</h4>
          </div>
          <div className="modal-body">
            <div className='form-group row'> 
              <label for='contact-list-name' className='col-xs-2 col-form-label'>
                List Name
              </label>
              <div className="col-xs-10">
                <input placeholder='All of Gary Vees Followers' className="form-control" onChange={props.handleListNameChange} type="text" value={props.listName} id="contact-list-name"/>
              </div>
            </div>
            
          </div>
          <div className="modal-footer">
            <button type="button" onClick={props.saveList} className="btn btn-primary">Save List</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddContactList