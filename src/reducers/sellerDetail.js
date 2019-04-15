import { GETMENULIST, SETSELECTEDFOODLIST } from '@constants/sellerDetail'

const SELLERDETAIL_STATE = {
	menuList: [],
	selectedFoodList: []
}

export default function SELLERDETAIL(state = SELLERDETAIL_STATE, action) {
	switch(action.type) {
		case GETMENULIST:
			return {
				...state,
				menuList: action.data
			}
		case SETSELECTEDFOODLIST:
			return {
				...state,
				selectedFoodList: action.data
			}
		default:
			return state
	}
}