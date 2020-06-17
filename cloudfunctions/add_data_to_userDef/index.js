// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  if(event.sport == true){
    try{
      return await db.collection("user_defined").where({
        _openid:event._openid
      }).update({
        data:{
          user_sport_list:event.list_tmp
        }
      })
    }catch(e){
      console.error(e)
    }
  }
  else{
    try{
      return await db.collection("user_defined").where({
        _openid:event._openid
      }).update({
        data:{
          userDefined_list:event.list_tmp
        }
      })
    }catch(e){
      console.error(e)
    }
  }
}