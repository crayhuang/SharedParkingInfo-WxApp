import {$wuxButton, $wuxLoading} from '../components/wux'
var crypto = require('../../utils/crypto-js')

var base64 = require("../images/base64");
var app = getApp()
var timestamp = Date.parse(new Date()) / 1000; 

Page({
  onLoad: function () {
    this.button = $wuxButton.init('br');
    wx.getUserInfo({
      success: function(res){
        var user_info = res.userInfo
        var nick_name = user_info.nickName
        var avatar_url = user_info.avatarUrl
        var gender = user_info.gender
        var province = user_info.province
        var city = user_info.city
        var country = user_info.country

        const params = {}
        params['nick_name'] = nick_name
        params['avatar_url'] = avatar_url
        params['gender'] = gender
        params['province'] = province
        params['city'] = city
        params['country'] = country
        
        console.log("User Info: " + user_info.nickName)
        wx.request({
          url: app.API_URL + 'api/v1.0/user_info',
          data: params,
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
            console.log("log user info successfully!")
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
    getParkingInfoList(this)
  },
  search: function(e) {
    if (e.detail.value == null || e.detail.value == "") {
      getParkingInfoList(this)
    }
    else {
      $wuxLoading.show({
        text: '数据加载中'
      })
      var that = this
      wx.request({
        url: app.API_URL + 'api/v1.0/parking_infos/search',
        data: {
          keyword: e.detail.value,
          timestamp: timestamp,
          sign: crypto.SHA1(timestamp + app.APP_ID + app.APP_SECRET).toString()
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          that.setData({
            parking_info_list: res.data.object,
            icon20: base64.icon20,
            icon60: base64.icon60
          })
          $wuxLoading.hide()
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    }
  },
  onPullDownRefresh: function() {
    console.log("pull down refresh")
    getParkingInfoList(this)
  }
})

function getParkingInfoList(e) {
  $wuxLoading.show({
    text: '数据加载中'
  })
  var cur_latitude
  var cur_longitude

  var that = e
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
      wx.request({
        // url: app.API_URL + 'api/v1.0/parking_infos?latitude=' + cur_latitude + '&longitude=' + cur_longitude,
        url: app.API_URL + 'api/v1.0/parking_infos',
        data: {
          latitude: cur_latitude,
          longitude: cur_longitude,
          timestamp: timestamp,
          sign: crypto.SHA1(timestamp + app.APP_ID + app.APP_SECRET).toString()
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: (res) => {
          that.setData({
            parking_info_list: res.data.object,
            icon20: base64.icon20,
            icon60: base64.icon60
          })
          $wuxLoading.hide()
          wx.stopPullDownRefresh()
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
}