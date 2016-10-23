import React from 'react';


export const SearchComponent = (props) => {

	return (
		<div className='input-group'>
			<input type='text' className='form-control' placeholder='#startups' onChange={(e) => props.onQueryChanged(e.target.value)}></input>
			<span className='input-group-addon btn btn-success' onClick={props.onSearch}>Search</span>
		</div>
	)
}