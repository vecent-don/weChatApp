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
      navbar:['常见','收藏','自定义'],
      currentTab:0,
      cloud_list:[],
      search_list:[],
      multiArray:[['今天','昨天','前天'],['早餐','中餐','晚餐','加餐']],
      multiIndex: [0, 0],
      current_weight:0,
      food_name:null,
      food_heat:null,
      open_id:null,
      the_only_id:0,
      food_id:"",
      food_unit:"100g"
  },
  search_food(e){
    var search_name = e.detail.value
    this.setData({
      search_name:search_name
    })
  },
  search_move(e){
    let that = this
    console.log("调用move")
    wx.cloud.callFunction({
      name:'search',
      data:{
        search_name:that.data.search_name
      },
      success(res){
        console.log(res)
        that.setData({
          search_list:res.result.data
         
        })
        console.log("here")
        console.log(res)
      },fail(res){
        console.log(res)
      }
    })
    that.setData({
      currentTab:3
    })
    
  },
  user_name(e){
    this.setData({
      user_def_name:e.detail.value
    })
  },user_define_amount(e){
    this.setData({
      user_def_amount:e.detail.value
    })
  },user_define_unit(e){
    this.setData({
      user_def_unit:e.detail.value
    })
  },user_define_heat(e){
    this.setData({
      user_def_heat:e.detail.value
    })
  },user_define(){
    let that = this
    DataBase_userDefined.where({
      _openid:that.data.open_id
    }).get({
      success(res){
        var list_tmp = res.data[0].userDefined_list
        list_tmp.push({name:that.data.user_def_name,heat:that.data.user_def_heat,unit:that.data.user_def_unit,amount:that.data.user_def_amount})
        console.log(list_tmp)
        that.setData({
          userDefined_list:list_tmp
        })
        wx.cloud.callFunction({
          name:'add_data_to_userDef',
          data:{
            sport:false,
            list_tmp:list_tmp,
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
  },go_to_specific:function(){
    let that=this;
    wx.navigateTo({
      url: '/pages/realPages/specific/specific?id='+that.data.food_id,
    })
  },//负责模态框的展示与否
  showModal:function(e) {
    console.log(e.currentTarget.dataset);
    this.setData({
      modalName: e.currentTarget.dataset.target,
      food_name: e.currentTarget.dataset.name,
      food_heat: e.currentTarget.dataset.heat,
      food_id:e.currentTarget.dataset.id,
      food_unit:e.currentTarget.dataset.unit,
      food_amount:e.currentTarget.dataset.amount,
      food_ishealthy:e.currentTarget.dataset.ishealthy,
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  jiafa(){
    var a =1+1
    console.log("测试调用函数？")
  },
  update_data_to_menu(){
    console.log("调用update_data_to_menu方法")
    let that = this;
    wx.cloud.callFunction({
      name:"update_db",
      data:{
        meal_time:that.data.meal_time,
        date:that.data.current_date,
        list_tmp:that.data.list_tmp,
        _openid:that.data.open_id
      },
      success(res){
        console.log(res)
        that.setData({
          current_weight:0
        })
      },
      fail(res){
        console.log(res)
      }
    })
  },
  getDateStr: function(today, addDayCount) {
    var date;
    if(today) {
      date = new Date(today);
    }else{
      date = new Date();
    }
    date.setDate(date.getDate() + addDayCount);//获取AddDayCount天后的日期 
      var y = date.getFullYear();
      var m = date.getMonth() + 1;//获取当前月份的日期 
      var d = date.getDate();
      if(m < 10){
        m = '0' + m;
      };
      if(d < 10) {
        d = '0' + d;
      };
      console.log( y + "-" + m + "-" + d)
      return y + "-" + m + "-" + d;
    },
  //新建数据
  addDataToMenu(){
    console.log("调用新建数据方法")
    let that = this
    var list_tmp = [{heat:that.data.food_heat,name:that.data.food_name,weight:that.data.current_weight,amount:that.data.food_amount,unit:that.data.food_unit,final_heat:Number(that.data.food_heat)*Number(that.data.current_weight)/Number(that.data.food_amount)}]
    var meal_time = this.data.meal_time
    if(meal_time == 1){
      DataBase_userMenu.add({
        data:{
          breakfast:list_tmp,
          date:that.data.current_date,
          dinner:[],
          lunch:[],
          other:[],
          sport:[],
        },
        success(res){
          that.setData({
            current_weight:0
          })
        },
      })
    }else if(meal_time == 2){
      DataBase_userMenu.add({
        data:{
          breakfast:[],
          date:that.data.current_date,
          dinner:[],
          lunch:list_tmp,
          other:[],
          sport:[],
        },
        success(res){
          that.setData({
            current_weight:0
          })
        },
      })
    }else if(meal_time == 3){
      DataBase_userMenu.add({
        data:{
          breakfast:[],
          date:that.data.current_date,
          dinner:list_tmp,
          lunch:[],
          other:[],
          sport:[],
        },
        success(res){
          that.setData({
            current_weight:0
          })
        },
      })
    }else{
      DataBase_userMenu.add({
        data:{
          breakfast:[],
          date:that.data.current_date,
          dinner:[],
          lunch:[],
          other:list_tmp,
          sport:[],
        },
        success(res){
          that.setData({
            current_weight:0
          })
        },
      })
    }
  },
  addData(){
    let that = this
    var date = that.getDateStr(null,0-that.data.multiIndex[0])
    var meal_time = that.data.multiIndex[1]+1
    that.setData({
      meal_time:that.data.multiIndex[1]+1,
      modalName: null,
      current_date:date,
    })
    DataBase_userMenu.where({
      _openid:that.data.open_id,
      date:that.data.current_date
    }).get({
      success(res){
        if(res.data.length != 0){
          console.log("添加成功fuck here",res)
          var list_tmp;

          if(meal_time == 1){ list_tmp = res.data[0].breakfast }
          else if(meal_time == 2){list_tmp = res.data[0].lunch }
          else if(meal_time == 3){list_tmp = res.data[0].dinner}
          else{list_tmp = res.data[0].other}
          list_tmp.push({heat:that.data.food_heat,name:that.data.food_name,weight:that.data.current_weight,amount:that.data.food_amount,unit:that.data.food_unit,final_heat:Number(that.data.food_heat)*Number(that.data.current_weight)/Number(that.data.food_amount)})
          that.setData({
            list_tmp:list_tmp
          })
          console.log(that.data.list_tmp)
          that.update_data_to_menu()
        }
        else{
          that.addDataToMenu();
        }
        console.log("??",list_tmp)
      },
      fail(res){
        console.log("添加失败",res)
      }
    })
  },
  add_user_def(e){
    console.log(e)
    this.setData({
      modalName: e.currentTarget.dataset.target,
    })
  },
  delete_item(e){
    this.setData({
      delete_name:e.currentTarget.dataset.name,
      modalName: "delete" ,
    })
  },
  delete_data(e){
    let that =this
    var delete_name = that.data.delete_name
    DataBase_userDefined.where({
      _openid:that.data.open_id
    }).get({
      success(res){
        console.log(delete_name)
        var list_tmp=res.data[0].userDefined_list
        console.log(list_tmp)
        for(var i = 0;i<list_tmp.length;i++){
          if(list_tmp[i].name == that.data.delete_name){
            if(list_tmp.length==1){
              list_tmp=[]
              break
            }
            list_tmp.splice(i,1)
            break
          }
        }
        that.setData({
          userDefined_list:list_tmp
        })
        console.log("删除后的数组",list_tmp)
        wx.cloud.callFunction({
          name:"add_data_to_userDef",
          data:{
            sport:false,
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
    that.hideModal();
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
        getApp().globalData._openid = res.result.openid
        that.setData({
          open_id: res.result.openid
        })
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
    DataBase_favor.where({
      _openid:that.data.open_id
    }).get({
      success(res){
        if(res.data.length == 0){
          DataBase_favor.add({
            data:{
              food_list:[]
            }
          })
        }
      }
    })
    DataBase_favor.where({
      _openid:that.data.open_id
    }).get({
      success(res){
        that.setData({
          favor_list:res.data[0].food_list
        })
      }
    })
    DataBase_userDefined.where({
      _openid:that.data.open_id
    }).get({
      success(res){
        if(res.data.length == 0){
          DataBase_userDefined.add({
            data:{
              userDefined_list:[],
              user_sport_list:[],
            }
          })
        }
      }
    })
    DataBase_userDefined.where({
      _openid:that.data.open_id
    }).get({
      success(res){
        console.log("user",res)
        that.setData({
          userDefined_list:res.data[0].userDefined_list
        })
      }
    })
  },tapKey:function(event){
    var x = event.currentTarget.dataset.key
    this.setData({
      current_weight:this.data.current_weight=='0'? x:this.data.current_weight + x
    })
  },tapDel:function(event){
    if(this.data.current_weight==0)return 
    this.setData({
      current_weight: this.data.current_weight.length == 1? '0': this.data.current_weight.substring(0, this.data.current_weight.length - 1)
    })
  },tapC:function(event){
    this.setData({
      current_weight:0
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

/*
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
]*/

//新建之后更新数据库
  /*
  update_db(){
    let that = this
    var the_only_id = that.data.the_only_id
    var meal_time = that.data.meal_time
    var list_tmp = that.data.list_tmp
    if(meal_time == 1){
      console.log("此处的openid",the_only_id)
      DataBase_userMenu.doc(the_only_id).update({
        data:{
          date:"1999" 
        },
        success(res){
          console.log("早餐修改",res)
        },fail(res){
          console.log("修改失败",res)
        }
      })
    }
    else if(meal_time == 2){
      DataBase_userMenu.doc(the_only_id).update({
        data:{
          lunch:list_tmp
        },
        success(res){
          console.log("午餐修改")
        }
      })
    }
    else if(meal_time == 3){
      DataBase_userMenu.doc(the_only_id).update({
        data:{
          dinner:list_tmp
        },
        success(res){
          console.log("晚餐修改")
        }
      })
    }
    else{
      DataBase_userMenu.doc(the_only_id).update({
        data:{
          other:list_tmp
        },
        success(res){ 
          console.log("其它修改")
        }
      })
    }
  },*/
  //新建当天用户数据
  /*
    user_menu_addtion(){
      let that = this
      DataBase_userMenu.add({
        data:{
          breakfast:[],
          date:that.data.current_date,
          dinner:[],
          lunch:[],
          other:[]
        },
        success(res){
          the_only_id = res._id
          console.log(the_only_id)
          that.setData({
            the_only_id:res.id
          })
        },
        fail(res){
          console.log("添加userMenu时失败")
        },
        complete(){
          that.update_db()
        }
      })
    */
   //一下是添加到另一个数据库中的代码，废弃
    /*DataBase_all.add({
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
    
  },*/