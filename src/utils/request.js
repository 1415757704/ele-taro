import Taro from '@tarojs/taro'
import interceptors from '@/interceptor'

// 对于响应进行拦截
interceptors.forEach(interceptor => {
  Taro.addInterceptor(interceptor)
})

export const GET = async function(url, options) {
	let data = await fetch(url, options)
	return data
}

export const POST = async function (url, options) {
	let data = await fetch(url, options)
	return data
}

const fetch = async function(url, options = {}) {

	let {method = 'GET', data = '', contentType = 'application/json'} = options
	const option = {
		url: url,
		method,
		data,
		header: {
      		'content-type': contentType
    	}
	}

	return new Promise((resolve, reject) => {
		Taro.request(option).then(res => {
			resolve(res.data)
		}).catch(err => {
			reject(err)
		})
	})
}