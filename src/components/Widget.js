import React, {PropTypes} from 'react';
import 'css/widget.less'

const Widget = (props) => (
  <div className='card'> 
    <div className='card card-block'>
      <h4 className='card-title'> {props.title} </h4>
      {props.texts.map(text => {
        return <p className='card-text'> <span className='label'>{text.label}</span>: <span className='value'>{text.value}</span></p>
      })}
      {props.children}
    </div>
  </div>
)

Widget.propTypes = {
  title: PropTypes.element,
  texts: PropTypes.array,
  label: PropTypes.string,
  value: PropTypes.string
}

export default Widget