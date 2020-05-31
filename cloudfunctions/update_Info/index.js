// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try{
   await db.collection("userInfo").where({
      _openid:wxContext.OPENID,
    }).update({
      data:{
        'nowWeight':event.nowWeight,
        'targetWeight': event.targetWeight,
        'height':event.height
      }
    })
    return await db.collection("userInfo").where({
      _openid:wxContext.OPENID,
    }).get()
  }catch(e){
    console.error(e)
  }

 
}