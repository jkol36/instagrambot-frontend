import React from 'react';
import { Widget } from './Widget';

export const StatComponent = (props) => {
	console.log(props)
	const {profiles_parsed, emails_found} = props
	return (
		<div className='row'>
			<Widget description='Profiles Parsed' icon='hashtag' color='blue' number={profiles_parsed}/>
			<Widget description='Emails Found' icon='hashtag' color='orange' number={emails_found}/>
		</div>
	)
}