// pages/realPages/analysis/analysis.js
Page({
  data: {

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

  // 展开折叠
    selectedFlag: [false, false, false, false],

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
  
  menuArrow: function (e) {
    this.setData({
      menuArrow: e.detail.value
    });
  },
  switchSex: function (e) {
    this.setData({
      skin: e.detail.value
    });
  }
})