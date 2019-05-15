import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Image, Input } from '@tarojs/components'
import { AtRadio, AtCheckbox }  from 'taro-ui'
import './index.scss'

class EditAddress extends Component {

	constructor () {
	    super(...arguments)
	    this.state = {
	    	address: '',
	      	gender: 1,
	      	selectedTipList: []
	    }

	    this.checkboxOption = [{
	        value: 'list1',
	        label: 'iPhone X',
	        desc: '部分地区提供电子普通发票，用户可自行打印，效力等同纸质普通发票，具体以实际出具的发票类型为准。'
	      },{
	        value: 'list2',
	        label: 'HUAWEI P20'
	      },{
	        value: 'list3',
	        label: 'OPPO Find X',
	        desc: '部分地区提供电子普通发票，用户可自行打印，效力等同纸质普通发票，具体以实际出具的发票类型为准。'
	      },{
	        value: 'list4',
	        label: 'vivo NEX',
	        desc: '部分地区提供电子普通发票，用户可自行打印，效力等同纸质普通发票，具体以实际出具的发票类型为准。'
	    }]
  	}

  	handleChangeGender (gender) {
  		this.setState({
  			gender
  		})
  	}

  	handleTipChange (value) {
  		this.setState({
  			selectedTipList: value
  		}, () => {
  			console.log('selectedTipList...', this.state.selectedTipList)
  		})
	}

	componentDidMount () {
		
		let { address } = this.$router.params
		address = JSON.parse(decodeURI(address))
		this.setState({
			address
		})
		this.setState({
			gender: address.gender
		})
		// 初始化选中的tip
		this.setSelectedTiplist(address.tip)
	}

	getTipList () {
		let { tip } = this.state.address
		let tipList = tip && tip.map(item => {
			return {
				value: item.value,
	        	label: item.label,
	        	desc: item.label
			}
		})
		// 不能在这里面直接更新state，不然的话会造成死循环
		return tipList
	}

	setSelectedTiplist (tip) {
		let selectedTipList = []
		tip && tip.forEach(item => {
			if (item.selected) {
				selectedTipList.push(item.value)
			}
		})
		this.setState({
			selectedTipList
		})
	}

	getSelectedTipList () {
		return this.state.selectedTipList
	}

	render () {
		return (
			<View className='edit-address-wrapper'>
				<View className='wrapper address-wrapper'>
					<View className='title'>
						收货地址：
					</View>
					<Input className='content' value={ this.state.address.street } />
				</View>
				<View className='wrapper detail-address-wrapper'>
					<View className='title'>
						门牌号：
					</View>
					<Input className='content' value={ this.state.address.detail } />
				</View>
				<View className='wrapper contact-wrapper'>
					<View className='title'>
						联系人：
					</View>
					<View className='content'>
						<Input className='content' value={ this.state.address.customName } />
						<AtRadio
					        options={[
					          { label: '男士', value: 1},
					          { label: '女士', value: 2},
					        ]}
					        value={ this.state.gender }
					        onClick={ this.handleChangeGender.bind(this) }
					    />
					</View>
				</View>
				<View className='wrapper phone-wrapper'>
					<View className='title'>
						手机号：
					</View>
					<Input className='content' value={ this.state.address.phone } />
				</View>
				<View className='wrapper tip-wrapper'>
					<View className='title'>
						标签：
					</View>
					<View className='content'>
						<AtCheckbox
					    	options={ this.getTipList() }
					        selectedList={ this.getSelectedTipList() }
					        onChange={this.handleTipChange.bind(this)}
					    />
					</View>
				</View>
				<View className='confirm-btn'>保存</View>
			</View>
		)
	}
}

export default EditAddress