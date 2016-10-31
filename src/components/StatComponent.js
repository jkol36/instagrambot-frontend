import React from 'react';
import { Widget } from './Widget';

export const StatComponent = (props) => {
	const {profiles_parsed} = props
	return (
		<div className='row'>
			<Widget description='Profiles Parsed' icon='hashtag' color='blue' number={profiles_parsed}/>
			
		</div>
	)
}