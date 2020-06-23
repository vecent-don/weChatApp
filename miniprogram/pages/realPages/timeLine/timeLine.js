// miniprogram/pages/realPages/timeLine/timeLine.js
const DataBase_all = wx.cloud.database().collection("userTimeLine")
var util = require('../../../utils/util.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
       colorIcon:["cur cuIcon-noticefill"," text-red cuIcon-attentionforbidfill"," text-grey cuIcon-evaluate_fill","text-blue","text-pink cuIcon-lovefill","text-purple cuIcon-appreciatefill"],
       colorContent:["bg-green","bg-red","bg-grey","bg-blue","bg-pink","bg-purple"],
       cloud_list:[{date:"2019-10-4",weight:100},{date:"2019-10-4",weight:100},{date:"2019-10-4",weight:100},,{date:"2019-10-4",weight:100},{date:"2019-10-4",weight:100},,{date:"2019-10-4",weight:100}],
       description:["在今天体重变成了","wow,只有","朝着目标更近了，现在只有"],
       te:[{date:"2020-6-20"}],

  },

getNumber:function(i){
  // var number=Math.floor(Math.random()*i )
  console.log("randomNumber")
  return 0
},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var time = util.formatDate(new Date());
    var openid_tmp;
    this.setData({
      current_date:time
    })
    let that=this;
    wx.cloud.callFunction({
      name:"get_openid",
      success(res){
        console.log("获取openid成功")
        openid_tmp = res.result.openid
        console.log(openid_tmp)
        wx.cloud.database().collection("userTimeLine").where({
          _openid:  openid_tmp,
        }).get({
          success(res){
            console.log("请求成功",res);
            that.setData({
              cloud_list:res.data[0].history,
            })
            console.log("cloud")
          },
          fail(res){
            console.log("请求失败",res);
          }
        })
      },fail(res){
        console.log("获取openid失败",res)
      }
    })
    
    /*wx.cloud.database().collection("userTimeLine").where({
      _openid:  openid_tmp,
    }).get({
      success(res){
        console.log("请求成功",res);
        that.setData({
          cloud_list:res.data[0].history,
        })
        console.log("cloud")
      },
      fail(res){
        console.log("请求失败",res);
      }
    })*/
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