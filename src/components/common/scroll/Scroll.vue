<template lang="html">
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
//插件
import BScroll from 'better-scroll'

export default {
  name:'Scroll',
  props:{
    //子组件props选项中的属性用驼峰,在父组件中绑定的时候要用probe-type
    //由用这个组件的人决定是否开启监听Scroll事件
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return{
      scroll:null
    }
  },
  mounted(){
 //    <!--
 //    ref属性绑定在组件中时,通过this.$refs.refname得到的是子组件
 //    ref绑定在普通标签时,普通元素.$refs.refname得到的是该元素对象
 //    -->
    this.scroll = new BScroll(this.$refs.wrapper,{
      //如果这个属性设为false,则div等元素(不包括button)绑定原生点击事件不起作用
      click:true,
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad
    })
    //probeType为true时监听滚动事件,否则只能滚动,无法监听
    this.scroll.on('scroll',position=>{
      //将位置信息传给父组件
      this.$emit('scroll',position)
    })

    //监听上拉事件
    this.scroll.on('pullingUp',()=>{
      this.$emit('pullingUp')
    })
    // this.scroll.finishPullUp();
},
  methods:{
    //组件里封装scrollTo函数方便父组件直接调用
    scrollTo(x,y,time){
      //先判断scroll对象有没有,有再调用
      this.scroll&&this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    },
    refresh(){
      this.scroll&&this.scroll.refresh()
      // console.log(this.scroll.y);
    },
    getScrollY(){
      return this.scroll?this.scroll.y:0
    }
  }
}
</script>

<style lang="css" scoped>
</style>
