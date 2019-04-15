import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { API } from '@constants/status.js'
import './index.scss'

@connect(({ sellerDetail }) => ({
  sellerDetail
}), (dispatch) => ({
}))
class FoodList extends Component {

	static defaultProps = {
		foodList: ['']
	}

	render () {
		const foodList = this.props.sellerDetail.selectedFoodList

		return (
			<View className='food-list-wrapper'>
				{
					foodList.map(food => {
						return (
							<View className='food-container'>
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
							</View>
						)
					})
				}
			</View>
		)
	}
}

export default FoodList