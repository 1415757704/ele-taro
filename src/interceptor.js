import Taro from "@tarojs/taro";
import {HTTP_STATUS} from "./constants/status";

const requestInterceptor = function (chain) {
  const request = chain.requestParams
  return chain.proceed(request).then(res => {
    if (res.statusCode === HTTP_STATUS.NOT_FOUND_ERR) {
      return Promise.reject('没有找到对应资源')
    } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE){
      Taro.navigateTo({
        url: 'pages/login/login'
      })
      return Promise.reject('重新登陆')
    } else if (res.statusCode === HTTP_STATUS.FORBIDDEN){
      return Promise.reject('没有权限')
    } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY){
      return Promise.reject('服务器异常，稍后重试')
    } else if (res.statusCode === HTTP_STATUS.SUCCESS){
      return res
    }
  })
}

const interceptors = [requestInterceptor]
export default interceptors
