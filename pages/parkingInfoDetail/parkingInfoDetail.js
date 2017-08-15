var app = getApp()

Page({
    onLoad: function(options) {
        console.log(options.id)
        wx.request({
            url: app.API_URL + 'api/v1.0/parking_infos/' + options.id,
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: (res) => {
                this.setData({
                    parking_info: res.data.object
                })
            },
            fail: function() {
                // fail
            },
            complete: function() {
                // complete
            }
        })
    }
});