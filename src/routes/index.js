import React from 'react';
import { Route, IndexRedirect} from 'react-router';
import Dashboard from '../components/Dashboard';
import TestTransitions from '../components/TestTransitions';
import TestForm from '../components/TestForm'
import MaterialDesignNav from '../components/MaterialDesignNavbar'
import MaterialDesignTable from '../components/MaterialDesignTable'
import App from '../containers/app';




export default () => [
  (<Route path='/' component={App} key='app'>
  	<Route path='/dashboard' component={Dashboard}/>
  	<Route path='/testTransitions' component={TestTransitions}/>
  	<Route path='/testForm' component={TestForm}/>
  	<Route path='/testNav' component={MaterialDesignNav}/>
  	<Route path='/testTable' component={MaterialDesignTable}/>
  	<IndexRedirect to='/dashboard'/> 
  </Route>)]