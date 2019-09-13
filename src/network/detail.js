import {request} from "./request.js"

export function getDetails(iid){
  return request({
    url:"/api/v1/detail",
    params:{
      iid
    }
  })
}
export function getRecommend(){
  return request({
    url:'/api/v1/recommend'
  })
}

//用一个类保存整个某个小组件的全部信息,方便组件取
export class GoodsInfo {
  constructor(itemInfo,columns,services){
    // 图片标题和描述
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.discountBgColor = itemInfo.discountBgColor;
    // columns是数组
    this.columns = columns;
    // services维数组
    this.services = services;
    this.realPrice = itemInfo.lowNowPrice
  }
}

export class Shop {
  constructor(shopInfo){
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    //score为一个数组
    this.score = shopInfo.score;
    this.goodCount = shopInfo.cGoods;
  }
}
