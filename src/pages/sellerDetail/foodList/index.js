import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { API } from '@constants/status.js'
import ShoppingCarController from '@components/ShoppingCarController/index'
import { addFood, descFood } from '@actions/shoppingCar'
import './index.scss'

@connect(({ sellerDetail, shoppingCar }) => (
	{
  		sellerDetail,
  		shoppingCar
	}
), (dispatch) => ({
	addFood (food) {
	   dispatch(addFood(food))
	},
	descFood (food) {
	  dispatch(descFood(food))
	}
}))
class FoodList extends Component {

	constructor () {
		super(...arguments)
		console.log('arguments', arguments)
	}

	static defaultProps = {
		foodList: ['']
	}

	goToFoodDetail (food) {
		console.log('FoodList', food)
	}

	getFoodNum (foodId) {
		let num = 0
		let { foodList } = this.props.shoppingCar

		foodList.forEach(food => {
			if (food.id === foodId) {
				num = food.num
			}
		})
		return num
	}

	render () {
		const foodList = this.props.sellerDetail.selectedFoodList

		return (
			<View className='food-list-wrapper'>
				{
					foodList.map(food => {
						// food num，需要在render中计算，不然由于异步的原因获取不到最新的
						let num = this.getFoodNum(food.id)
						return (
							<View className='food-container' onClick={this.goToFoodDetail.bind(this, food)} key={food.id}>
								<Image src={food['avatar'] && API.IMAGE_PATH + food['avatar']} className='food-image'></Image>
								<View className='message-wrapper'>
									<View className='name'>{food.name}</View>
									<View className='desc-wrapper'>
										<Text className='num'>月售{food['month_sales']}份</Text>
										<Text className='good-rate'>好评率{food['satisfy_rate']}</Text>
									</View>
									<View className='price-wrapper'>
										<Text className='current-price'>¥{food['present_price']}</Text>
										<Text className='old-price'>¥{food['old_price']}</Text>
									</View>
								</View>
								<View className='controller-wrapper'>
									<ShoppingCarController food={food} addFood={this.props.addFood} descFood={this.props.descFood} foodNum={num}></ShoppingCarController>
								</View>
							</View>
						)
					})
				}
			</View>
		)
	}
}

export default FoodList
