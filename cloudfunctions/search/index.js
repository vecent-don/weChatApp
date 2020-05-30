// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  console.log('测试云函数')
  try{
    return await db.collection("food_list").where({
      description:db.RegExp({
        regexp:".*"+event.search_name+".*",
        options:'i'
      })
    }).get({
      success(res){
        console.log(res)
      },fail(res){
        console.log(res)
      }
    })
  }catch(e){
    console.error(e)
  }
}