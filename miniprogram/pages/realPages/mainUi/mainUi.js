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
    messageOfBreakfast:0,
    messageOfLunch:0,
    messageOfDinner:0,
    messageOfExercise:0,
    messageOfExture:0,
    datalist:[],
    open_id:"",
    breakfastall:[],
    //breakfast
  
  
  // 展开折叠
     selectedFlag: [false, false, false, false, false]

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
        var breakfast_take_in = 0
        for(var i = 0;i<res.data[0].breakfast.length;i++){
          breakfast_take_in +=  Number(res.data[0].breakfast[i].heat)*Number(res.data[0].breakfast[i].weight)/ Number(res.data[0].breakfast[i].amount)
        }
        var lunch_take_in = 0
        for(var i = 0;i<res.data[0].lunch.length;i++){
          lunch_take_in +=  Number(res.data[0].lunch[i].heat)*Number(res.data[0].lunch[i].weight)/ Number(res.data[0].lunch[i].amount)
        }
        var dinner_take_in = 0
        for(var i = 0;i<res.data[0].dinner.length;i++){
          dinner_take_in +=  Number(res.data[0].dinner[i].heat)*Number(res.data[0].dinner[i].weight)/ Number(res.data[0].dinner[i].amount)
        }
        var other_take_in = 0
        for(var i = 0;i<res.data[0].other.length;i++){
          other_take_in +=  Number(res.data[0].other[i].heat)*Number(res.data[0].other[i].weight)/ Number(res.data[0].other[i].amount)
        }
        var take_in = breakfast_take_in+lunch_take_in+dinner_take_in+other_take_in
        that.setData({ 
          breakfast:res.data[0].breakfast, 
          lunch:res.data[0].lunch, 
          dinner:res.data[0].dinner, 
          other:res.data[0].other,
          messageOfBreakfast:breakfast_take_in,
          messageOfDinner:dinner_take_in,
          messageOfLunch:lunch_take_in,
          messageOfExture:other_take_in,
          calorie_taken_in: take_in
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
    let that = this
    console.log("here",app.globalData._openid)
    db.collection('userMenu').where({ 
      _openid:app.globalData._openid, 
      date:that.data.dates
    }).get({ 
      success(res){ 
        console.log(res) 
        var breakfast_take_in = 0
        for(var i = 0;i<res.data[0].breakfast.length;i++){
          breakfast_take_in +=  Number(res.data[0].breakfast[i].heat)*Number(res.data[0].breakfast[i].weight)/ Number(res.data[0].breakfast[i].amount)
        }
        var lunch_take_in = 0
        for(var i = 0;i<res.data[0].lunch.length;i++){
          lunch_take_in +=  Number(res.data[0].lunch[i].heat)*Number(res.data[0].lunch[i].weight)/ Number(res.data[0].lunch[i].amount)
        }
        var dinner_take_in = 0
        for(var i = 0;i<res.data[0].dinner.length;i++){
          dinner_take_in +=  Number(res.data[0].dinner[i].heat)*Number(res.data[0].dinner[i].weight)/ Number(res.data[0].dinner[i].amount)
        }
        var other_take_in = 0
        for(var i = 0;i<res.data[0].other.length;i++){
          other_take_in +=  Number(res.data[0].other[i].heat)*Number(res.data[0].other[i].weight)/ Number(res.data[0].other[i].amount)
        }
        var take_in = breakfast_take_in+lunch_take_in+dinner_take_in+other_take_in
        that.setData({ 
          breakfast:res.data[0].breakfast, 
          lunch:res.data[0].lunch, 
          dinner:res.data[0].dinner, 
          other:res.data[0].other ,
          messageOfBreakfast:breakfast_take_in,
          messageOfDinner:dinner_take_in,
          messageOfLunch:lunch_take_in,
          messageOfExture:other_take_in,
          calorie_taken_in:take_in
        }) 
      },
      fail(res){
        console.log(res)
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