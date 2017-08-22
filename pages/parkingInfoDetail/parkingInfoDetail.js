var bmap = require('../../libs/bmap-wx.js');
var app = getApp()

Page({
    onLoad: function(options) {
        wx.request({
            url: app.API_URL + 'api/v1.0/parking_infos/' + options.id,
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: (res) => {
                var parking_info = res.data.object
                this.setData({
                    parking_info: parking_info,
                    markers: [{
                        latitude: parking_info.latitude,
                        longitude: parking_info.longitude,
                        name: parking_info.name,
                        desc: parking_info.description
                    }],
                    covers: [{
                        latitude: parking_info.latitude,
                        longitude: parking_info.longitude,
                        // iconPath: '../images/marker_red.png',
                        rotate: 10
                    }, {
                        latitude: parking_info.latitude,
                        longitude: parking_info.longitude,
                        // iconPath: '../images/marker_yellow.png',
                        rotate: 90
                    }]
                })
            }
        })
    },
    markertap: function(e) {
        var that = this
        console.log(e)
        wx.openLocation({
            latitude: Number(e.currentTarget.dataset.parkinginfo.latitude), // 纬度，范围为-90~90，负数表示南纬
            longitude: Number(e.currentTarget.dataset.parkinginfo.longitude), // 经度，范围为-180~180，负数表示西经
            scale: 16, // 缩放比例
            name: e.currentTarget.dataset.parkinginfo.name, // 位置名
            // address: 'address', // 地址的详细说明
            success: function(res){
                // success
            },
            fail: function() {
                // fail
            },
            complete: function() {
                // complete
            }
        }) 
    }
})

// var wxMarkerData = [];
// Page({
//     data: {
//         markers: [],
//         latitude: '',
//         longitude: '',
//         rgcData: {}
//     },
//     markertap: function(e) {
//         var that = this;
//         var id = e.markerId;
//         that.changeMarkerColor(wxMarkerData, id)
//     },
//     onLoad: function(options) {
//         console.log(options.id)
//         var that = this;
        
//         wx.request({
//             url: app.API_URL + 'api/v1.0/parking_infos/' + options.id,
//             data: {},
//             method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
//             // header: {}, // 设置请求的 header
//             success: (res) => {
//                 this.setData({
//                     parking_info: res.data.object
//                 })
//             },
//             fail: function() {
//                 // fail
//             },
//             complete: function() {
//                 // complete
//             }
//         })

//         var BMap = new bmap.BMapWX({
//             ak: 'GRAoA9p7mITR9L7pKsfPXFcbf0YgxbZp'
//         });

//         var fail = function(data) {
//             console.log(data)
//         };

//         var success = function(data) {
//             wxMarkerData = data.wxMarkerData;
//             console.log(wxMarkerData[0].longitude)
//         }
//         BMap.regeocoding({
//             fail: fail,
//             success: success,
//             iconPath: '../../img/marker_red.png', 
//             iconTapPath: '../../img/marker_red.png' 
//         });
//     },
//     changeMarkerColor: function(data, id) {
//         var that = this;
//         var markersTemp = [];
//         for (var i = 0; i < data.length; i++) {
//             if (i === id) {
//                 data[i].iconPath = "../../img/marker_yellow.png";
//             } else {
//                 data[i].iconPath = "../../img/marker_red.png";
//             }
//             markersTemp[i] = data[i];
//         }
//         that.setData({
//             markers: markersTemp
//         });
//     }
// });