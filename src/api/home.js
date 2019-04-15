import { GET } from '@utils/request'
import { API } from '@constants/status'

// 商品分类列表
export const getCategoryList =  async function getCategoryList() {
	let data = await GET(`${API.OUTSIDE_API}/v2/index_entry`, {
		data: {
			'group_type': 1,
			'flags[]': 'F'
		}
	})
	return data
}

export const getNearbySellerList = async function getNearbySellerList() {
	let {data :{
		list
	}} = await GET(`${API.BASE_API}/seller/list`)
	return list
}