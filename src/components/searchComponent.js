import React from 'react';


export const SearchComponent = (props) => {

	return (
	  <form className='form-inline row'>
	    <div className="form-group">
	      <div className='input-group'>
	       	<input className="form-control" onChange={props.onQueryChanged} id='search' placeholder={props.slug}/>
	      </div>
	      <button className='btn btn-outline-primary' onClick={props.onSearch}> Search </button>
	    </div>
	  </form>
	)
}