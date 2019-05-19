import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Image } from '@tarojs/components'
import Address from '../index.js'
import { asyncGetAddressList } from '@actions/address.js'
import './index.scss'

@connect(({ address, authenticate }) => ({
  address, authenticate
}), (dispatch) => ({
  asyncGetAddressList (options) {
    dispatch(asyncGetAddressList(options))
  }
}))
class AddressList extends Component {

	constructor () {

		super(...arguments)
		this.editAddress = this.editAddress.bind(this)
	}

	componentDidMount () {
		this.props.asyncGetAddressList({
			phone: this.props.authenticate.userInfo.phone
		})
	}

	editAddress (address) {
		Taro.navigateTo({
			url: `/pages/orderConfirm/address/edit/index?address=${JSON.stringify(address)}`
		})
	}

	addAddress () {
		Taro.navigateTo({
			url: `/pages/orderConfirm/address/edit/index`
		})
	}

	render () {

		const {
			address:{
				addressList
			}
		} = this.props

		return (
			<View className='address-list-wrapper'>
				{
					addressList.map(address => {
						return (
							<Address address={ address } isSelectedAble = { true } isEditAble={ true }></Address>
						)
					})
				}
				<View className='add-address-wrapper' onClick={ this.addAddress.bind(this) }>
					+ 添加新收货地址
				</View>
			</View>
		)
	}
}

export default AddressList