<template lang="html">
  <div class="bottom-bar">
    <div class="left">
      <div class="kefu">
        <span class="iconfont icon-kefu"></span>
        <p>客服</p>
      </div>
      <div class="shop">
        <span class="iconfont icon-dianpu"></span>
        <p>商店</p>
      </div>
      <div class="collect">
        <span class="iconfont icon-collect"></span>
        <p>收藏</p>
      </div>
    </div>
    <div class="middle" @click="addToCart">
      <span>加入购物车</span>
    </div>
    <div class="right">
      <span>购买</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'DetailBottomBar',
  methods:{
    addToCart(){
      this.$emit('addToCart')
    }
  }
}
</script>

<style lang="css" scoped>
  @import '../font/iconfont.css';
  .bottom-bar{
    position: fixed;
    height: 55px;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: pink;
    display: flex;
    text-align: center;
    font-size: 18px;
  }
  .left{
    display: flex;
    background-color: #fff;
    width: 55%;
  }
  .left div{
    font-size: 17px;
    flex: 1;
  }
  .left span{
    font-size: 28px;
  }
  .left .icon-kefu{
    color: red;
  }
  .middle,.right{
    line-height: 55px;
  }
  .middle{
    font-weight: bold;
    background-color: yellow;
    padding: 0 4px;
  }
  .right{
    flex: 1;
    color: #fff;
    background-color: pink;
  }
</style>
