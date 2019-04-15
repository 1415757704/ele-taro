import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Button, Swiper, SwiperItem, Text, Image } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import { asyncGetCategoryList, asyncGetNearbySellerList } from '@actions/home'
import { getCategoryList, getNearbySellerList} from '@api/home.js'
import { API } from '@constants/status' 
import './index.scss'

@connect(({ home }) => ({
  home
}), (dispatch) => ({
  asyncGetCategoryList () {
    dispatch(asyncGetCategoryList())
  },
  asyncGetNearbySellerList () {
  	dispatch(asyncGetNearbySellerList())
  }
}))
class Home extends Component {

	constructor () {
		super(...arguments)
		this.state = {

		}
	}

	async componentDidMount () {
		this.props.asyncGetCategoryList()
		this.props.asyncGetNearbySellerList()
	}

	goToSeller(sellerId, seller) {
		let params = {
			sellerId,
			seller
		}
		Taro.navigateTo({
        	url: `/pages/sellerDetail/index?data=${JSON.stringify(params)}`
      	})
	}

	render () {
		let categoryListView = ''
		const { home: {
			categoryList, nearbySellerList
		}} = this.props

		return (
			<View className='home-warpper'>
				<AtSearchBar></AtSearchBar>
				<Swiper
			        className='category-wrapper'
			        indicatorColor='#999'
			        indicatorActiveColor='#999'
			        circular
			        indicatorDots
			    >
			    	{
			    		categoryList.map((parentItem, parentIndex) => {
							let isSwiperItem = false
							if (parentIndex % 8 === 0) {
								isSwiperItem = true
							}
							return isSwiperItem ? (
								<SwiperItem>
									{
										categoryList.map((item, index) => {
											let isCurrentPage = false
						    				if (index >= parentIndex && index < parentIndex + 8) {
						    					isCurrentPage = true
						 					}
						 					return isCurrentPage ? (
						    					<View className='category-item'>
						    						<Image className='pic' src={API.OUTSIDE_IMAGE + item.image_url} />
						    						<View className='desc'>{item.title}</View>
						    					</View>
						   					) : null
					   					})
				   					}
								</SwiperItem>
							) : null
						})
			    	}
	      		</Swiper>
	      		<View className='nearby-seller-wrapper'>
	      			<View className='head-wrapper'>
	      				<View className='line-wrapper'></View>
		      			<Text className='title'>附近的商家</Text>
		      			<View className='line-wrapper'></View>
	      			</View>
	      			<View className='nearby-seller-list-wrapper'>
	      				{
	      					nearbySellerList.map((seller, index) => {
	      						return (
	      							<View className='seller-wrapper' onClick={this.goToSeller.bind(this, seller.id, seller)}>
	      								<Image src={ API.IMAGE_PATH + seller['avatar'] } className='avatar'></Image>
	      								<View className='message-wrapper'>
	      									<View className='name-wrapper'>
						      					<Text className='icon'>品牌</Text>
						      					<Text className='name'>{ seller.name }</Text>
						      				</View>
						      				<View className='sell-message-wrapper'>
						      					<View className='sell-num'>月售{seller['recent_sell_count']}单</View>
							      				<View className='tip-wrapper'>
							      					<Text className='tip-1'>蜂鸟转送</Text>
							      					<Text className='tip-2'>准时达</Text>
							      				</View>
						      				</View>
						      				<View className='freight-message-wrapper'>
						      					<View className='delivery-fee'>
						      						¥{seller['delivery_min_count']}元起送 / 配送费:{seller['delivery_fee']}元
						      					</View>
						      					<View className='delivery-time'>
						      						{seller['delivery_time']}分钟
						      					</View>
						      				</View>
	      								</View>
	      							</View>
	      						)
	      					})
	      				}
	      			</View>
	      		</View>
			</View>
		)
	}
}
export default Home
