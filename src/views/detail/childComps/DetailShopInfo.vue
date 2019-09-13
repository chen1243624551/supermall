<template lang="html">
  <div class="shopinfo" v-if="Object.keys(shopInfo).length!==0">
    <div class="shop-top">
      <img :src="shopInfo.logo" alt="">
      <span>{{shopInfo.name}}</span>
    </div>
    <div class="shop-middle">
      <div class="middle-left">
        <div class="fans">
          <ul>
            <li>{{shopInfo.fans}}</li>
            <li>粉丝量</li>
          </ul>
        </div>
        <div class="sells">
          <ul>
            <li>{{shopInfo.sells}}</li>
            <li>销售量</li>
          </ul>
        </div>
      </div>
      <!-- 用表格更好 -->
      <div class="middle-right">
        <ul>
          <li v-for="item in shopInfo.score">
            <span class="name">{{item.name}}</span>
            <span class="score" :class="{'score-more':item.isBetter}">{{item.score}}</span>
            <span class="better" :class="{'better-more':item.isBetter}">{{item.isBetter?'高':'低'}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name:'DetailShopInfo',
  props:{
    shopInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  // 过滤器
  filters:{
    sellCountFilter(value){
      let result = value;
      if (value>10000) {
        //如果销售量>10000,则用万做单位,小于则直接显示
        result = (result/10000).toFixed(1)+'万';
      }
      return result
    }
  }
}
</script>

<style lang="css" scoped>
  .shopinfo{
    padding: 30px 0px;
    font-size: 20px;
    border-bottom: 1px solid #ccc;
  }
  .shop-top img{
    vertical-align: middle;
    width: 60px;
    border-radius: 50%;
  }
  .shop-middle{
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 100px;
    margin-bottom: 20px;
  }
  .middle-right li{
    padding: 5px 0;
  }
  .middle-left li{
    padding: 3px 0;
  }
  .middle-left{
    width: 130px;
    height: 100%;
    position: relative;
  }
  .middle-right{
    width: 200px;
  }
  .middle-left .fans,.middle-left .sells{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .middle-left .fans{
    left: 0;
  }
  .middle-left .sells{
    right: 0;
  }
  .middle-right .name{
    margin-right: 10px;
  }
  .middle-right .score{
    display: inline-block;
    width: 20px;
    margin: 0 40px 0 15px;
    color: #5ea732;
  }
  .middle-right .score-more{
    color:#f23e3a;
  }
  .middle-right .better{
    background-color: #5ea732;
    color: #fff;
    text-align: center;

  }
  .middle-right .better-more{
    background-color: #f23e3a;
  }
  .enter-shop{
    width: 150px;
    line-height: 40px;
    border-radius: 10px;
    margin: 0 auto;
    background-color: #ddd;
    color: white;
    text-align: center;
  }
</style>
