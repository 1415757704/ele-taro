import { GETCATEGORYLIST, GETNEARBYSELLERLIST, SETCURRENTSELLER } from '@constants/home.js'

const HOME_STATE = {
	categoryList: [],
	nearbySellerList: [],
	currentSeller: ''
}

export default function HOME(state = HOME_STATE, action) {
	switch(action.type) {
		case GETCATEGORYLIST:
			return {
				...state,
				categoryList: action.data
			}
		case GETNEARBYSELLERLIST:
			return {
				...state,
				nearbySellerList: action.data
			}
		case SETCURRENTSELLER: 
			return {
				...state,
				currentSeller: action.data
			}
		default:
			return state
	}
}