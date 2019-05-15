import { LOGIN } from '@constants/authenticate.js'
import Tool from '@utils/tools'

const USERINFO_STATE = {
	userInfo: ''
}

export default function USERINFO(state = USERINFO_STATE, action) {
	switch(action.type) {
		case LOGIN:
			return {
				...state,
				userInfo: action.data
			}
		default:
			let userInfo
			if (!state.userInfo) {
				userInfo = Tool.getStorage('user_info')
				return {
					...state,
					userInfo
				}
			}
			return state
	}
}