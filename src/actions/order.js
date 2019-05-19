import { SETORDERLIST } from '@constants/order.js'
import { saveOrder, getOrderListByPhone } from '@api/order.js'


const setOrderList = (orderList) => {
	return {
		type: SETORDERLIST,
		data: orderList
	}
}



export const asyncGetOrderList = ({ phone }) => {
	return async dispatch => {
		let orderList = await getOrderListByPhone({ phone })
		dispatch(setOrderList(orderList))
		return Promise.resolve(orderList)
	}
}

export const asyncSaveOrder = ({ address, food, phone, sellerId }) => {
	return async dispatch => {
		let data = await saveOrder({ address, food, phone, sellerId })
		let orderList = await dispatch(asyncGetOrderList({ phone }))
		return Promise.resolve(orderList)
	}
}