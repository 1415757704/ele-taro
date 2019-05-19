import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Image } from '@tarojs/components'
import ShoppingCarController from '@components/ShoppingCarController/index'
import { addFood, descFood, clearFood } from '@actions/shoppingCar'
import Tools from '@/utils/tools.js'
import './index.scss'

@connect(({ shoppingCar, home }) => ({
  shoppingCar,
  home
}), (dispatch) => ({
  addFood (food) {
    dispatch(addFood(food))
  },
  descFood (food) {
  	dispatch(descFood(food))
  },
  clearFood () {
  	dispatch(clearFood())
  }
}))
class ShoppingCar extends Component {

	constructor () {
		super(...arguments)
		this.state = {
			carDetailIsShow: false
		}
		this.confirmOrder = this.confirmOrder.bind(this)
	}

	componentDidMount () {
		
	}

	render () {
		let num = 0
		let { foodList } = this.props.shoppingCar
		return (
			<View className='shopping-car-wrapper'>
				<View className={'car-detail-wrapper ' + (this.state.carDetailIsShow == true ? 'visiably' : 'hidden')} onClick={ this.hiddenCarDetail.bind(this) }>
					<View className='car-content-wrapper'>
						<View className='car-header-wrapper'>
							<View className='title'>购物车</View>
							<View className='clear' onClick={ this.clearShoppingCar.bind(this)}>清空</View>
						</View>
						<View className='food-wrapper'>
							{
								foodList.map(food => {
									return (
										<View className='food' key={food.id}>
											<View className='name'>{ food.name }</View>
											<View className='price'>{ food.present_price }</View>
											<ShoppingCarController food={food} addFood={this.props.addFood} descFood={this.props.descFood} foodNum={ food.num }></ShoppingCarController>
										</View>
									)
								})
							}
						</View>
					</View>
				</View>
				<View className='cart-pre-wrapper' onClick={this.showCarDetail.bind(this)}>
					<View className='delivery-wrapper'>
						<View className='all-count'>¥{ this.calculatorFoodCount() }</View>
						<View className='delivery-count'>配送费¥{ this.props.home.currentSeller['delivery_fee'] }</View>
					</View>
					<View className='price-wrapper' onClick={ this.confirmOrder }>
						{ this.stillWorseCount() }
					</View>
					<View className='icon-wrapper'>
						<View className='icon'></View>
						<View className={'num ' + (this.allFoodNum(foodList) !== 0 ? 'visiably' : 'hidden')}>{ this.allFoodNum(foodList) }</View>
					</View> 
				</View>
			</View>
		)
	}

	allFoodNum (foodList) {
		let allNum = 0
		foodList.forEach(food => {
			allNum += food.num
		})
		return allNum
	}

	clearShoppingCar (e) {
		e.stopPropagation()
		this.props.clearFood()
	}

	calculatorFoodCount () {
		let count = 0
		let { foodList } = this.props.shoppingCar
		let { currentSeller } = this.props.home
		let deliveryFee = currentSeller['delivery_fee']
		foodList.forEach(food => {
			count += Tools.floatNumberOperator.mul(food['present_price'], food['num'])
		})
		return count !== 0 ? count + deliveryFee : count
	}

	showCarDetail () {
		this.setState({carDetailIsShow: !this.state.carDetailIsShow})
	}

	hiddenCarDetail () {
		this.setState({carDetailIsShow: false})
	}

	stillWorseCount () {
		let { currentSeller } = this.props.home
		let deliveryMinCount = currentSeller['delivery_min_count']
		let foodCount = this.calculatorFoodCount()
		let count = foodCount - deliveryMinCount
		let tip = ''
		if (foodCount === 0) {
			return '请选择商品'
		}
		if (count < 0) {
			tip = `还差${Math.abs(count)}元`
		} else {
			tip = '点击下单'
		}
		return tip
	}

	confirmOrder (e) {
		e.stopPropagation()
		Taro.navigateTo({
		  url: '/pages/orderConfirm/index'
		})
	}
}

export default ShoppingCar