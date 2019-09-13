<template lang="html">
    <div id="tab-bar">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name:'TabBar'
}
</script>

<style lang="css" scoped>
#tab-bar{
  /* 弹性布局 */
  display:flex;
  background-color: #f6f6f6;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -1px  2px rbga(100,100,100,.2);
}
</style>
