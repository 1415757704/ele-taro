import { GETADDRESSLIST, UPDATEADDRESSBYID, SETDEVELERYADDRESS, ADDADDRESS } from '@constants/address.js'

const ADDRESS_STATE = {
  addressList: [],
  develeryAddressIndex: ''
}

export default function counter (state = ADDRESS_STATE, action) {
  switch (action.type) {
    case GETADDRESSLIST:
      return {
        ...state,
        addressList: action.data
      }
    case UPDATEADDRESSBYID:
      return {
        ...state,
        addressList: JSON.parse(JSON.stringify(action.data))
      }
    case SETDEVELERYADDRESS:
      return {
        ...state,
        develeryAddressIndex: action.data
      }
    case ADDADDRESS:
      return {
        ...state,
        develeryAddressIndex: action.data
      }  
     default:
       return state
  }
}
