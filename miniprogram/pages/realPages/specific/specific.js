import * as echarts from "../../../ec-canvas/echarts"
const app = getApp();
var chart = null
function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
	canvas.setChart(chart);
	
	var option = {
		tooltip: {
			trigger: 'item',
			formatter: '{a} -{b}: {c} ({d}%)'
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
							{value: 1, name: '碳水化合物'},
							{value: 1, name: '蛋白质'},
							{value: 1, name: '脂肪'}
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
		 },
		 current_id:"",
		 xcarbohydrate:-1,
		 xprotein:-1,
		 xfat:-1,
		 xsuggest:"",
		 xname:"",
		 heartUrl:"../../../images/like_untouched.png"
	},
	favor(){
		if(this.data.heartUrl=="../../../images/like_untouched.png"){
			// console.log("1")
			this.setData({
				heartUrl:"../../../images/like.png"
			})
		}else{
			this.setData({
					heartUrl:"../../../images/like_untouched.png"
			})
		
		}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
			// console.log(options)
			this.setData({
				current_id:options.id
			})
			// console.log(this.data.current_id)
			const db = wx.cloud.database()
			let xx=this
			db.collection('food_list').doc(this.data.current_id).get({
				success: function(res) {
					// res.data 包含该记录的数据
					// console.log(res.data)
					xx.setData({
						xcarbohydrate:res.data.carbohydrate,
						xprotein:res.data.protein,
						xfat:res.data.fat,
						xsuggest:res.data.suggestion,
						xname:res.data.name
					})
					console.log(xx.data.xfat)
				},
				fail:function(res){
					console.log("fail",res)
				},
				complete:function(res){
					// console.log(xx.data.xcarbohydrate)
					xx.getNewData()
				}
			})
			// console.log("here")
			// console.log(this.data.xcarbohydrate)
			// this.getNewData()
	},
	getNewData(){
		var option = {
			tooltip: {
				trigger: 'item',
				formatter: '{a} -{b}: {c} ({d}%)'
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
								{value: this.data.xcarbohydrate, name: '碳水化合物'},
								{value: this.data.xprotein, name: '蛋白质'},
								{value: this.data.xfat, name: '脂肪'}
						]
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