import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'

@connect(({ sellerDetail }) => ({
  sellerDetail
}), (dispatch) => ({
}))
class MenuList extends Component {
	
	render () {
		const {
			sellerDetail:{
				menuList
			}
		} = this.props
		return (
			<View className='menu-list'>
				{
					menuList.map(menu => {
						return (
							<View className='menu' key={menu.id}>
								{menu.description}
							</View>
						)
					})
				}
			</View>
		)
	}
}

export default MenuList