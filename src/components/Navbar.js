import React from 'react';
import 'css/materialDesign.css'
export const Navbar = (props) => {
	return (
		<nav id='nav' className='nav'>
			<div className='default-nav'> 
				<div className='main-nav'> 
					<div className='toggle'/>
					<div className='main-nav-item'> 
						<img id='logo' src="/static/img/logo.png" className="main-nav-item-link" alt=""/>
					</div>
					{props.navLinks.map((link, index) => {
		  		return (
		  			<div className='main-nav-item' key={index}> 
		  				<a className='main-nav-item-link'href={link.href}>{link.text}</a> 
		  			</div>)
		  	})}
				</div>
			</div>
		</nav>
	)
}