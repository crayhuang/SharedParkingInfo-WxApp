import { $wuxButton } from '../components/wux'

var base64 = require("../images/base64");
var app = getApp()

Page({
  onLoad: function () {
    this.initButton()
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
  initButton(position = 'bottomRight') {
		this.setData({
			opened: 1, 
		})

		this.button = $wuxButton.init('br', {
			position: position, 
			buttons: [
				{
					label: '提交停车信息', 
					icon: "../images/submit-info-icon.png", 
				},
				{
					label: '打赏', 
					icon: "../images/reward-icon.png", 
				},
				{
					label: '感谢支持列表', 
					icon: "../images/thanks-list-icon.png", 
				}
			],
			buttonClicked(index, item) {
				index === 0 && wx.showModal({
					title: 'Thank you for your support!', 
					showCancel: !1, 
				})

				index === 1 && wx.switchTab({
					url: '/pages/about/index'
				})

				index === 2 && wx.switchTab({
					url: '/pages/index/index'
				})

				return true
			},
			callback(vm, opened) {
				vm.setData({
					opened, 
				})
			},
		})
	},
	switchChange(e) {
		e.detail.value ? this.button.open() : this.button.close()
	},
	pickerChange(e) {
		const index = e.detail.value
		const position = this.data.types[index]
		this.initButton(position)
	},
})
//获取应用实例
// var app = getApp()
// Page({
//   data: {
//     motto: 'Hello World',
//     userInfo: {}
//   },
//   //事件处理函数
//   bindViewTap: function () {
//     wx.navigateTo({
//       url: '../parkingInfoList/parkingInfoList'
//     })
//   },
//   onLoad: function () {
//     console.log('onLoad')
//     var that = this
//     调用应用实例的方法获取全局数据
//     app.getUserInfo(function (userInfo) {
//       //更新数据
//       that.setData({
//         userInfo: userInfo
//       })
//     })
//   }
// })
	