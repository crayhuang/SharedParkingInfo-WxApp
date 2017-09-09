import {$wuxButton, $wuxLoading} from '../components/wux'

var base64 = require("../images/base64");
var app = getApp()

Page({
  onLoad: function () {
		$wuxLoading.show({
			text: '数据加载中'
		})
		this.button = $wuxButton.init('br')
    var cur_latitude
    var cur_longitude

    var that = this
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        cur_latitude = res.latitude
        cur_longitude = res.longitude
      },
      fail: function () {
        // fail
      },
      complete: function () {
        console.log("Latitude: " + cur_latitude)
        console.log("Longitude: " + cur_longitude)
        wx.request({
          url: app.API_URL + 'api/v1.0/parking_infos?latitude=' + cur_latitude + '&longitude=' + cur_longitude,
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: (res) => {
            that.setData({
              parking_info_list: res.data.object,
              icon20: base64.icon20,
              icon60: base64.icon60
						})
						$wuxLoading.hide()
          },
          fail: function () {
            // fail
          },
          complete: function () {
            // complete
          }
				})
      }
    })
  },
})