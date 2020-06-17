// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  if(event.meal_time == 0){
    try{
      return  await db.collection("userMenu").where({
        _openid:event._openid,
        date:event.date
      }).update({
        data:{
          sport:event.list_tmp
        }
      })
    }
    catch(e){ console.error(e)}
  }
  else if(event.meal_time == 1){
    try{
      return  await db.collection("userMenu").where({
        _openid:event._openid,
        date:event.date
      }).update({
        data:{
          breakfast:event.list_tmp
        }
      })
    }
    catch(e){ console.error(e)}
  }
  else if(event.meal_time == 2){
    try{
      return  await db.collection("userMenu").where({
        _openid:event._openid,
        date:event.date
      }).update({
        data:{
          lunch:event.list_tmp
        }
      })
    }
    catch(e){ console.error(e)}
  }
  else if(event.meal_time == 3){
    try{
      return  await db.collection("userMenu").where({
        _openid:event._openid,
        date:event.date
      }).update({
        data:{
          dinner:event.list_tmp
        }
      })
    }
    catch(e){ console.error(e)}
  }else{
    try{
      return  await db.collection("userMenu").where({
        _openid:event._openid,
        date:event.date
      }).update({
        data:{
          other:event.list_tmp
        }
      })
    }
    catch(e){ console.error(e)}
  }
}