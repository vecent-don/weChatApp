// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log("here")
  console.log(wxContext.OPENID)

  var tem=await db.collection("userTimeLine").where({
    _openid:wxContext.OPENID,
  }).get()
 if(tem.data.length<1){
   var his=[{ 'weight':event.nowWeight,'date':event.date}]
  await db.collection("userTimeLine").add({
    data:{
      '_openid':wxContext.OPENID,
      'history':his,
      'reg':[]
    }
  })
 var k= await db.collection("userTimeLine").where({
    _openid:wxContext.OPENID,
  }).get()
  console.log(k)
  return
 }

  temp=await db.collection("userTimeLine").where({
    _openid:wxContext.OPENID
  }).update({
    data:{
      history:_.pull({
        date:event.date,
      }),
     },
 }) 

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