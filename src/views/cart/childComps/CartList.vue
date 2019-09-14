<template lang="html">
  <div class="cartlist">
    <scroll class="content">
      <div v-for="(item,index) in cartList" :key="index" class="list-item">
        <div class="image"><img :src="item.image" alt=""></div>
        <div class="itemInfo">
          <p class="title">{{item.title}}</p>
          <p class="desc">{{item.desc}}</p>
          <span class="price">{{item.price}}</span>
          <span class="count">{{"x"+item.count}}</span>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from '../../../components/common/scroll/Scroll'
import {mapGetters} from 'vuex'
export default {
  name:'CartList',
  components:{
    Scroll
  },
  computed:{
    ...mapGetters(['cartList'])
  }
}
</script>

<style lang="css" scoped>
  .content{
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 55px;
    overflow: hidden;
  }
  .list-item{
    padding: 10px;
    display: flex;
    border-bottom: 2px solid #ccc;
  }
  .list-item img{
    border-radius: 10px;
    width: 80px;
  }
  .itemInfo{
    position: relative;
    width: 70%;
    margin: 10px;
  }
  .itemInfo .title{
    margin-bottom: 20px;
    font-weight: 700;
  }
  .itemInfo .title,.itemInfo .desc{
    width: 100%;
    white-space: nowrap;
    text-overflow:ellipsis;
    overflow: hidden;
  }
  .price{
    color:red;
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .count{
    position: absolute;
    right: 0;
    bottom: 0;
  }
</style>
