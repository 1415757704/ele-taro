import { POST } from '@utils/request'
import { API } from '@constants/status'

// 登陆
export const login = async ({phone, password}) => {
	
	let { data } = await POST(`${API.BASE_API}/v1/user/login`, {
		data: {
			phone, password
		}
	})
	return data
}