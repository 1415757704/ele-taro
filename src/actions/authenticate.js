import { LOGIN } from '@constants/authenticate.js'
import { login } from '@api/authenticate.js'

const setUserInfo = (userInfo) => {
	return {
		type: LOGIN,
		data: userInfo
	}
}

export const asyncLogin = (user) => {
	return async dispatch => {
		let userInfo = await login(user)
		dispatch(setUserInfo(userInfo))
		return Promise.resolve(userInfo)
	}
}