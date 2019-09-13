<template lang="html">
  <div class="maintabbar">
    <tab-bar>
      <tab-bar-item link="/home" activeColor="blue">
        <!-- 要在HTML代码中使用别名,前面必须加 ~ -->
        <img src="../../../assets/img/tabbar/home.svg" slot="item-icon">
        <img src="../../../assets/img/tabbar/home_active.svg" slot="item-icon-active">
        <div slot="item-text">首页</div>
      </tab-bar-item>

      <tab-bar-item link="/category" activeColor="blue">
        <img src="../../../assets/img/tabbar/category.svg" slot="item-icon">
        <img src="../../../assets/img/tabbar/category_active.svg" slot="item-icon-active">
        <div slot="item-text">分类</div>
      </tab-bar-item>

      <tab-bar-item link="/cart" activeColor="blue">
        <img src="../../../assets/img/tabbar/shopcart.svg" slot="item-icon">
        <img src="../../../assets/img/tabbar/shopcart_active.svg" slot="item-icon-active">
        <div slot="item-text">购物车</div>
      </tab-bar-item>

      <tab-bar-item link="/profile" activeColor="blue">
        <img src="../../../assets/img/tabbar/profile.svg" slot="item-icon">
        <img src="../../../assets/img/tabbar/profile_active.svg" slot="item-icon-active">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
//导入TabBar组件
import TabBar from '../../common/tabbar/TabBar.vue'
//导入TabBarItem组件
import TabBarItem from '../../common/tabbar/TabBarItem.vue'
export default {
  name:'MainTabBar',
  components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style lang="css" scoped>
</style>
