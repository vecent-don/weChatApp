// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  console.log('测试云函数')
  try{
    return await db.collection("food_list").where({
      // description:db.RegExp({
      //   regexp:".*"+event.search_name+".*",
      //   options:'i'
      // })
      name:{								//columnName表示欲模糊查询数据所在列的名
        $regex:'.*' +event.search_name + '.*',		//queryContent表示欲查询的内容，‘.*’等同于SQL中的‘%’
        $options: 'i'							//$options:'1' 代表这个like的条件不区分大小写,详见开发文档
      },

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