import React from 'react';
import '../css/widget.less';

export const Widget = (props) => (
  <div className='card'> 
  	<div className={'card-block ' + props.color }> 
  		<h4 className='card-title'>
  			<i className={'fa fa-' + props.icon} /> 
  			{ props.description }
  		</h4>
  		<p className='card-text'> {props.number} </p>
  	</div>
  </div>
)