import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { API } from '@constants/status'
import './index.scss'

class SellerDetailHeader extends Component {

	static defaultProps = {
		seller: ''
	}

	componentDidMount () {
	}

	render () {
		return (
			<View className='header-wrapper'>
				<Image className='bg-image' src='//elm.cangdu.org/img/164ad0b6a3917599.jpg'></Image>
				<View className='content'>
					<Image className='avatar' src={API.IMAGE_PATH + this.props.seller['avatar']}></Image>
					<View className='desc-wrapper'>
						<View className='seller-name'>{this.props.seller['name']}</View>
						<View className='delivery-wrapper'>商家配送 / {this.props.seller['delivery_time'] || 30}分钟送达 / 配送费{this.props.seller['delivery_fee']}元</View> 
						<View className='announcement'>公告：{this.props.seller['announcement']}</View>
					</View>
				</View>
			</View>
		)
	}
}

export default SellerDetailHeader