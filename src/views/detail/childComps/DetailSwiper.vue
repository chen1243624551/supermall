<template lang="html">

    <swiper class="detail-swiper">
      <swiper-item v-for="(image,index) in topImage" :key="index">
        <img :src="image" alt="">
      </swiper-item>
    </swiper>

</template>

<script>
// 直接导入两个,因为封装了index.js用于同时导出
import {Swiper,SwiperItem} from '../../../components/common/swiper/index'
export default {
  name:'DetailSwiper',
  components:{
    Swiper,
    SwiperItem
  },
  props:{
    topImage:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style lang="css" scoped>
  .detail-swiper{
    height: 300px;
    overflow: hidden;
  }
</style>
