import { GET } from '@utils/request'

const BASE_API = 'http://localhost:3000'
const OUTSIDE_API = 'https://elm.cangdu.org'

// 商品分类列表
export const getCategoryList =  async function getCategoryList() {
	let data = await GET(`${OUTSIDE_API}/v2/index_entry`, {
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
	}} = await GET(`${BASE_API}/seller/list`)
	return list
}