// pages/realPages/analysis/analysis.js
const DataBase_userPlanList = wx.cloud.database().collection("userPlanList")
Page({
  data: {
    display:[],
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
    in:"请输入今日计划",
    history:["深蹲30个","跑步3千米","拉伸10分钟"],
    plan_list:[],
    open_id:null,
    showView:false,
    long_plan:[{'show':'inlne-block'},{'show':'inlne-block'},{'show':'inlne-block'}],
  // 展开折叠
    selectedFlag: [false, false, false, false],

  },
  hideLongPlan:function(e){
    var t="long_plan["+e.currentTarget.dataset.index+"].v"
    this.setData({
      [t]:e.detail.value
    })
    console.log(e,this.data.long_plan)
  },
  switchChange:function(e){
    console.log(e)
    if(e.detail.value==true){
      var t="long_plan["+e.currentTarget.dataset.index+"].show"
      this.setData({
        [t]:'none'
      })
      console.log(this.data.long_plan)
    }
  },
  add2:function(e){
    var t="long_plan["+this.data.long_plan.length+"]"
    this.setData({
      [t]:{show:'inlne-block'}
    })

console.log(this.data.long_plan)
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
  add:function(e){
    console.log(e)
    this.setData({
      modalName: e.currentTarget.dataset.target,
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  user_plan(e){
    this.setData({
      user_def_plan:e.detail.value
    })
  },
  user_define(){
    let that = this
    DataBase_userPlanList.where({
      _openid:that.data.open_id
    }).get({
      success(res){
        var list_tmp_plan=res.data[0].plan
        //var list_tmp_plan = res.data[0].userDefined_listplan
        list_tmp_plan.push({name:that.data.user_def_plan,completed:false})
       // list_tmp_plan.push({name:that.data.user_def_name,heat:that.data.user_def_heat,unit:that.data.user_def_unit,amount:that.data.user_def_amount})
        console.log(list_tmp_plan)
        that.setData({
          plan:list_tmp_plan
         })
        wx.cloud.callFunction({
          name:'add_to_plan',
          data:{
            list_tmp_plan:list_tmp_plan,
            _openid:that.data.open_id
          },
          success(res){
            console.log(res)
          }
        })
      }
    })
    that.hideModal()
  },
  user_plan_long(e){
    this.setData({
      user_def_plan_long:e.detail.value
    })
  },

  user_define_(){
    let that = this
    DataBase_userPlanList.where({
      _openid:that.data.open_id
    }).get({
      success(res){
        var list_tmp_plan=res.data[0].plan_long
        list_tmp_plan.push({name:that.data.user_def_plan_long,completed:false})
        console.log(list_tmp_plan)
        that.setData({
          plan_long:list_tmp_plan
         })
        wx.cloud.callFunction({
          name:'add_to_plan',
          data:{
            list_tmp_plan:list_tmp_plan,
            _openid:that.data.open_id
          },
          success(res){
            console.log(res)
          }
        })
      }
    })
    that.hideModal()
  },

  toHide:function(){
    var that=this;

    that.setData({
      completed:(!that.data.completed)

    })
    DataBase_userPlanList.where({
      _openid:that.data.open_id
    }).get({
      success(res){
        var list_tmp_plan=res.data[0].plan
        list_tmp_plan.push({name:that.data.user_def_plan,completed:false})
        console.log(list_tmp_plan)
        that.setData({
          plan:list_tmp_plan
         })
        wx.cloud.callFunction({
          name:'add_to_plan',
          data:{
            list_tmp_plan:list_tmp_plan,
            _openid:that.data.open_id
          },
          success(res){
            console.log(res)
          }
        })
      }
    })
  },
  
  menuArrow: function (e) {
    this.setData({
      menuArrow: e.detail.value
    });
  },
  switchSex: function (e) {
    this.setData({
      skin: e.detail.value
    });
  },
  
  onLoad: function (options) {
    let that=this;
    showView:(options.showView=="true"?true:false)
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
    DataBase_userPlanList.where({
      _openid:that.data.open_id
    }).get({
      success(res){
        console.log("user",res)
        that.setData({
          plan:res.data[0].plan
        })
      }
    })
  }
})