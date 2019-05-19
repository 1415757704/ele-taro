import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Image, Input } from '@tarojs/components'
import { AtRadio, AtCheckbox, AtTag, AtModal, AtModalHeader, AtModalContent, AtModalAction, AtForm }  from 'taro-ui'
import { asyncModifiedAddress, asyncAddAddress } from '@actions/address.js'
import Tools from '@/utils/tools.js'
import './index.scss'

@connect(({ address, authenticate }) => ({
  address,
  authenticate
}), (dispatch) => ({
  asyncModifiedAddress (options) {
    return dispatch(asyncModifiedAddress(options)).then((data) => {
    	return data
    })
  },
  asyncAddAddress (options) {
  	return dispatch(asyncAddAddress(options)).then((data) => {
  		return data
  	})
  }
}))
class EditAddress extends Component {

	constructor () {
	    super(...arguments)
	    this.state = {
	    	form: {
	    		address: {
	    			street: '',
	    			detail: '',
	    			customName: '',
	    			phone: ''
	    		},
	      		selectedTipList: []
	    	},
	    	tipLabel: '',
	    	isTipDialogShow: false
	    }
  	}

  	handleChangeGender (gender) {
  		
  		let { form } = this.state
  		
  		form.address = !form.address ? {} : form.address
  		form.address.gender = gender
  		this.setState({
  			form
  		})
  	}

  	handleTipChange (value) {
  		let { form } = this.state
  		form.selectedTipList = value
  		this.setState({
  			form
  		}, () => {
  			console.log('selectedTipList...', this.state.form.selectedTipList)
  		})
	}

	async modifiedAddress() {
		
		let status
		
		if (this.$router.params.address) {
			status = await this.props.asyncModifiedAddress({
				phone: this.props.authenticate.userInfo.phone,
				address: this.state.form.address
			})
		} else { // add address
			status = await this.props.asyncAddAddress({
				phone: this.props.authenticate.userInfo.phone,
				address: this.state.form.address
			})
		}

		if (status === 0) {
			Taro.redirectTo({
				url: '/pages/orderConfirm/address/list/index'
			})
		}
	}

	componentDidMount () {
		
		let { address } = this.$router.params
		if (!address) {
			return
		}

		address = JSON.parse(decodeURI(address))
		let { form } = this.state
		
		form.address = Object.assign({}, form.address, address)
		
		this.setState({
			form
		})
		
		// 初始化选中的tip
		this.setSelectedTiplist(address.tip)
	}

	getTipList () {
		let { tip } = this.state.form.address
		let tipList = tip && tip.map(item => {
			return {
				value: item.value,
	        	label: item.label,
	        	desc: item.label
			}
		})
		// 不能在这里面直接更新state，不然的话会造成死循环
		return tipList || []
	}

	setSelectedTiplist (tip) {
		let selectedTipList = []
		tip && tip.forEach(item => {
			if (item.selected) {
				selectedTipList.push(item.value)
			}
		})
		let { form } = this.state
		form.selectedTipList = selectedTipList
		this.setState({
			form
		})
	}

	addTip () {

		this.setState({
			isTipDialogShow: true
		})
	}

	getSelectedTipList () {
		return this.state.form.selectedTipList
	}

	handleConfirm () {
		this.setState({
			isTipDialogShow: false
		})

		// add address
		let { form } = this.state
		let tip;
		form.address = form.address === undefined ? {} : form.address
		tip = form.address ? form.address.tip : []
		tip = tip ? tip : []

		console.log('tip...', tip)

		let item = {
			value: Tools.uuid(8, 16),
			label: this.state.tipLabel,
			desc: this.state.tipLabel,
			selected: true
		}
		
		tip.push(item)
		form.address.tip = tip

		this.setState({
			form
		})
		// clear
		this.setState({
			tipLabel: ''
		})
	}

	handleCancle () {
		this.setState({
			isTipDialogShow: false
		})
	}

	handleChangeAddress (key, event) {

		let { form } = this.state
		let { 
			address
		} = form

		Object.keys(address).forEach(item => {
			if (key === item) {
				address[key] = event.target.value	
                this.setState({
                	...form,
                	address
                })
			}
		})
	}

	handleChangeForState (key, event) { // state最外层属性的变化监听
		let state = this.state

		Object.keys(this.state).forEach(item => {
			
			if (key === item) {
				state[key] = event.target.value
				this.setState({
					...state
				})
			}
		})
	}

	render () {
		
		return (
			<View className='edit-address-wrapper'>
				<View className='wrapper address-wrapper'>
					<View className='title'>
						收货地址：
					</View>
					<Input className='content' value={ this.state.form.address && this.state.form.address.street } onChange={this.handleChangeAddress.bind(this, 'street')}/>
				</View>
				<View className='wrapper detail-address-wrapper'>
					<View className='title'>
						门牌号：
					</View>
					<Input className='content' value={ this.state.form.address.detail } onChange={this.handleChangeAddress.bind(this, 'detail')}/>
				</View>
				<View className='wrapper contact-wrapper'>
					<View className='title'>
						联系人：
					</View>
					<View className='content'>
						<Input className='content' value={ this.state.form.address.customName } onChange={this.handleChangeAddress.bind(this, 'customName')}/>
						<AtRadio
					        options={[
					          { label: '男士', value: 1},
					          { label: '女士', value: 2},
					        ]}
					        value={ this.state.form.address.gender }
					        onClick={ this.handleChangeGender.bind(this) }
					    />
					</View>
				</View>
				<View className='wrapper phone-wrapper'>
					<View className='title'>
						手机号：
					</View>
					<Input className='content' value={ this.state.form.address.phone } onChange={this.handleChangeAddress.bind(this, 'phone')}/>
				</View>
				<View className='wrapper tip-wrapper'>
					<View className='title'>
						标签：
					</View>
					<View className='content tip at-icon at-icon-add-circle' onClick={ this.addTip.bind(this) }>
					 	{
					 		this.getTipList().map((tip) => {
					 			return (
					 				<AtTag className='tip-item'>{ tip.label }</AtTag>
					 			)
					 		})
					 	}
					</View>
				</View>
				<View className='confirm-btn' onClick={ this.modifiedAddress.bind(this) }>保存</View>

				<AtModal isOpened={ this.state.isTipDialogShow }>
				  <AtModalHeader>添加标签</AtModalHeader>
				  <AtModalContent>
				    <Input
				    	value = { this.state.tipLabel }
				        placeholder='标签名'
				        onChange={this.handleChangeForState.bind(this, 'tipLabel')}
				    />
				    <View className='btn-wrapper'>
				  		<View className='btn cancle' onClick={ this.handleCancle.bind(this) }>取消</View>
				  		<View className='btn confirm' onClick={ this.handleConfirm.bind(this) }>确定</View>
				  	</View>
				  </AtModalContent>
				</AtModal>
			</View>
		)
	}
}

export default EditAddress