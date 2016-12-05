import {connect} from 'react-redux'
import React from 'react'
import {pathNameToIcon} from '../helpers'


const BreadCrumb = (props) => {
  console.log('yoooo', props)
  return (
    <div className='page-breadcrumbs'>
      <ul className='breadcrumb'> 
        <li>
          <i className={pathNameToIcon(props.routing.location.pathname.split('/')[1])}/>
          <a href='#' className='active'>{props.routing.location.pathname.split('/')[1]}</a>
        </li>
      </ul>
    </div>
  )
}

export default connect(state => state)(BreadCrumb)