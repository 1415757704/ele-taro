import { GET, POST } from '@utils/request'
import { API } from '@constants/status'

// 收获地址列表
export const getAddressList =  async function getAddressList({ phone }) {
	let { data: {
		harvestAddress
	} } = await GET(`${API.BASE_API}/v1/user/address/list`, {
		data: {
			phone
		}
	})
	return harvestAddress
}
// 修改收货地址
export const modifiedAddress =  async function modifiedAddress({ phone, address }) {
	let data = await POST(`${API.BASE_API}/v1/user/address/update`, {
		data: {
			phone,
			address
		}
	})
	return data
}
// 添加收货地址
export const addAddress = async function addAddress ({ phone, address }) {
	let data = await POST(`${API.BASE_API}/v1/user/address/add`, {
		data: {
			phone,
			address
		}
	})
	return data
}
