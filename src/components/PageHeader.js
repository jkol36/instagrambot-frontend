import React, { PropTypes } from 'react'


const PageHeader = (props) => {
  return (
    <div className='page-header position-relative'> 
      <div className='header-title'>
        <h1>{props.title} </h1>
      </div>
      <div className='header-buttons'> 

      </div>
    </div>
  )
}

PageHeader.propTypes = {
  title: PropTypes.string,
  headerButtons: PropTypes.array
}

export default PageHeader