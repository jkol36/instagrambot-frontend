import React from 'react';
import { Route, IndexRedirect} from 'react-router';
import { routerReducer } from 'react-router-redux';
import SearchContainer from '../containers/SearchContainer';
import LandingComponent from 'components/LandingComponent';
import SigninComponent from 'components/SigninComponent';
import SignupComponent from 'components/SignupComponent';
import ContactListContainer from 'containers/ContactListContainer';
import _AuthContainer from '../containers/_AuthContainer';
import DashboardComponent from 'components/DashboardComponent'
import App from '../containers/app'



export default () => [
  (<Route path='/' component={_AuthContainer} key='auth-container'>
    <IndexRedirect to='/landing' />
    <Route path='/signin' component={SigninComponent} />
    <Route path='/signup' component={SignupComponent} />
    <Route path='/landing' component={LandingComponent} />
    <Route path='/app' component={App} key='app'>
      <Route path='/dashboard' component={DashboardComponent} />
      <Route path='/search'  key='search' component={SearchContainer} />
      <Route path='/contact-lists' component={ContactListContainer} />
  	   <IndexRedirect to='/search'/> 
    </Route>
  </Route>)]
