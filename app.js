//app.js
App({
  // API_URL: 'http://l0r7zf1.hk1.mofasuidao.cn/',
  // API_URL: 'http://k4vyvv8.hk1.mofasuidao.cn/',
  API_URL: 'https://www.gxtingche.com/',
  APP_ID: 'APPID12345',
  APP_SECRET: 'APPSECRET12345',
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null
  }
})
