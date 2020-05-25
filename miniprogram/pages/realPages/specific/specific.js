import * as echarts from "../../../ec-canvas/echarts"

function initChart(canvas, width, height) {
	const chart = echarts.init(canvas, null, {
	width: width,
	height: height
	});
	canvas.setChart(chart);
	
	var option = {
		tooltip: {
			trigger: 'item',
			formatter: '{a} <br/>{b}: {c} ({d}%)'
	},
	legend: {
			orient: 'vertical',
			left: 10,
			data: ['碳水化合物', '蛋白质', '脂肪']
	},
	series: [
			{
					name: '营养元素',
					type: 'pie',
					radius: ['50%', '70%'],
					avoidLabelOverlap: false,
					label: {
							show: false,
							position: 'center'
					},
					emphasis: {
							label: {
									show: true,
									fontSize: '30',
									fontWeight: 'bold'
							}
					},
					labelLine: {
							show: false
					},
					data: [
							{value: 335, name: '碳水化合物'},
							{value: 310, name: '蛋白质'},
							{value: 230, name: '脂肪'}
					]
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
		ec: {
			onInit: initChart
		 }
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

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