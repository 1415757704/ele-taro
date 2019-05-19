import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Image } from '@tarojs/components'
import Address from './address/index'
import { asyncGetAddressList, updateSelectedAddress } from '@actions/address.js'
import { asyncSaveOrder } from '@actions/order.js'
import Tools from '@/utils/tools.js'
import './index.scss'

@connect(({ address, authenticate, shoppingCar, home }) => ({
  address, authenticate, shoppingCar, home
}), (dispatch) => ({
  asyncGetAddressList (options) {
    return dispatch(asyncGetAddressList(options)).then((data) => {
    	return data
    })
  }, 
  updateSelectedAddress (options) {
  	dispatch(updateSelectedAddress(options))
  },
  asyncSaveOrder (options) {
  	return dispatch(asyncSaveOrder(options)).then((data) => {
  		return data
  	})
  }
}))
class OrderConfirm extends Component {
	constructor () {
		super(...arguments)
		this.state = {
			addressList: []
		}
	}

	componentDidMount () {
		let {
			authenticate: {
				userInfo
			}
		} = this.props

		if (!userInfo) {
			Taro.navigateTo({
				url: `/pages/authenticate/index`
			})
			return
		}

		this.props.asyncGetAddressList({
			phone: userInfo.phone
		}).then((addressList) => {
			console.log('addressList', addressList)
			this.setState({
				addressList
			}, () => {
				// 看当前是否有选中收货地址，没有则使用默认
				if (!this.props.address.develeryAddressIndex) {
					this.props.updateSelectedAddress({ address: this.state.addressList[0] })
				}
			})
		})
	}

	calculatorAllPrice () {
		let allPrice = 0
		this.props.shoppingCar.foodList.forEach(food => {
			allPrice = Tools.floatNumberOperator.add(Tools.floatNumberOperator.mul(food.present_price, food.num), allPrice)
		})
		allPrice = Tools.floatNumberOperator.add(allPrice, this.props.home.currentSeller.delivery_fee)
		return allPrice
	}

	deliveryAddress () {
		let { addressList } = this.state
	}

	orderConfirm () {
		this.props.asyncSaveOrder({
			phone: this.props.authenticate.userInfo.phone,
			sellerId: this.props.shoppingCar.sellerId,
			food: this.props.shoppingCar.foodList,
			address: this.props.address.develeryAddressIndex
		}).then((data) => {
			console.log('orderConfirm success...', data)
		})
	}

	render () {
		return (
			<View className='order-confirm-wrapper'>
				<Address address={ this.props.address.develeryAddressIndex } isEditAble={ false }></Address>
				<View className='order-time-wrapper'>
					<View className='text'>立即送出</View>
					<View className='time'>大约11：51送达</View>
				</View>
				<View className='food-list-wrapper'>
					<View className='title'>name</View>
					<View className='food-list'>
						{
							this.props.shoppingCar.foodList.map(food => {
								return (
									<View className='food'>
										<Image className='food-image'></Image>
										<View className='message-wrapper'>
											<View className='message'>
												<View className='name'>{ food.name }</View>
												<View className='price'>
													{ Tools.floatNumberOperator.add(Tools.floatNumberOperator.mul(food.present_price, food.num), this.props.home.currentSeller.delivery_fee) }
												</View>
											</View>
											<View className='num'>x{ food.num }</View>
										</View>
									</View>
								)
							})
						}
						
					</View>
				</View>
				<View className='operator-wrapper'>
					<View className='price-wrapper'>订单总金额：{ this.calculatorAllPrice() }</View>
					<View className='confirm-btn' onClick={ this.orderConfirm.bind(this) }>提交订单</View>
				</View>
			</View>
		)
	}
}

export default OrderConfirm