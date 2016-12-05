import React, { PropTypes } from 'react';
import 'css/stats.less'

const StatComponent = (props) => {
	const {profiles_parsed} = props
	return (
    <div className='stat-container'>
  		<div className='stats-col'>
        <div className={`stats-value ${props.color}`}>{props.value}</div>
        <div className='stats-title'> {props.title}</div>
  		</div>
    </div>
	)
}

StatComponent.propTypes = {
  color: PropTypes.string,
  value: PropTypes.string,
  title: PropTypes.string
}

export default StatComponent
