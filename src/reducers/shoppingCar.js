import { ADD_FOOD, DESC_FOOD, CLEAR_FOOD } from '@constants/shppingCar'

const SHOPPINGCAR_STATE = {
	foodList: [] // 购物车中的商品
}

export default function SELLERDETAIL(state = SHOPPINGCAR_STATE, action) {
	let foodList = []
	switch(action.type) {
		case ADD_FOOD:
			foodList = addFood(state, action.data)
			return {
				...state,
				foodList: foodList
			}
		case DESC_FOOD:
			foodList = descFood(state, action.data)
			return {
				...state,
				foodList: foodList
			}
		case CLEAR_FOOD:
			return {
				...state,
				foodList: []
			}	
		default:
			return state
	}
}

const addFood = (state, food) => {
	let isAlreadyExit = false
	let { foodList } = state
	foodList = foodList.map(foodItem => {
		if (food.id === foodItem.id) {
			foodItem.num += 1
			isAlreadyExit = true
		}
		return foodItem
	})
	if (!isAlreadyExit) {
		food.num = 1
		foodList.push(JSON.parse(JSON.stringify(food)))
	}
	return foodList
}

const descFood = (state, food) => {
	let { foodList } = state
	return foodList.filter(foodItem => {
		if (food.id !== foodItem.id) {
			return foodItem
		}
		if (foodItem.num !== 1) {
			foodItem.num -= 1
			return foodItem
		}
	})
}



