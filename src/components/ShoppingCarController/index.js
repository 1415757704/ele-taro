import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './index.scss'

class ShoppingCarController extends Component {

	static defaultProps = {
		foodNum: 0
	}

	componentDidMount () {
	}

	operatorFoodCountByFoodId (type, e) {
		e.stopPropagation()
		
		type === 'add' && this.props.addFood(this.props.food)
		type === 'desc' && this.props.descFood(this.props.food)
	}

	getFoodNum () {
		let num = this.props.foodNum(this.props.food.id)
	}

	render () {

		return (
			<View className='shopping-car-controller-wrapper'>
				<View className='icon-wrapper'><View className='icon desc-icon' onClick={this.operatorFoodCountByFoodId.bind(this, 'desc')}></View></View>
				<View className='count'>{this.props.foodNum}</View>
				<View className='icon-wrapper'><View className='icon add-icon' onClick={this.operatorFoodCountByFoodId.bind(this, 'add')}></View></View>
			</View>
		)
	}
}

export default ShoppingCarController
