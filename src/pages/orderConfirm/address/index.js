import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { updateSelectedAddress } from '@actions/address.js'
import './index.scss'

@connect(({ address }) => ({
  addressDetail: address
}), (dispatch) => ({
  updateSelectedAddress (options) {
    dispatch(updateSelectedAddress(options))
  }
}))
class Address extends Component {
	constructor () {

		super(...arguments)
		this.editAddress = this.editAddress.bind(this)
	}

	componentDidMount () {
		
	}

	render () {
		
		const {
			address,
			isEditAble
		} = this.props

		console.log('orderConfirm address...', address)
		return (
			<View className='address-wrapper' onClick={ this.goToAddressList.bind(this) }>
				<View className='address'>
					<View className='specify-type'>公司</View>
					<View className='content'>{ address && address.detail }</View>
				</View>
				<View className='message'>
					<View className='name'>{ address && address.customName }</View>
					<View className='phone'>{ address && address.phone }</View>
				</View>
				<View className={isEditAble ? `visibility edit-icon` : 'hidden'} onClick={ this.editAddress.bind(this, address) }></View>
			</View>
		)
	}

	editAddress (address) {
		Taro.navigateTo({
			url: `/pages/orderConfirm/address/edit/index?address=${JSON.stringify(address)}`
		})
	}

	goToAddressList () {
		if (!this.props.isEditAble) {
			Taro.navigateTo({
				url: `/pages/orderConfirm/address/list/index`
			})
		}

		if (this.props.isSelectedAble) {
			// 更新选中的收货地址
			this.props.updateSelectedAddress({ address: this.props.address })
			Taro.redirectTo({
				url: `/pages/orderConfirm/index`
			})
		}
	}
}

export default Address