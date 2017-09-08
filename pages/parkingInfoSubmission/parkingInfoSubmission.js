import {$wuxPicker, $wuxPickerCity, $wuxToptips} from '../components/wux'

var app = getApp()

var show = false;
var item = {};
var selected_city = {};

Page({
	data: {
		disabled: false
	},
    onLoad: function() {
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
	submitForm(e) {
		const params = e.detail.value
		console.log(params);
		console.log(selected_city)

		params["province"] = selected_city[0]
		params["city"] = selected_city[1]
		params["district"] = selected_city[2]
		
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