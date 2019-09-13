<template>
  <div id="app">
    <main-tab-bar class="main"></main-tab-bar>
    <!-- 除了Detail组件外,其他组件保持已激活状态,既跳转后不会摧毁 -->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MainTabBar from './components/content/mainTabbar/MainTabBar.vue'
import router from './router/index'

export default {
  name: 'app',
  router,
  components: {
    MainTabBar
  }
}
</script>

<style>
  @import "./assets/css/base.css";
</style>
