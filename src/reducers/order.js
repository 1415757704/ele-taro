import { SETORDERLIST } from '@constants/order.js'

const ORDER_STATE = {
  orderList: [],
  sellerId: ''
}

export default function order (state = ORDER_STATE, action) {
  switch (action.type) {
    case SETORDERLIST:
      return {
        ...state,
        orderList: action.data
      }
    default:
      return state
  }
}
