<template lang="html">
  <div class="cart">
    <nav-bar class="navbar">
      <span slot="center">购物车({{cartLength}})</span>
    </nav-bar>
    <cart-list></cart-list>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar'
import CartList from './childComps/CartList'
// 从vuex导入mapGetters,用于将vuex中getters选项里的属性转为当前组件中的计算属性,
//可以直接当计算属性使用
import {mapGetters} from 'vuex'
export default {
  name:"Cart",
  components:{
    NavBar,
    CartList
  },
  computed:{
    //将vuex中getters选项里的cartLength和cartList方法转为当前组件中的计算属性
    //然后无需通过$store对象调用
    //语法1:传入数组
    ...mapGetters(['cartLength'])
    //语法2:传入对象,则可直接使用length作为计算属性
    // ...mapGetters({
    //   length:'cartLength',
    //   list:'cartList'
    // })
  }
}
</script>

<style lang="css" scoped>
  .navbar{
    font-size: 20px;
    color: white;
    background-color: pink;
  }
  .content{

  }
</style>
