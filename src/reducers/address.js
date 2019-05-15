import { GETADDRESSLIST } from '@constants/address.js'

const ADDRESS_STATE = {
  addressList: []
}

export default function counter (state = ADDRESS_STATE, action) {
  switch (action.type) {
    case GETADDRESSLIST:
      return {
        ...state,
        addressList: action.data
      }
     default:
       return state
  }
}
