const DataBase_all = wx.cloud.database().collection("all_data")
const DataBase_userMenu = wx.cloud.database().collection("userMenu")
var util = require('../../../utils/util.js')
var app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
      navbar:['常见','收藏','自定义'],
      currentTab:0,
      cloud_list:[],
      multiArray:[['今天','昨天','前天'],['早餐','中餐','晚餐','加餐']],
      multiIndex: [0, 0],
      current_weight:0,
      food_name:null,
      food_heat:null,
      food_id:"",
      open_id:null,
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
  //负责模态框的时间和早午晚餐选择
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  go_to_specific:function(){
    let that=this;
    wx.navigateTo({
      url: '/pages/realPages/specific/specific?id='+that.data.food_id,
    })
  },
  //负责模态框的展示与否
  showModal:function(e) {
    console.log(e);
    this.setData({
      modalName: e.currentTarget.dataset.target,
      food_name: e.currentTarget.dataset.name,
      food_heat: e.currentTarget.dataset.heat,
      food_id:e.currentTarget.dataset.id
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  addData(){
    let that = this
    this.setData({
      modalName: null
    })
    DataBase_userMenu.where({openid:that.data.open_id,date:that.data.current_date}).get({
      success(res){
        var list_tmp;
        if(meal_time == 1){
          list_tmp = res.data[0].breakfast
        }
        else if(meal_time == 2){
          list_tmp = res.data[0].lunch
        }
        else if(meal_time == 3){
          list_tmp = res.data[0].dinner
        }
        else{
          list_tmp = res.data[0].other
        }
        list_tmp.add({heat,food_name,food_weight})
        console.log(list_tmp)
      },
      fail(res){
        console.log("添加失败",res)
      }
    })
      
    DataBase_all.add({
      data:{
        opid:that.data.open_id,
        date:that.data.current_date,
        meal_time:that.data.multiIndex[1]+1,
        food_name:that.data.food_name,
        food_heat:that.data.food_heat,
        weight:that.data.current_weight
      },
      success(res){
        console.log("添加成功",res)
      },
      fail(res){
        console.log("添加失败",res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var time = util.formatDate(new Date());
    this.setData({
      current_date:time
    })
    let that=this;
    wx.cloud.callFunction({
      name:"get_openid",
      success(res){
        console.log("获取openid成功")
        var openid_tmp = res.result.openid
        that.setData({
          open_id: res.result.openid
        })
        console.log(that.data.open_id)
      },fail(res){
        console.log("获取openid失败",res)
      }
    })
    
    wx.cloud.database().collection("food_list").get({
      success(res){
        console.log("请求成功",res);
        that.setData({
          cloud_list:res.data
        })
      },
      fail(res){
        console.log("请求失败",res);
      }
    })
  },
  
  tapKey:function(event){
    var x = event.currentTarget.dataset.key
    this.setData({
      current_weight:this.data.current_weight=='0'? x:this.data.current_weight + x
    })
  },
  tapDel:function(event){
    if(this.data.current_weight==0)return 
    this.setData({
      current_weight: this.data.current_weight.length == 1? '0': this.data.current_weight.substring(0, this.data.current_weight.length - 1)
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

  }
})