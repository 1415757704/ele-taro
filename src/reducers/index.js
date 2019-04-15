import { combineReducers } from 'redux'
import counter from './counter'
import home from './home'
import sellerDetail from './sellerDetail'

export default combineReducers({
  counter,
  home,
  sellerDetail
})
