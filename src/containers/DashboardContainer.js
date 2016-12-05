import React from 'react'

const DashboardHeader = (props) => {
  return (
    <div className='box-header'> 
      <div className='deadline'> 
        testing
      </div>
    </div>
  )
}
const Dashboard = (props) => {
  return (
    <div className='col-lg-9 col-md-9 col-sm-12 col-xs-12'> 
      <div className='row'> 
        <div className='col-xs-12'> 
          <div className='dashboard-box'> 
            <DashboardHeader {...props} />
          </div>
        </div>
      </div>
    </div>
  )
}