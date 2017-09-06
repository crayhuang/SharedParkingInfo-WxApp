import { $wuxPicker, $wuxPickerCity } from '../components/wux'

var show = false;
var item = {};

Page({
    onLoad: function() {
        
    },
    onTapCity() {
		$wuxPickerCity.init('city', {
			title: '请选择目的地', 
			value: [8, 0, 11],
		    onChange(p) {
		    	console.log(p)
				this.setData({
					city: p.value
				})
			},
		})
	},
})