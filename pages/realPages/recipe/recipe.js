
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      navbar:['常见','收藏','自定义'],
      currentTab:0,
      food_list:[
        {name:"黄米",
         heat: 351,
         isHealthy:true,
        },
        {
          name:"番茄虾仁",
          heat:64,
          isHealthy:true,
        },
        {
          name:"白玉豆腐",
          heat: 75,
          isHealthy:false,
        },
        {
          name:"菠萝炒牛肉",
          heat: 81,
          isHealthy:true,
        },
        {
          name:"小葱拌牛肚",
          heat: 101,
          isHealthy:false,
        },
        {
          name:"砂锅豆腐",
          heat: 55,
          isHealthy:true,
        },
        {
          name:"洋姜",
          heat: 64 ,
          isHealthy: true,
        },
        {
          name:"小葱炒牛肉",
          heat: 100 ,
          isHealthy:false,
        },
        {
          name:"白炒虾球",
          heat: 102,
          isHealthy:false,
        },
        {
          name:"滑溜黄瓜猪里脊",
          heat: 128,
          isHealthy:true,
        },
        {
          name:"薏米炖鸭",
          heat: 83,
          isHealthy:false,
        },
        {
          name:"海米油菜芯",
          heat: 73,
          isHealthy: true,
        },
        {
          name:"韭苔",
          heat: 37,
          isHealthy:true,
        },
        {
          name:"纯净水",
          heat: 0,
          isHealthy: true,
        },
        {
          name:"牛蹄筋",
          heat: 151,
          isHealthy:true,
        },
      ]
  },
  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
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