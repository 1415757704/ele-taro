import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Image } from '@tarojs/components'
import Address from './address/index'
import { asyncGetAddressList } from '@actions/address.js'
import './index.scss'

@connect(({ address, authenticate }) => ({
  address, authenticate
}), (dispatch) => ({
  asyncGetAddressList (options) {
    return dispatch(asyncGetAddressList(options)).then((data) => {
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
				console.log('1...', this.state.addressList)
			})
		})
	}

	render () {
		return (
			<View className='order-confirm-wrapper'>
				<Address address={ this.state.addressList && this.state.addressList[0] } isEditAble={ false }></Address>
				<View className='order-time-wrapper'>
					<View className='text'>立即送出</View>
					<View className='time'>大约11：51送达</View>
				</View>
				<View className='food-list-wrapper'>
					<View className='title'>name</View>
					<View className='food-list'>
						<View className='food'>
							<Image className='food-image'></Image>
							<View className='message-wrapper'>
								<View className='message'>
									<View className='name'>food-name</View>
									<View className='price'>46.64</View>
								</View>
								<View className='num'>x2</View>
							</View>
						</View>
					</View>
				</View>
			</View>
		)
	}
}

export default OrderConfirm