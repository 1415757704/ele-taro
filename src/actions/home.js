import { GETCATEGORYLIST, GETNEARBYSELLERLIST } from '@constants/home.js'
import { getCategoryList, getNearbySellerList} from '@api/home.js'

const setCategoryList = (categoryList) => {
	return {
		type: GETCATEGORYLIST,
		data: categoryList
	}
}

const setNearbySellerList = (nearbySellerList) => {
	return {
		type: GETNEARBYSELLERLIST,
		data: nearbySellerList
	}
}

export const asyncGetCategoryList = () => {
	return async dispatch => {
		let categoryList = await getCategoryList()
		dispatch(setCategoryList(categoryList))
	}
}

export const asyncGetNearbySellerList = () => {
	return async dispatch => {
		let nearbySellerList = await getNearbySellerList()
		dispatch(setNearbySellerList(nearbySellerList))
	}
}