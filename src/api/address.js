import { GET } from '@utils/request'
import { API } from '@constants/status'

// 商品分类列表
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