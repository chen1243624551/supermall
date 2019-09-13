<template lang="html">
  <!-- Object.keys(goods)返回由goods对象的可枚举属性组成的数组 -->
  <div class="baseinfo" v-if="Object.keys(goods).length!==0">
    <h3 class="info-title">{{goods.title}}</h3>

    <div class="info-price">
      <span :style="{'color':goods.discountBgColor}" class="newprice">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <!-- 有折扣就渲染,没有就不渲染 -->
      <span
              v-if="goods.discount"
              class="discount">
        {{goods.discount}}
      </span>
    </div>

    <div class="columns">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>

    <div class="others">
      <span class="info-serve-item" v-for="index in (goods.services.length-1)" :key="index">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name:'DetailBaseInfo',
  props:{
    goods:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style lang="css" scoped>
  .info-title{
    padding:10px 0;
    text-align: center;
  }
  .newprice{
    font-size: 25px;
    padding-right: 5px;
  }
  .discount{
    display: inline-block;
    font-size: 18px;
    line-height: 25px;
    background-color: red;
    color: white;
    border-radius: 10px;
    margin-left: 10px;
    text-align: center;
    padding: 0 4px;
  }
  .info-price .o-price{
    font-size: 13px;
    text-decoration: line-through;
  }
  .columns{
    padding:25px 3px 15px;
  }
  .others,.columns{
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    border-bottom: 1px solid #ccc;
  }
  .others{
    padding: 20px 0;
    font-weight: bold;
    font-size: 14px;
  }
  .others img{
    width: 15px;
  }
</style>
