<template lang="html">
  <div class="tab-bar-item" @click="itemClick">
    <!-- 使用插槽使得可以动态改变组件里的内容-->
    <!-- 都是用div包裹插槽并且在div中设置指令,是防止插槽被替换掉后指令不起作用 -->
    <div v-if="!isActive">
      <slot  name="item-icon"></slot>
    </div>
    <div  v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <!-- 插槽最终会被替换掉,所以绑定的类就不会其效果 所以要包裹一个div用于加类-->
      <!-- <slot :class="{active:true}" name="item-text"></slot> -->
      <slot name="item-text"></slot>
    </div>
    <!-- 如果不使用插槽,每次在父组件中是这个组件的时候内容都是一样的,非常不灵活 -->
    <!-- <img src="../../assets/img/tabbar/home.svg" alt="">
    <div>首页</div> -->
  </div>
</template>

<script>
export default {
  props:{
    link:String,
    activeColor:{
      type:String,
      default:'#d4237a'
    }
  },
  data(){
    return{
      // isActive:true
    }
  },
  computed:{
    isActive(){
      //this.$route表示当前激活状态的路由,动态决定是否添加active类
      return (this.$route.path.indexOf(this.link)!=-1)
    },
    //动态绑定sytle属性改变属性,如果isActive属性为true,则返回{color:this.activeColor}
    //给计算属性activeStyle,然后根据动态绑定使得行内样式有样式
    activeStyle(){
      return this.isActive?{color:this.activeColor}:{}
    }
  },
  methods:{
    itemClick(){
      // this.link获取父组件中link属性的数据
      this.$router.replace(this.link)
    }
  }
}
</script>

<style lang="css" scoped>
.tab-bar-item{
  flex:1;
  text-align:center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img{
  width: 24px;
  font-size: 14px;
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>
