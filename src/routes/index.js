import React from 'react';
import { Route, IndexRedirect} from 'react-router';
import Dashboard from '../components/Dashboard';
import TestTransitions from '../components/TestTransitions';
import App from '../containers/App';



export default () => [
  (<Route path='/' component={App} key='app'>
  	<Route path='/dashboard' component={Dashboard}/>
  	<Route path='/testTransitions' component={TestTransitions}/>
  	<IndexRedirect to='/dashboard'/> 
  </Route>)]