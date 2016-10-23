import React from 'react'
import ReactDOM from 'react-dom'
import { useRouterHistory } from 'react-router'
import { createHistory } from 'history'
import makeRoutes from './routes'
import Root from './containers/root'
import configureStore from './store'

const history = useRouterHistory(createHistory)({ basename: ''})

const store = configureStore(history)

const routes = makeRoutes(store)

// Render the React application to the DOM
ReactDOM.render(
  <Root history={history} routes={routes} store={store} />,
  document.getElementById('root')
)
