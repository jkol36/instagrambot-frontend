import React from 'react';
import { Link } from 'react-router'
import firebase from 'firebase'
import {connect} from 'react-redux'


const NavbarBrand = (props) => {
	return (
		<div className='navbar-header pull-left'>
			<a href='#' className='navbar-brand'>
				<small>
					<img src='assets/img/fetchmate-logo-white.png'></img>
				</small>
			</a>
			{props.children}
		</div>
	)
}

const NavbarHeaderRight = (props) => {
	return (
	  <div className="navbar-header pull-right">
		  <div className='navbar-account'>
		  	<ul className='account-area'>
		  		<li>
		        <a className="login-area dropdown-toggle" data-toggle="dropdown">
		          <div className='avatar'>
		          	<img src='assets/img/avatar.jpg'/>
			         </div>
		          <section>
		              <h2><span className="profile"><span>{props.name ? props.name: ''}</span></span></h2>
		          </section>
		        </a>
		        <ul className='pull-right dropdown-menu dropdown-arrow dropdown-login-area'>
		        	<li className='dropdown-footer'> 
		        		<a href='#' onClick={() => firebase.auth().signOut()} > Logout </a>
		        	</li>
		        </ul>
	        </li>
	      </ul>
	  	</div>
	  </div>

	);
}
class Navbar extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		if(this.props.auth.user === null) {
			return (<div> </div>)
		}
		else {
			return (
				<div className="navbar">
			    <div className="navbar-inner">
			       <NavbarBrand />
			       <NavbarHeaderRight name={this.props.auth.user.firstName + ' ' + this.props.auth.user.lastName}  /> 
			    </div>
				</div>
		)
		}
	}
}

export default connect(state => state)(Navbar)