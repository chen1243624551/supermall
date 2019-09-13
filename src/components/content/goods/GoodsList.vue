<template lang="html">
  <div class="goodslist">
    <goods-list-item
        v-for="(item,index) in goods"
        :goodsItem='item'
        class="goods-item"
        :key="index"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
  name:'GoodsList',
  components:{GoodsListItem},
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style lang="css" scoped>
  .goodslist{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 2px;
  }

</style>
