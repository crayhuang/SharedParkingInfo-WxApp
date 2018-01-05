import {$wuxPicker, $wuxPickerCity, $wuxToptips} from '../components/wux'
import WxValidate from '../assets/plugins/WxValidate'

var crypto = require('../../utils/crypto-js')
var app = getApp()
var timestamp = Date.parse(new Date()) / 1000

Page({
    data: {
        disabled: false
    },
    onLoad: function(options) {
        this.initValidate()
        this.setData({
            parking_info_id: options.parking_info_id,
            parking_info_name: options.parking_info_name
        })
    },
    initValidate() {
        this.WxValidate = new WxValidate({
            feedback_content: {
                require: true
            }
        }, {
            feedback_content: {
                required: '请输入反馈信息'
            }
        })
    },
    submitFomr(e) {
        if (!this.WxValidate.checkForm(e)) {
            const error = this.WxValidate.errorList[0]
            this.showToptips(error)
            return false;
        }
        this.setData({
            disabled: true
        })
        const params = e.detail.value
        params["sign"] = crypto.SHA1(timestamp + app.APP_ID + app.APP_SECRET).toString()
        wx.request({
            url: app.API_URL + 'api/v1.0/feedback',
            data: params,
            method: 'POST',
            success: (res) => {
                $wuxToptips.success({
                    hidden: !0,
                    text: "提交反馈成功！"
                })
                console.log("submit feedback success!")
            }
        })
    }
})