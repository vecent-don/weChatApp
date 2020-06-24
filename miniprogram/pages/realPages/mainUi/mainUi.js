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
    exercise: [],

    // 展开折叠
    selectedFlag: [false, false, false, false, false]
  },

  // 计算message
  calmessage() {
    console.log("计算message")
    let that = this;
    if (that.data.breakfast.length > 0) {
      //console.log("运行至此")
      var temp = 0;
      for (var i = 0; i < that.data.breakfast.length; i++) {
        temp += that.data.breakfast[i].heat * Number(that.data.breakfast[i].weight) / Number(that.data.breakfast[i].amount);
      }
      that.setData({
        messageOfBreakfast: temp.toFixed()
      })
    }
    if (that.data.lunch.length != 0) {
      //console.log("运行至此")
      var temp = 0;
      for (var i = 0; i < that.data.lunch.length; i++) {
        temp += that.data.lunch[i].heat * Number(that.data.lunch[i].weight) / Number(that.data.lunch[i].amount);
      }
      that.setData({
        messageOfLunch: temp.toFixed()
      })
    }
    if (that.data.dinner.length != 0) {
      //console.log("运行至此")
      var temp = 0;
      for (var i = 0; i < that.data.dinner.length; i++) {
        temp += that.data.dinner[i].heat * Number(that.data.dinner[i].weight) / Number(that.data.dinner[i].amount);
      }
      that.setData({
        messageOfDinner: temp.toFixed()
      })
    }
    if (that.data.other.length != 0) {
      //console.log("运行至此")
      var temp = 0;
      for (var i = 0; i < that.data.other.length; i++) {
        temp += that.data.other[i].heat * Number(that.data.other[i].weight) / Number(that.data.other[i].amount);
      }
      that.setData({
        messageOfOther: temp.toFixed()
      })
    }
    if (that.data.exercise.length != 0) {
      //console.log("运行至此")
      var temp = 0;
      for (var i = 0; i < that.data.exercise.length; i++) {
        temp += Number(that.data.exercise[i].heat);
      }
      that.setData({
        messageOfExercise: temp.toFixed()
      })
    }
    that.setData({
      calorie_taken_in: Number(that.data.messageOfBreakfast) + Number(that.data.messageOfLunch) + Number(that.data.messageOfDinner) + Number(that.data.messageOfOther),
      calorie_burned: that.data.messageOfExercise,
    })
    that.setData({
      calorie_potential: 2000 - Number(that.data.calorie_taken_in) + Number(that.data.calorie_burned),
    })
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

  // 点击日期组件确定事件  
  bindDateChange: function (e) {
    console.log("执行bindDateChange")
    this.setData({
      date: e.detail.value,
    })
  },

  // 前往分析界面
  goToAnalysisPage: function () {
    wx.navigateTo({
      url: '../../../pages/realPages/analysis/analysis',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("执行onLoad")
    var time = util.formatDate(new Date());
    this.setData({
      _openid: getApp().globalData._openid,
      date: time,
    })
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
    let that = this;
    // 请求数据
    wx.cloud.database().collection("userMenu").where({
      _openid: that.data.open_id, // wtf??
      date: that.data.date
    }).get({
      success(res) {
        console.log("请求成功", res)
        that.setData({
          datalist: res.data,
          breakfast: res.data[0].breakfast,
          lunch: res.data[0].lunch,
          dinner: res.data[0].dinner,
          other: res.data[0].other,
          exercise: res.data[0].sport
        })
        that.calmessage();
      }
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