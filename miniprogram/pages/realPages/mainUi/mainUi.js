// pages/realPages/mainUi/mainUi.js
const db = wx.cloud.database()
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _openid: "",
    date: "",
    calorie_taken_in: 0,
    calorie_burned: 0,
    calorie_potential: 2000,
    messageOfBreakfast: 0,
    messageOfLunch: 0,
    messageOfDinner: 0,
    messageOfOther: 0,
    messageOfExercise: 0,
    datalist: [],
    breakfast: [],
    lunch: [],
    dinner: [],
    other: [],


    // 展开折叠
    selectedFlag: [false, false, false, false, false]

  },

  // 展开折叠选择  
  changeToggle: function (e) {
    console.log("执行changeToggle")
    var index = e.currentTarget.dataset.index;
    if (this.data.selectedFlag[index]) {
      this.data.selectedFlag[index] = false;
    } else {
      this.data.selectedFlag[index] = true;
    }
    this.setData({
      selectedFlag: this.data.selectedFlag
    })
  },

  //点击日期组件确定事件  
  bindDateChange: function (e) {
    console.log("执行bindDateChange")
    this.setData({
      date: e.detail.value
    })
  },

  goToAnalysisPage: function () {
    wx.navigateTo({
      url: '../../../pages/realPages/analysis/analysis',
    })
  },

  updateBg() {
    console.log("执行updateBg")
    let that = this;
    var time = util.formatDate(new Date());
    that.setData({
      _openid: getApp().globalData._openid,
      date: time
    })
    wx.cloud.database().collection("userMenu").where({
      _openid: that.data.open_id, // wtf??
      date: that.data.date
    }).get().then(res => {
      console.log("请求成功", res)
      that.setData({
        datalist: res.data,
        breakfast: res.data[0].breakfast,
        lunch: res.data[0].lunch,
        dinner: res.data[0].dinner,
        other: res.data[0].other,
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("执行onLoad")
    this.updateBg();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("执行onReady")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("执行onShow")
    this.updateBg();
    let that = this;
    //计算message
    console.log("计算message")
    if (that.data.breakfast.length > 0) {
      //console.log("运行至此")
      var temp = 0;
      for (var i = 0; i < that.data.breakfast.length; i++) {
        temp += that.data.breakfast[i].heat * Number(that.data.breakfast[i].weight) / Number(that.data.breakfast[i].amount);
      }
      that.setData({
        messageOfBreakfast: temp
      })
    }
    if (that.data.lunch.length != 0) {
      //console.log("运行至此")
      var temp = 0;
      for (var i = 0; i < that.data.lunch.length; i++) {
        temp += that.data.lunch[i].heat * Number(that.data.lunch[i].weight) / Number(that.data.lunch[i].amount);
      }
      that.setData({
        messageOfLunch: temp
      })
    }
    if (that.data.dinner.length != 0) {
      //console.log("运行至此")
      var temp = 0;
      for (var i = 0; i < that.data.dinner.length; i++) {
        temp += that.data.dinner[i].heat * Number(that.data.dinner[i].weight) / Number(that.data.dinner[i].amount);
      }
      that.setData({
        messageOfDinner: temp
      })
    }
    if (that.data.other.length != 0) {
      //console.log("运行至此")
      var temp = 0;
      for (var i = 0; i < that.data.other.length; i++) {
        temp += that.data.other[i].heat * Number(that.data.other[i].weight) / Number(that.data.other[i].amount);
      }
      that.setData({
        messageOfOther: temp
      })
    }
    that.setData({
      calorie_taken_in: that.data.messageOfBreakfast + that.data.messageOfLunch + that.data.messageOfDinner + that.data.messageOfOther,
      calorie_burned: that.data.messageOfExercise,
      calorie_potential: 2000 - that.data.calorie_taken_in,
    })
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

  },
})