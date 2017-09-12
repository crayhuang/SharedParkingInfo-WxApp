import {$wuxPicker, $wuxPickerCity, $wuxToptips} from '../components/wux'
import WxValidate from '../assets/plugins/WxValidate'

var crypto = require('../../utils/crypto-js')
var app = getApp()
var timestamp = Date.parse(new Date()) / 1000

var show = false;
var item = {};
var selected_city = {};

Page({
	data: {
		disabled: false
	},
    onLoad: function() {
		this.initValidate()
    },
    onTapCity(e) {
		$wuxPickerCity.init('city', {
			title: '请选择停车场所在地区', 
			value: [18, 0, 4],
		    onChange(p) {
				selected_city = p.value 
		    	console.log(p)
				this.setData({
					city: p.value
				})
			},
		})
	},
	showToptips(error) {
		const hideToptips = $wuxToptips.show({
			timer: 3000,
			text: error.msg || '请填写正确的字段',
			success: () => console.log('toptips', error)
		})
	},
	initValidate() {
		this.WxValidate = new WxValidate({
			name: {
				required: true,
			},
			address: {
				required: true,
			},
			fee: {
				required: true,
			}
		}, {
			name: {
				required: '请输入停车场名字',
			},
			address: {
				required: '请输入详细地址',
			},
			fee: {
				required: '请输入收费信息',
			}
		})
	},
	submitForm(e) {
		if (!this.WxValidate.checkForm(e)) {
			const error = this.WxValidate.errorList[0]
			this.showToptips(error)
			return false
		}
		const params = e.detail.value
		console.log(params);
		console.log(selected_city)

		params["province"] = selected_city[0]
		params["city"] = selected_city[1]
		params["district"] = selected_city[2]
		params["timestamp"] = timestamp
		params["sign"] = crypto.SHA1(timestamp + app.APP_ID + app.APP_SECRET).toString()
		
		console.log(params)
		wx.request({
            url: app.API_URL + 'api/v1.0/parking_infos',
            data: params,
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: (res) => {
				$wuxToptips.success({
					hidden: !0,
					text: "提交成功！"
				})
				this.setData({
					disabled: true
				})
				console.log("submit sucess!")
            }
        })
	}
})