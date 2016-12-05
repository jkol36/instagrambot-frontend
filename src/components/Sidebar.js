import React from 'react'
import { Link } from 'react-router'


const Sidebar = (props) => {
  return (
    <div className='page-sidebar' id='sidebar'> 
      <ul className='nav sidebar-menu'> 
        <li><Link to='/search'> <i className='menu-icon fa fa-search'></i> Search </Link> </li>
        <li><Link to='/contact-lists'> <i className='menu-icon fa fa-user'></i> Contact Lists </Link> </li>
      </ul>
    </div>
  )
}

export default Sidebar