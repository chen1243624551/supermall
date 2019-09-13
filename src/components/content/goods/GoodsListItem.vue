<template lang="html">
  <div class="goods-item" @click="goodsClick">
    <!-- load事件监听图片是否加载完成 -->
    <img :src="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'GoodsListItem',
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  computed:{
    showImage(){
      return this.goodsItem.image||this.goodsItem.show.img
    }
  },
  methods:{
    imageLoad(){
      //this.$bus为事件总线,类似vuex,但是事件总线是管理事件的
      //this.$bus.$emit("itemImageLoad")想事件总线发射自定义事件
      //其他组件就可以根据this.$bus.on()监听这个事件

      //1.根据不同路由发射不同的图片加载事件,因为有些页面可能不需要监听
      //根据路由判断哪个页面需要图片加载事件
      // if (this.$route.path.indexOf('/home')) {
      //   this.$bus.$emit("homeImageLoad")
      // }else {
      //   this.$bus.$emit("detailImageLoad")
      // }

      //2.直接发射出去,再在不同的组件中取消
      this.$bus.$emit("itemImageLoad")
    },
    goodsClick(){
      //因为要返回其他页面,所以用push()
      //将商品的详细信息iid通过路由传给detail页面
      this.$router.push('/detail/'+ this.goodsItem.iid);

      //路由传参的方式
      // this.$router.push({
      //   path:'/detail',
      //   query:{}
      // });
    }
  }
}
</script>

<style lang="css" scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}

 .goods-item img {
  width: 100%;
  border-radius: 5px;
}

 .goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  margin-right: 20px;
  color:red;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
