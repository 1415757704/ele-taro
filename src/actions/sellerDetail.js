import { GETMENULIST, SETSELECTEDFOODLIST } from '@constants/sellerDetail'
import { getMenuList } from '@api/sellerDetail'
 
const setMenuList = (menuList) => {
	return {
		type: GETMENULIST,
		data: menuList
	}
}

const setSelectedFoodList = (setSelectedFoodList) => {
	return {
		type: SETSELECTEDFOODLIST,
		data: setSelectedFoodList
	}
}

export const asyncGetMenuList = (options) => {
	return async dispatch => {
		let { menuList } = await getMenuList(options)
		dispatch(setMenuList(menuList))
		// 选中第一个菜单列表
		dispatch(setSelectedFoodList(menuList[0].food))
	}
}