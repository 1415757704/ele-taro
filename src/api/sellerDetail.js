import { GET } from '@utils/request'
import { API } from '@constants/status'

export const getMenuList = async (options) => {
	
	let menuList = await GET(`${API.BASE_API}${options.url}`, {
		data: {
			id: options.sellerId
		}
	})
	return menuList
}