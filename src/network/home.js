import {request} from './request.js'

//这个文件统一管理首页的所有请求
export function getHomeMultidata(){
  return request({
    url:'/api/v1/home/multidata'
  })
}
 export function getHomeGoods(type,page){

   return request({
     //这样拼接太麻烦,直接使用params参数
     // url:'/api/v1/home/data?type='+ type + '&' + "page=" + page
     url:'/api/v1/home/data',
     params:{
       type,
       page
     }
   })
 }
