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
    },
    uuid: (len, radix) => {
      var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
      var uuid = [], i;
      radix = radix || chars.length;
     
      if (len) {
       // Compact form
       for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
      } else {
       // rfc4122, version 4 form
       var r;
     
       // rfc4122 requires these characters
       uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
       uuid[14] = '4';
     
       // Fill in random data. At i==19 set the high bits of clock sequence as
       // per rfc4122, sec. 4.1.5
       for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
         r = 0 | Math.random()*16;
         uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
       }
      }
     
      return uuid.join('') + '-' + new Date().getTime()
    },
    floatNumberOperator: {
        add: (arg1, arg2) => {
            var r1, r2, m, c
            try {
                r1 = arg1.toString().split(".")[1].length
            }
            catch (e) {
                r1 = 0;
            }
            try {
                r2 = arg2.toString().split(".")[1].length
            }
            catch (e) {
                r2 = 0
            }
            c = Math.abs(r1 - r2)
            m = Math.pow(10, Math.max(r1, r2))
            if (c > 0) {
                var cm = Math.pow(10, c)
                if (r1 > r2) {
                    arg1 = Number(arg1.toString().replace(".", ""))
                    arg2 = Number(arg2.toString().replace(".", "")) * cm
                } else {
                    arg1 = Number(arg1.toString().replace(".", "")) * cm
                    arg2 = Number(arg2.toString().replace(".", ""))
                }
            } else {
                arg1 = Number(arg1.toString().replace(".", ""))
                arg2 = Number(arg2.toString().replace(".", ""))
            }
            return (arg1 + arg2) / m
        },
        sub: (arg1, arg2) => {
            var r1, r2, m, n
            try {
                r1 = arg1.toString().split(".")[1].length
            }
            catch (e) {
                r1 = 0
            }
            try {
                r2 = arg2.toString().split(".")[1].length
            }
            catch (e) {
                r2 = 0
            }
            m = Math.pow(10, Math.max(r1, r2)) //last modify by deeka //动态控制精度长度
            n = (r1 >= r2) ? r1 : r2
            return ((arg1 * m - arg2 * m) / m).toFixed(n)
        },
        mul: (arg1, arg2)=> {
            var m = 0, s1 = arg1.toString(), s2 = arg2.toString()
            try {
                m += s1.split(".")[1].length
            }
            catch (e) {
            }
            try {
                m += s2.split(".")[1].length
            }
            catch (e) {
            }
            return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
        },  
        div: (arg1, arg2) => {
            var t1 = 0, t2 = 0, r1, r2
            try {
                t1 = arg1.toString().split(".")[1].length
            }
            catch (e) {
            }
            try {
                t2 = arg2.toString().split(".")[1].length
            }
            catch (e) {
            }
            r1 = Number(arg1.toString().replace(".", ""))
            r2 = Number(arg2.toString().replace(".", ""))
            return (r1 / r2) * pow(10, t2 - t1)
        }
    }
}

export default Tool