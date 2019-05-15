import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'

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

		return (
			<View className='address-wrapper' onClick={ !isEditAble && this.goToAddressList.bind(this) }>
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
		Taro.navigateTo({
			url: `/pages/orderConfirm/address/list/index`
		})
	}
}

export default Address