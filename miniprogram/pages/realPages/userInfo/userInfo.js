


var util = require('../../../utils/util.js')
const DataBase_user = wx.cloud.database().collection("userInfo")
 var app = getApp()
Page({
  data: {
    modalName:null,
    nowWeight: 0,
    targetWeight: -1,
    height:0,
    BMI: 0,
    motto: 'Hello---- World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    cloud_List:[{date:"2020-5-11"},{date:"2020-6-24"}],
  },
  watch:{
    
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    let that=this
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    var temp={}
   console.log(app.globalData)
     wx.cloud.database().collection('userInfo').where({_openid:app.globalData.ids.openid}).get()
    .then(res=>{
      temp=res.data[0];
      console.log(res,temp)
      this.setData({
        'nowWeight':temp.nowWeight,
        'targetWeight':temp.targetWeight,
        'BMI':(temp.nowWeight/(temp.height*temp.height/10000)).toFixed(2)
      })
   
      console.log(this.BMI)
    }).catch(err=>{console.log(err)})
    ;
    wx.cloud.database().collection("userTimeLine").where({
      _openid: app.globalData.ids.openid,
    }).get({
      success(res) {
        console.log("请求成功",  res.data[0].reg)
        that.setData({
           cloud_List: res.data[0].reg,
        })
         console.log("ser",that.data.cloud_List)    
   
      },
      fail(res) {
        console.log("请求失败", res)
      }
    })
   
  },
   onReady: function () {  
    // wx.cloud.database().collection('userInfo').where({openid:app.globalData.ids.openid}).get()
    // .then(res=>{
    //   temp=res.data[0];
      
    //   this.setData({
    //     'nowWeight':temp.nowWeight,
    //     'targetWeight':temp.targetWeight,
    //     'BMI':(temp.nowWeight/(temp.height*temp.height/10000)).toFixed(2)
    //   })
   
    //   console.log(this.BMI)
    // }).catch(err=>{console.log(err)})
  },

  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  showModal:function(e) {
    console.log(e);
    this.setData({
      modalName: e.currentTarget.dataset.target,
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  
  getInput_nowWeight:function(e){
    this.setData({
      nowWeight: e.detail.value
    })
},
  getInput_targetWeight:function(e){
  this.setData({
    targetWeight: e.detail.value
  })
},
  getInput_height:function(e){
  this.setData({
    height: e.detail.value
  })
},
  addData(){
    let that = this
    this.setData({
      modalName: null,
      BMI:(this.data.nowWeight/(this.data.height*this.data.height/10000)).toFixed(2)
    })
    wx.cloud.callFunction({
    name:'update_Info',
    data:{
      'nowWeight':that.data.nowWeight,
      'targetWeight': that.data.targetWeight,
      'height':that.data.height
    },
  }).then(res=>{
  console.log("dsd")
  console.log(res)
  });

  // 'date':util.formatDate(new Date()),
    wx.cloud.callFunction({
    name:'update_TimeLine',
    data:{ 
     "nowWeight": that.data.nowWeight,
     "date": util.formatDate(new Date()),    
    },
    }).then(res=>{
      console.log("sd")
      console.log(res)
    });

    },
});
