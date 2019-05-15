import { combineReducers } from 'redux'
import counter from './counter'
import home from './home'
import sellerDetail from './sellerDetail'
import shoppingCar from './shoppingCar'
import authenticate from './authenticate'
import address from './address'

export default combineReducers({
  counter,
  home,
  sellerDetail,
  shoppingCar,
  authenticate,
  address
})
