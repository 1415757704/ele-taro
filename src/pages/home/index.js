import Taro, { Component } from '@tarojs/taro'
import { View, Button, Swiper, SwiperItem, Text, Image } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import { getCategoryList, getNearbySellerList} from '@api/home.js'
import './index.scss'

class Home extends Component {
	constructor () {
		super(...arguments)
		this.state = {
			categoryList: [],
			nearbySellerList: []
		}
	}

	async componentDidMount () {
		let categoryList = await getCategoryList()
		this.setState({'categoryList': categoryList})
		let nearbySellerList = await getNearbySellerList()
		this.setState({'nearbySellerList': nearbySellerList})
		console.log(`nearbySellerList`, nearbySellerList)
	}

	render () {
		// categoryList View		
		let { categoryList } = this.state
		let categoryListView = categoryList.map((parentItem, parentIndex) => {
			if (parentIndex % 8 === 0) {
			    return (
			    	<SwiperItem>
			    		{
			    			categoryList.map((item, index) => {
			    				if (index >= parentIndex && index < parentIndex + 8) {
			    					return (
			    						<View className='category-item'>
			    							<Image className='pic' src={'https://fuss10.elemecdn.com/' + item.image_url} />
			    							<View className='desc'>{item.title}</View>
			    						</View>
			   						)
			 					}
			   				})
			   			}
					</SwiperItem>
  				)
			}
		})

		// nearby seller view
		let { nearbySellerList } = this.state
		let nearbySellerListView = nearbySellerList.map((seller, index) => {
			return (
				<View className='seller-wrapper' key={seller['_id']}>
	      			<Image src={ 'http://localhost:3000/' + seller['avatar'] } className='avatar'></Image>
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
			    		categoryListView
			    	}
	      		</Swiper>
	      		<View className='nearby-seller-wrapper'>
	      			<View className='head-wrapper'>
	      				<View className='line-wrapper'></View>
		      			<Text className='title'>附近的商家</Text>
		      			<View className='line-wrapper'></View>
	      			</View>
	      			<View className='nearby-seller-list-wrapper'>
	      				{ nearbySellerListView }
	      			</View>
	      		</View>
			</View>
		)
	}
}
export default Home