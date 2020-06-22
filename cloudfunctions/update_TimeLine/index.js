// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var temp;
  var temp1;
  console.log("here")
  console.log(wxContext.OPENID)
  temp=await db.collection("userTimeLine").where({
    _openid:wxContext.OPENID
  }).update({
    data:{
      history:_.pull({
        date:event.date,
      }),
     },
 }) 
//  var t1=
//  await db.collection("userTimeLine").where({
//   _openid:wxContext.OPENID,
// }).get();

  // temp1=
  await db.collection("userTimeLine").where({
    _openid:wxContext.OPENID
  }).update({
    data:{
      history:_.push({
        weight:event.nowWeight,
        date:event.date,
      })
    },
 
  })
  // var t2=await db.collection("userTimeLine").where({
  //   _openid:wxContext.OPENID
  // }).get();



  return {
   
  }
}