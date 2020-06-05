// miniprogram/pages/realPages/weightAnalysis/weightAnalysis.js.js
import * as echarts from "../../../ec-canvas/echarts"
var chart = null
function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
	canvas.setChart(chart);
	
	option = {
    tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
    },
    toolbox: {
        feature: {
            restore: {},
            saveAsImage: {}
        }
    },
    series: [
        {
            name: 'BMI分析',
            type: 'gauge',
            detail: {formatter: '{value}%'},
            data: [{value: 50, name: '健康值'}]
        }
    ]
};
	chart.setOption(option);
	return chart;
 }
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		ecx: {
			onInit: initChart
		 },
		grade:0,
		state:""
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
			let rate=options.rate
			let tem_grade=0
			let tem_state=""
			if(rate<=23.9&&rate>=17.9){
				tem_grade=100
				tem_state="正常"
			}else if(rate<17.9){
				tem_grade=80
				tem_state="低体重"
			}else if(rate<=27.9&&rate>23.9){
				tem_grade=80
				tem_state="超重"
			}else{
				tem_grade=60
				tem_state="肥胖"
			}
			this.setData({
				grade:tem_grade,
				state:tem_state
			})
			// console.log(this.data.grade)
			// console.log(this.data.state)
			this.getNewData()
	},
	getNewData(){
		var option = {
			tooltip: {
					formatter: '{a} <br/>{b} : {c}%'
			},
			toolbox: {
					feature: {
							restore: {},
							saveAsImage: {}
					}
			},
			series: [
					{
							name: 'BMI分析',
							type: 'gauge',
							detail: {formatter: '{value}%'},
							data: [{value: this.data.grade, name: '健康值'}]
					}
			]
	};
		setTimeout(()=>{
      chart.clear()
      chart.setOption(option);
    },500)
  },
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})