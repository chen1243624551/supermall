<template lang="html">
  <div class="category">
    <h2>分类</h2>
  </div>
</template>

<script>

export default {
  name:"Category"
  //created()调用之前模板还没有被编译编程render()函数,所以找不到类名为.wrapper的元素
  //所以会报错,说找不到类名为.wrapper的元素
  // created(){
  //   this.scroll = new BScroll('.content',{
  //   })
  // },
}
</script>

<style lang="css" scoped>
</style>
