<template lang="html">
  <div
        class="goods-info clear-fix"
        v-if="Object.keys(detailInfo).length!==0">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    <div class="key">
      <span>{{detailInfo.detailImage[0].key}}</span>
    </div>
    <div class="image-info">
      <img
            v-for="(item,index) in detailInfo.detailImage[0].list"
            :key="index"
            :src="item"
            @load="imgLoad"
            alt="">
    </div>
  </div>
</template>

<script>
export default {
  name:'DetailGoodsInfo',
  data(){
    return{
      counter:0,
      imagesLength:0
    }
  },
  props:{
    detailInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  // 只要数据变化,页面重新渲染的时候都会调用
  methods:{
    //将加载事件发射出去,让父组件进行监听,一旦图片加载完毕
    //就调用better-scroll对象的refresh()重新计算可滚动区域
    imgLoad(){
      //因为图片已加载完就执行imgLoad(),所以++this.counter
      //所以++this.counter随着图片加载完的个数的增加而增加
      //当所有图片都加载完,即++this.counter === this.imagesLength
      //在将imgLoad()发射出去,最后调用一次refresh(),
      //就不需要用到防抖函数减少refresh()的调用
      // if (++this.counter === this.imagesLength) {
      //   this.$emit('imgLoad')
      // }

      //还是使用防抖函数减少refresh()的调用
      this.$emit('imgLoad')
    }
  },
  // watch选项可以监听某个属性的变化,然后调用相关的函数,有缓存
  //如果监听的属性没有变化,页面重新渲染也不会调用
  // watch:{
  //   detailInfo(){
  //     // this.detailInfo.list存的格式图片路径的数组
  //     // this.detailInfo.list.legnth表示已经加载完的图片个数
  //     this.imagesLength = this.detailInfo.detailImage[0].list.length
  //   }
  // }
}
</script>

<style lang="css" scoped>
.goods-info{
    font-size: 20px;
}
.start,.end{
  width: 100px;
  height: 25px;
  border-bottom: 1px solid #ccc;
}
.start{
  position: relative;
  left: 8%;
}
.start::before,.end::after{
  content: "";
  position: absolute;
  bottom: -2px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #000;
}
.end{
  position: relative;
  left: 65%;
}
.desc{
  margin: 25px 30px 0;
}
.key{
  margin: 25px;
}

.image-info img{
  width: 100%;
}
</style>
