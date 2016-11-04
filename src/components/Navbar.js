import React from 'react';
export const Navbar = (props) => {
	return (
		<nav>
		  <ul className='nav nav-pills float-xs-right'> 
		  	{props.navLinks.map((link, index) => {
		  		return (
		  			<li className='nav-item' key={index}> 
		  				<a className='nav-link'href={link.href}>{link.text}</a> 
		  			</li>)
		  	})}
		  </ul>
		</nav>
	)
}