import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'

class ShoppingCar extends Component {

	componentDidMount () {
		
	}

	render () {
		return (
			<View className='shopping-car-wrapper'>
				<View className='delivery-wrapper'>
					<View className='all-count'></View>
					<View className='delivery-count'></View>
				</View>
				<View className='price-wrapper'>
					还差20元
				</View>
				<View className='icon-wrapper'>
					<View className='icon'></View>
				</View> 
			</View>
		)
	}
}

export default ShoppingCar