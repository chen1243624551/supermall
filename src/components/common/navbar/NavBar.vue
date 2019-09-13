<template lang="html">
  <div class="nav-bar">
    <!-- 不要给插槽直接布局,给插槽套一个div,给div布局 -->
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right" name="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name:'NavBar'
}
</script>

<style lang="css" scoped>
  .nav-bar{
    display: flex;
    line-height: 44px;
    height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px 1px #ccc;
  }
  .left,.right{
    width: 60px;
  }
  .center{
    flex:1;
  }
</style>
