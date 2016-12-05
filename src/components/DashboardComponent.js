import React from 'react'
import Widget from 'components/Widget'

const DashboardComponent = (props) => {
  return (
      <Widget 
        title={'my first widget'}
        widgetHeaderButtons={[]}
        icon='bath'
        color='blue'
        caption='hopefully this works'/>

  )
}
export default DashboardComponent