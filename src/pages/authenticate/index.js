import Taro, { Component } from '@tarojs/taro'
import { View, Image, Input } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { asyncLogin } from '@actions/authenticate'
import './index.scss'
import { login } from '@api/authenticate.js'
import Tool from '@utils/tools.js'
import { STATUS } from '@constants/status.js'

@connect(({ authenticate }) => ({
  authenticate
}), (dispatch) => ({
  asyncLogin (user) {
    return dispatch(asyncLogin(user)).then((data) => {
    	return data
    })
  }
}))
class Authenticate extends Component {

	constructor () {
		super(...arguments)
		this.state = {
			type: 'login',
			form: {
				phone: '',
				password: '',
				passwordAgain: ''
			}
		}
		this.authenticate = this.authenticate.bind(this)
	}

	componentDidMount () {
		let { type } = this.$router.params
		type && this.setState({
			type
		})
	}

	render () {

		return (
			<View className='authenticate-wrapper'>
				<View className='phone-wrapper wrapper'>
					<View className='icon phone'></View>
					<Input placeholder='请输入手机号' className='input phone' onChange={this.handleChange.bind(this, 'phone')}></Input>
				</View>
				<View className='password-wrapper wrapper'>
					<View className='icon password'></View>
					<Input placeholder='请输入密码' className='input password' onChange={this.handleChange.bind(this, 'password')}></Input>
				</View>
				<View className={'password-wrapper wrapper ' + (this.isLogin() ? 'hidden' : 'visiably')}>
					<View className='icon password'></View>
					<Input placeholder='请再次输入密码' className='input password' onChange={this.handleChange.bind( this,'passwordAgain')}></Input>
				</View>
				<View className='password-again'></View>
				<View className='forget-password'></View>
				<View className='authenticate-btn' onClick={ this.authenticate }>{ this.isLogin() ? '登陆' : '注册' }</View>
			</View>
		)
	}

	isLogin () {
		return (this.state.type === 'login') ? true : false
	}

	async authenticate () {
		this.props.asyncLogin({
			phone: this.state.form.phone,
			password: this.state.form.password
		}).then((userInfo) => {
			if (userInfo) {
				Tool.saveStorage(STATUS.USER_INFO, userInfo)
				Taro.switchTab({
				  url: '/pages/home/index'
				})
			}
		})
	}

	handleChange (key, event) {

		let { form } = this.state
		Object.keys(form).forEach(item => {
			if (key === item) {
				form[item] = event.target.value
                this.setState({form: form})
			}
		})
	}
}

export default Authenticate