import * as echarts from "../../../ec-canvas/echarts"
const app = getApp();
const DataBase_favor = wx.cloud.database().collection("favor")
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
		 xheat:0,
		 xamount:0,
		 xunit:"g",
		 heartUrl:"../../../images/like_untouched.png"
	},
	favor(){
		let that = this
		if(this.data.heartUrl=="../../../images/like_untouched.png"){
			// console.log("1")
			this.setData({
				heartUrl:"../../../images/like.png"
			})
			DataBase_favor.where({
				_openid:that.data.open_id
			}).get({
				success(res){
					var list_tmp = res.data[0].food_list
					list_tmp.push({name:that.data.xname,heat:that.data.xheat,id:that.data.current_id,amount:that.data.xamount,unit:that.data.xunit,ishealthy:that.data.xhealthy})
					console.log(list_tmp)
					wx.cloud.callFunction({
						name:"update_favor",
						data:{
							list_tmp:list_tmp,
							_openid:that.data.open_id
						},
						success(res){
							console.log("成功",res)
						},
						fail(res){
							console.log(res)
						}
					})
				}
			})
		}else{
			this.setData({
					heartUrl:"../../../images/like_untouched.png"
			})
			DataBase_favor.where({
				_openid:that.data.open_id
			}).get({
				success(res){
					var list_tmp = res.data[0].food_list
					for(var i = 0;i<list_tmp.length;i++){
						if(list_tmp[i].id == that.data.current_id){
							list_tmp.splice(i,1)
							break
						}
					}
					wx.cloud.callFunction({
						name:"update_favor",
						data:{
							list_tmp:list_tmp,
							_openid:that.data.open_id
						},
						success(res){
							console.log("成功",res)
						},
						fail(res){
							console.log(res)
						}
					})
				}
			})
		}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
			console.log(options)
			this.setData({
				current_id:options.id
			})
			// console.log(this.data.current_id)
			const db = wx.cloud.database()
			let xx=this
			wx.cloud.callFunction({
				name:"get_openid",
				success(res){
					console.log("获取openid成功")
					var openid_tmp = res.result.openid
					xx.setData({
						open_id: res.result.openid
					})
				},fail(res){
					console.log("获取openid失败",res)
				}
			})
			db.collection('food_list').doc(this.data.current_id).get({
				success: function(res) {
					// res.data 包含该记录的数据
					// console.log(res.data)
					xx.setData({
						xcarbohydrate:res.data.carbohydrate,
						xprotein:res.data.protein,
						xfat:res.data.fat,
						xsuggest:res.data.suggestion,
						xname:res.data.name,
						xheat:res.data.heat,
						xamount:res.data.amount,
						xunit:res.data.unit,
						xhealthy:res.data.ishealthy
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
			console.log("查询数据库favor",app.globalData._openid)
			db.collection('favor').where({
				_openid:app.globalData._openid
			}).get({
				success(res){
					var like = false
					for(var i = 0;i < res.data[0].food_list.length;i++){
						if(res.data[0].food_list[i].id == xx.data.current_id){
							like = true
							break
						}
					}
					if(like){
						xx.setData({
							heartUrl:'../../../images/like.png'
						})
					}else{
						xx.setData({
							heartUrl:'../../../images/like_untouched.png'
						})
					}
				},
				fail(res){
					console.log(res)
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