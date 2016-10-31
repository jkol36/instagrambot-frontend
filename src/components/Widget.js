import React from 'react';
import '../css/widget.less';

export const Widget = (props) => (
  <div className='widget-container'>
  	<div className='widget'> 
  		<div className='section-info'> 
  			<h3 className='info-title'> {props.title} </h3>
  			<div className='info-block'> 
  				{props.stats.map((stat) => {
  					return (
  						<div className='row'>
	  						<h3 className='stat-description col-md-6'>{stat.description} </h3>
	  						<h3 className='stat-number col-md-6'>{stat.number} </h3>
	  					</div>
  					)
  				})}
  			</div>
  		</div>
  	</div> 
  </div>
)