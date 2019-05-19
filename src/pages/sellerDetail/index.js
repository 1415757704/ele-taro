import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { asyncGetMenuList } from '@actions/sellerDetail.js'
import { setCurrentSellerId } from '@actions/shoppingCar.js'
import SellerDetailHeader from './header/index.js'
import MenuList from './menuList/index'
import FoodList from './foodList/index'
import ShoppingCar from '../shoppingCar/index'
import './index.scss'


@connect(({ sellerDetail }) => ({
  sellerDetail
}), (dispatch) => ({
  asyncGetMenuList (options) {
    dispatch(asyncGetMenuList(options))
  },
  setCurrentSellerId (options) {
  	dispatch(setCurrentSellerId(options))
  }
}))
class SellerDetail extends Component {

	constructor () {
		super(...arguments)
		this.state = {
			current: 0,
			seller: '',
			selectFoodList: []
		}
	}

	componentDidMount () {

		let { data } = this.$router.params
		data  = JSON.parse(decodeURI(data))
		this.setState({
			seller: data.seller
		})
		
		this.props.asyncGetMenuList({
			url: '/seller/menu/list',
			sellerId: data.sellerId
		})

		this.props.setCurrentSellerId(data.sellerId)
	}

	handleClick (value) {
		this.setState({
	      current: value
	    })
	}

	render () {

		const tabList = [{ title: '商品' }, { title: '评价' }]
		return (
			<View className='seller-detail-wrapper'>
				<SellerDetailHeader seller={this.state.seller}></SellerDetailHeader>
				<AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)} className='tab-wrapper'>
			        <AtTabsPane current={this.state.current} index={0} >
			          	<View className='food-wrapper'>
							<View className='menu-list' ref='menuList'><MenuList></MenuList></View>
							<View className='food-list' ref='foodList'><FoodList></FoodList></View>
						</View>
			        </AtTabsPane>
			        <AtTabsPane current={this.state.current} index={1}>
			          <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页二的内容</View>
			        </AtTabsPane>
			    </AtTabs>
				<ShoppingCar></ShoppingCar>
			</View>
		)
	}
}
export default SellerDetail
