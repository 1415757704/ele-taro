import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { asyncGetMenuList } from '@actions/sellerDetail.js'
import SellerDetailHeader from './header/index.js'
import MenuList from './menuList/index'
import FoodList from './foodList/index'
import './index.scss'


@connect(({ sellerDetail }) => ({
  sellerDetail
}), (dispatch) => ({
  asyncGetMenuList (options) {
    dispatch(asyncGetMenuList(options))
  }
}))
class SellerDetail extends Component {

	constructor () {
		super(...arguments)
		this.state = {
			seller: '',
			selectFoodList: []
		}
	}

	componentDidMount () {

		let { data } = this.$router.params
		data  = JSON.parse(data)
		this.setState({
			seller: data.seller
		})
		
		this.props.asyncGetMenuList({
			url: '/seller/menu/list',
			sellerId: data.sellerId
		})
	}

	render () {

		return (
			<View className='seller-detail-wrapper'>
				<SellerDetailHeader seller={this.state.seller}></SellerDetailHeader>
				<View className='food-wrapper'>
					<View className='menu-list' ref='menuList'><MenuList></MenuList></View>
					<View className='food-list' ref='foodList'><FoodList></FoodList></View>
				</View>
			</View>
		)
	}
}
export default SellerDetail
