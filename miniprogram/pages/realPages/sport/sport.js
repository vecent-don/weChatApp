// miniprogram/pages/realPages/sport/sport.js
const db = wx.cloud.database()
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar:['常见','自定义'],
    currentTab:0,
    sport_list:[],
    multiArray:[['今天','昨天','前天']],
    multiIndex: [0],
    current_st:0,
    current_heat:0,
    default_icon:"cloud://nju-calorie-n006e.6e6a-nju-calorie-n006e-1302226680/运动图标/默认导航图.png"
  },
  add_user_def(e){
    console.log(e)
    this.setData({
      modalName: e.currentTarget.dataset.target,
    })
  },
  user_define_name(e){
    this.setData({
      user_def_name:e.detail.value
    })
  },
  user_define_heat(e){
    this.setData({
      user_def_heat:e.detail.value
    })
  },
  user_define(){
    let that = this
    db.collection('user_defined').where({
      _openid:that.data.open_id
    }).get({
      success(res){
        var list_tmp = res.data[0].user_sport_list
        list_tmp.push({name:that.data.user_def_name,heat:that.data.user_def_heat,icon_url:that.data.default_icon})
        console.log(list_tmp)
        that.setData({
          userDefined_list:list_tmp
        })
        wx.cloud.callFunction({
          name:'add_data_to_userDef',
          data:{
            sport:true,
            list_tmp:list_tmp,
            _openid:that.data.open_id
          },
          success(res){
            console.log(res)
            that.setData({
              user_sport_list:list_tmp
            })
          }
        })
      }
    })
    that.hideModal()
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
    db.collection('user_defined').where({
      _openid:that.data.open_id
    }).get({
      success(res){
        console.log(delete_name)
        var list_tmp=res.data[0].user_sport_list
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
          user_sport_list:list_tmp
        })
        console.log("删除后的数组",list_tmp)
        wx.cloud.callFunction({
          name:"add_data_to_userDef",
          data:{
            sport:true,
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
  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
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
  addDataToMenu(){
    console.log("调用新建数据方法")
    let that = this
    var list_tmp = [{heat:that.data.sport_heat,name:that.data.sport_name,time:that.data.current_st,cost_heat:that.data.current_heat,}]
    db.collection('userMenu').add({
       data:{
        breakfast:[],
        date:that.data.current_date,
        dinner:[],
        lunch:[],
        other:[],
        sport:list_tmp,
       },
       success(res){
         that.setData({
           current_st:0,
           current_heat:0,
        })
      },
    })
    
  },
  update_data_to_menu(){
    console.log("调用update_data_to_menu方法")
    let that = this;
    wx.cloud.callFunction({
      name:"update_db",
      data:{
        meal_time:0,
        date:that.data.current_date,
        list_tmp:that.data.list_tmp,
        _openid:that.data.open_id
      },
      success(res){
        console.log(res)
        that.setData({
          current_st:0,
          current_heat:0,
        })
      },
      fail(res){
        console.log(res)
      }
    })
  },
  addData(e){
    let that = this
    console.log(that.data.current_heat,that.data.current_st)
    var date = that.getDateStr(null,0-that.data.multiIndex[0])
    that.setData({
      meal_time:that.data.multiIndex[1]+1,
      modalName: null,
      current_date:date,
    })
    db.collection('userMenu').where({
      _openid:that.data.open_id,
      date:that.data.current_date
    }).get({
      success(res){
        if(res.data.length != 0){
          console.log("添加成功fuck here",res)
          var list_tmp = res.data[0].sport;
          list_tmp.push({heat:that.data.sport_heat,name:that.data.sport_name,time:that.data.current_st,cost_heat:that.data.current_heat,})
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
        console.log("调用失败")
      }
    })
  },
  showModal:function(e) {
    console.log(e.currentTarget.dataset);
    this.setData({
      modalName: e.currentTarget.dataset.target,
      sport_name: e.currentTarget.dataset.name,
      sport_heat: e.currentTarget.dataset.heat,
      sport_id:e.currentTarget.dataset.id,
      sport_icon:e.currentTarget.dataset.icon_url,
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null,
      current_st:0,
      current_heat:0,
    })
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  tapKey:function(event){
    var x = event.currentTarget.dataset.key
    var current_st = this.data.current_st=='0'? x:this.data.current_st + x
    this.setData({
      current_st:this.data.current_st=='0'? x:this.data.current_st + x,
      current_heat:parseInt(Number(current_st)*this.data.sport_heat/60),
    })
  },tapDel:function(event){
    if(this.data.current_st==0)return 
    var current_st = this.data.current_st.length == 1? '0': this.data.current_st.substring(0, this.data.current_st.length - 1)
    this.setData({
      current_st: this.data.current_st.length == 1? '0': this.data.current_st.substring(0, this.data.current_st.length - 1),
      current_heat:parseInt(current_st*this.data.sport_heat/60),
    })
  },tapC:function(event){
    this.setData({
      current_st:0,
      current_heat:0*this.data.sport_heat,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    db.collection("sport_list").get({
      success(res){
        that.setData({
          sport_list:res.data
        })
      }
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
    db.collection('user_defined').where({
      _openid:that.data.open_id
    }).get({
      success(res){
        console.log(res)
        if(res.data.length == 0){
          db.collection('user_defined').add({
            data:{
              userDefined_list:[],
              user_sport_list:[],
            }
          })
        }
      }
    })
    db.collection('user_defined').where({
      _openid:that.data.open_id
    }).get({
      success(res){
        that.setData({
          user_sport_list:res.data[0].user_sport_list
        })
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

  }
})