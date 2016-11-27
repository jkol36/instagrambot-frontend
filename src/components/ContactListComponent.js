import React from 'react'


const ContactListComponent = (props) => {
  return (
    <div className='card'> 
      {props.name}
      {props.members}
    </div>
  )
}
export default ContactListComponent