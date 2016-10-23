import React from 'react'
import ReactDOM from 'react-dom'
import { useRouterHistory } from 'react-router'
import { createHistory } from 'history'
import makeRoutes from './routes'
import Root from './containers/root'

const history = useRouterHistory(createHistory)({ basename: ''})

const routes = makeRoutes(store)

// Render the React application to the DOM
ReactDOM.render(
  <Root history={history} routes={routes} />,
  document.getElementById('root')
)
