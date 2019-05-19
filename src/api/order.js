import { GET, POST } from '@utils/request'
import { API } from '@constants/status'

export const saveOrder = async function saveOrder( { address, food, phone, sellerId } ) {
	let data = await POST(`${API.BASE_API}/v1/order/add`, {
		data: {
			address,
			food,
			phone,
			sellerId
		}
	})
	return data
}

export const getOrderListByPhone = async function getOrderListByPhone ( { phone } ) {
	let data = await GET(`${API.BASE_API}/v1/order/list`, {
		data: {
			phone
		}
	})
	return data
}