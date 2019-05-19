import { ADD_FOOD, DESC_FOOD, CLEAR_FOOD, SETCURRENTSELLERID } from '@constants/shppingCar'

export const addFood = (food) => {
	return {
		type: ADD_FOOD,
		data: food
	}
}

export const descFood = (food) => {
	return {
		type: DESC_FOOD,
		data: food
	}
}

export const clearFood = () => {
	return {
		type: CLEAR_FOOD
	}
}

export const setCurrentSellerId = ( sellerId ) => {
	return {
		type: SETCURRENTSELLERID,
		data: sellerId
	}
}
