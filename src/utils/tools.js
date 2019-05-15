let Tool = {
    saveStorage: (key, value) => {
        if (process.env.TARO_ENV === 'weapp') {
            wx.setStorage({
                key,
                data: value,
                success: (res) => {
                  console.log('save value', JSON.stringify(wx.getStorageSync(key)))
                }
            })
        } else {
            // h5 和 alipay
            localStorage.setItem(key, JSON.stringify(value));
            console.log('save value', JSON.parse(localStorage.getItem(key)))
        }
    },
    getStorage: (key, defaultVal) => {
        let value
        if (process.env.TARO_ENV === 'weapp') {
            value = wx.getStorageSync(key)
        } else {
            value = JSON.parse(localStorage.getItem(key))
        }
        return value ? value : defaultVal
    }
}

export default Tool