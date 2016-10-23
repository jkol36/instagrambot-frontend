import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import reducers from 'reducers'
import thunk from 'redux-thunk';
import { routeReducer, syncHistory } from 'react-router-redux'

const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}))

export default function configureStore(history) {
  const routerMiddleware = syncHistory(history)
  let middleware = applyMiddleware(thunk, routerMiddleware)
  if (process.env.NODE_ENV !== 'production') {
    const devTools = window.devToolsExtension
      ? window.devToolsExtension()
      : require('containers/DevTools').default.instrument()
    middleware = compose(middleware, devTools)
  }
  const store = middleware(createStore)(reducer)
  if (process.env.NODE_ENV !== 'production') {
    routerMiddleware.listenForReplays(store)
  }
  return store
}
