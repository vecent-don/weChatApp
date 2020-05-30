// pages/realPages/mainUi/mainUi.js

const DataBase_userMenu = wx.cloud.database().collection("userMenu")
const DataBase_favor =wx.cloud.database().collection("favor")
const DataBase_userDefined = wx.cloud.database().collection("user_defined")
const db = wx.cloud.database()
var util = require('../../../utils/util.js')
var app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    dates: '2020-05-18',
    calorie_taken_in: 0,
    calorie_burned: 0,
    calorie_potential: 2000,
    messageOfBreakfast:"未设置",
    messageOfLunch:"未设置",
    messageOfDinner:"未设置",
    messageOfExercise:"未设置",
    messageOfExture:"未设置",
    datalist:[],
    open_id:"",
    breakfastall:[],
    //breakfast
    list01: [
      { item_id: 1 }, { item_id: 11 }, { item_id: 11 },
    ],
    list02: [

    ],
    list03: [
      { item_id: 11 }, { item_id: 11 }
    ],
    list04: [
      { item_id: 11 }, { item_id: 11 }, { item_id: 11 }
    ],
    list05: [
      { item_id: 11 }, { item_id: 11 }, { item_id: 11 }
    ],
  
  
  // 展开折叠
     selectedFlag: [false, false, false, false, false]

  },

  dailyeating:function(){
    let that=this;
    DataBase_userMenu.where({
      _openid:that.data.open_id
    })
  },

  // 展开折叠选择  
  changeToggle:function(e){
    var index = e.currentTarget.dataset.index;
    if (this.data.selectedFlag[index]){
      this.data.selectedFlag[index] = false;
   }else{
      this.data.selectedFlag[index] = true;
    }

    this.setData({
      selectedFlag: this.data.selectedFlag
   })
  },

    //点击日期组件确定事件  
  bindDateChange: function (e) { 
    let that = this 
    this.setData({ 
      dates: e.detail.value 
    })  
    db.collection('userMenu').where({ 
      _openid:that.data.open_id, 
      date:that.data.dates 
    }).get({ 
      success(res){ 
        console.log(res) 
        that.setData({ 
          breakfast:res.data[0].breakfast, 
          lunch:res.data[0].lunch, 
          dinner:res.data[0].dinner, 
          other:res.data[0].other 
        }) 
      } 
    }) 
  }, 

  goToAnalysisPage:function(){
    wx.navigateTo({
      url: '../../../pages/realPages/analysis/analysis',
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this 
    var time = util.formatDate(new Date()); 
    this.setData({ 
      dates:time 
    }) 
    wx.cloud.callFunction({ 
      name:"get_openid", 
      success(res){ 
        console.log("获取openid成功") 
        getApp().globalData._openid = res.result.openid 
        that.setData({ 
          open_id: res.result.openid 
        }) 
      },fail(res){ 
        console.log("获取openid失败",res) 
      } 
    }) 
    console.log("here",app.globalData._openid,time)
    db.collection('userMenu').where({ 
      _openid:app.globalData._openid, 
      date:time
    }).get({ 
      success(res){ 
        console.log(res) 
        that.setData({ 
          breakfast:res.data[0].breakfast, 
          lunch:res.data[0].lunch, 
          dinner:res.data[0].dinner, 
          other:res.data[0].other 
        }) 
      },
      fail(res){
        console.log(res)
      } 
    })
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

  },
  getdata(){

    let that=this
    wx.cloud.database().collection("userMenu").get({
      success(res){
        console.log("请求成功",res)
        that.setData({
          datalist:res.data,
          breakfastall:res.data.breakfast
        })
      },
      fail(res){
        console.log("请求失败",res)
      }
    })
  }
})