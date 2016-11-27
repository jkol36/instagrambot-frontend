import React from 'react';
import 'css/navbar.less'
import { Link } from 'react-router'
import firebase from 'firebase'

const Navbar = (props) => {
	return (
		<header className='navbar'>
		  <a className="navbar-brand" href="#">
		  	<img src='static/img/dog-logo-blue.png' width='60'></img>
		  </a>
		  <ul className='nav nav-pills float-xs-right'> 
		  	{props.navLinks.map((link, index) => {
		  		let onClick = () => {
		  			return props.handleNavLinkChange(index)
		  		}
		  		let selected = props.selected === index ? 'active': ''
		  		return (
		  			<li className='nav-item' onClick={onClick} key={index}> 
		  				<Link className={`${'nav-link ' + selected}`} to={link.href}><i className={link.icon}></i>{link.text}</Link> 
		  			</li>)
		  	})}
		  	<li className='nav-item'>
			  	<div className="dropdown">
					  <a className="nav-link" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					   <i className='fa fa-user' id='user-icon'></i>
					   {props.user.firstName} {props.user.lastName}
					   <i className='fa fa-caret-down'></i>
					  </a>
					  <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
					  	<a className='dropdown-item' href='#'>Free Plan</a>
					    <a className="dropdown-item" href="#" onClick={() => firebase.auth().signOut()}>Logout</a>
					  </div>
					</div>
				</li>
		  </ul>
		</header>
	)
}
export default Navbar