<template lang="html">
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar"
                    @titleClick="titleClick"
                    :emit-index="emitIndex"></detail-nav-bar>
    <scroll class="detail-scroll" ref="scroll"
            @scroll="contentScroll"
            :probe-type="3">
      <detail-swiper :top-image="topImage"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shopInfo="shopInfo"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
      <detail-params-info
              :itemParams="itemParams"
              ref="params">
      </detail-params-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommends"></goods-list>
      <div class="">
        <ul>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
          <li>hhh</li>
        </ul>
      </div>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top v-if="isShowBackTop" @click.native="backClick"></back-top>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import {getDetails,GoodsInfo,Shop,getRecommend} from '../../network/detail'
//轮播图
import DetailSwiper from './childComps/DetailSwiper'
//基本信息
import DetailBaseInfo from './childComps/DetailBaseInfo'
//商家信息
import DetailShopInfo from './childComps/DetailShopInfo'

//滚动
import Scroll from '../../components/common/scroll/Scroll'

//商品信息
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
//项目参数
import DetailParamsInfo from './childComps/DetailParamsInfo'
//评论数据
import DetailCommentInfo from './childComps/DetailCommentInfo'

//商品推荐
import GoodsList from '../../components/content/goods/GoodsList'

//防抖动函数 不需要传入了,因为被合并到mixins中了
import {debounce} from '../../components/common/utils'

//混入函数
import {itemListenerMixin,backTopMixin} from '../../components/common/mixins'
//底部工具栏
import DetailBottomBar from './childComps/DetailBottomBar'
//回到顶部导航
import BackTop from '../../components/content/backTop/BackTop'
import {BACK_POSITION} from '../../components/common/const'
export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop
  },
  mixins:[itemListenerMixin,backTopMixin],
  data(){
    return{
      iid:null,
      topImage:[],
      //要把对象传给子组件的时候最好先设为{},而不是Null
      goods:{},
      shopInfo:{},
      detailInfo:{},
      itemParams:{},
      commentInfo:{
        user:{}
      },
      recommends:[],
      // imageListener:null
      navBarItemTopYs:[],
      getNavBarItemTops:null,
      scrollY:0,
      emitIndex:0
    }
  },
  //初始化data就开始请求数据
  //由于本来用了keep-alive保持了激活状态,所以重新跳转进来created不会重新调用
  //所以传入的iid还是第一次点击的图片
  //解决办法:就是使用keep-alive的exclude属性,不让这个组件一直保持激活
  created(){
    //1.保存传入的iid

    this.iid = this.$route.params.iid
    //2.根据iid请求详情数据
    getDetails(this.iid).then(res=>{
      const data = res.result;
      //获取顶部轮播图信息
      this.topImage = data.itemInfo.topImages
      console.log(res);

      //创建类实例,保存商品信息
      this.goods = new GoodsInfo(data.itemInfo,data.columns,data.shopInfo.services)

      //创建店铺信息
      this.shopInfo = new Shop(data.shopInfo)

      //详情页图片信息,因为只有图片信息,没必要在封装类
      this.detailInfo = data.detailInfo;

      //项目参数
      this.itemParams = data.itemParams;

      //评论信息,因为有些商品可能没有评论信息
      //所以那之前最好判断一下
      if (data.rate.cRate!==0) {
        this.commentInfo = data.rate.list[0]
      }
      //页面拿到数据完全渲染完后汇之星this.nextTick()
      //但是这个函数内大图片可能还是没有加载出来
      // this.nextTick(()=>{
      //   this.navBarItemTopYs.push(0)
      //   this.navBarItemTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.navBarItemTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.navBarItemTopYs.push(this.$refs.recommends.$el.offsetTop)
      // })
    })
    getRecommend().then(res=>{
      this.recommends = res.data.list;
    })
  },
  methods:{
    imgLoad(){
      this.refresh();
      //图片加载完后获取响应的offsetTop
      this.getNavBarItemTops()
      // console.log(this.navBarItemTopYs);
    },
    titleClick(index){
      // console.log(this.navBarItemTopYs);console.log(this.navBarItemTopYs);
      //在这里实现滚动不可取,因为有大图的话加载慢,此时offsetTop不是正确的值
      // switch (index) {
      //   case 1:
      //     this.$refs.scroll.scrollTo(0,-this.$refs.params.$el.offsetTop,200)
      //     break;
      //   case 2:
      //     this.$refs.scroll.scrollTo(0,-this.$refs.comment.$el.offsetTop,200)
      //     break;
      //   case 3:
      //     this.$refs.scroll.scrollTo(0,-this.$refs.recommends.$el.offsetTop,200)
      //     break;
      //   default:
      //
      // }
      // this.$refs.scroll.scrollTo(0,-this.$refs.params.$el.offsetTop,200)
      this.$refs.scroll.scrollTo(0,-this.navBarItemTopYs[index],200)

    },
    contentScroll(position){
      this.scrollY = -position.y;
      //判断BackTop是否显示
      this.isShowBackTop=(-position.y)>BACK_POSITION

      //得到的下标是字符串类型.所以要转化
      for (let num in this.navBarItemTopYs) {
        num = parseInt(num);
        if (num+1<this.navBarItemTopYs.lenght) {
          //this.emitIndex!==num防止赋值过于频繁,如果当前this.emitIndex==num就无需再赋值
          if ((this.emitIndex!==num)&&this.scrollY >= this.navBarItemTopYs[num]&&this.scrollY < this.navBarItemTopYs[num+1]) {
              this.emitIndex=num;
              console.log(this.emitIndex);
          }
        }else {
          if (this.scrollY>=this.navBarItemTopYs[num]) {
            this.emitIndex=num;
          }
        }
      }
    },
    addToCart(){
      //将购物车需要的信息加入购物车
      const product = {}
      product.image = this.topImage[0] //去除轮播图中的一张图片
      product.title = this.goodsInfo.title;
    }
  },
  mounted(){
    //初始化完就调用防抖函数,减少导航栏中各项的offsetTop的重计算
    this.getNavBarItemTops = debounce(()=>{
      this.navBarItemTopYs=[]
      this.navBarItemTopYs.push(0)
      this.navBarItemTopYs.push(this.$refs.params.$el.offsetTop)
      this.navBarItemTopYs.push(this.$refs.comment.$el.offsetTop)
      this.navBarItemTopYs.push(this.$refs.recommends.$el.offsetTop)
    },1000)
  },
  destroyed(){
    //离开页面时关闭图片加载完后调用的事件
    this.$bus.$off('itemlImageLoad',this.imageListener)
  }
}
</script>

<style lang="css" scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    /* 设置父级高度,用于确定滚动区域 */
    height:100vh;
  }
  .detail-nav-bar{
    position: relative;
    z-index: 9;
    background-color: white;
  }
  .detail-scroll{
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 55px;
    overflow: hidden;
  }
</style>
