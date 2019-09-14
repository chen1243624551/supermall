<template lang="html">
  <div id="home">
    <nav-bar class="home-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- 重新复制一份tab-control是为了实现吸顶 -->
    <tab-control :titles='["流行","新款","精选"]'
                 class="tab-control"
                 ref="tabControl1"
                 @tabClick='tabClick'
                 v-show="isTabFixed">
    </tab-control>
    <scroll class="content"
            ref="scroll"
            @scroll="contentBack"
            @pullingUp="loadMore"
            :pull-up-load="true"
            :probe-type="3">
     <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
     <recommend-view :recommends="recommends"></recommend-view>
     <feature-view></feature-view>
     <tab-control :titles='["流行","新款","精选"]'
                  ref="tabControl2"
                  @tabClick='tabClick'>
     </tab-control>
     <goods-list :goods = "showGoods"></goods-list>
    </scroll>
    <!--
        默认情况下组件不可以用v-on监听事件,但是如果加一个native修饰符,
        就可以使得组件也可以监听原生事件
      -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
//子组件
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'
import HomeSwiper from './childComps/HomeSwiper'

//公共组件
import NavBar from '../../components/common/navbar/NavBar'
import TabControl from '../../components/content/tabControl/TabControl'
import GoodsList from '../../components/content/goods/GoodsList'
import Scroll from '../../components/common/scroll/Scroll'
import BackTop from '../../components/content/backTop/BackTop'
//工具的引用
// import {debounce} from '../../components/common/utils'
//混入函数
import {itemListenerMixin,backTopMixin} from '../../components/common/mixins'

//网络请求
import {getHomeMultidata,getHomeGoods} from '../../network/home'

import {BACK_POSITION} from '../../components/common/const'

export default {
  name:"Home",
  components:{
    NavBar,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
    HomeSwiper
  },
  mixins:[itemListenerMixin,backTopMixin],
  data(){
    return {
      //保存从服务器端获取的轮播图数据
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0, list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      type:'pop',
      isShowBackTop:false,
      tapOffsetTop:0,
      isTabFixed:false,
      saveY:0
      // imageListener:null 在mixins中设置就行,到时候会会混入mixins中的data选项
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.type].list
    }
  },
  //当创建好组件的时候发送网络请求
  created(){
    //声明钩子函数中写主要逻辑,详细的逻辑最好放在methods选项中
    //这样的好处的时同时请求多次数据的时候,代码量将大大减少

    //必须用this调用,这样才是调用methods里的方法

    //1.请求轮播图和
    this.getHomeMultidata()
    //2.请求商品信息
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted(){
    //调用防抖函数 被合并到mixins工具中了,所以这里不需要了
    // const refresh = debounce(this.$refs.scroll.refresh,3000)
    //在mounted里监听HTML中的元素,要在组件挂载后才能监听得到,所以不要在created里监听
    //监听item中图片加载,图片加载完就调用refresh()更新scrollheight
    // this.imgListener = ()=>{
    //   refresh()
    // }
    // 调用了Scroll组件里的refresh(方法),但是直接调用太频繁
    //每次异步记载图片都要调会调用一次refresh,加重服务器的负荷
    //解决办法:防抖函数,等待一段时间,等所有的图片加载完再刷新
    // this.$refs.scroll.refresh()
    // this.$bus.$on('homeImageLoad',this.imageListener)

    //2.获取tabControl组件中元素的tabOffsetTop
    //this.$refs.tabControl获取组件tabControl
    //然后获取组件的$el选项,这个选项就是整个模板里的内容
    //通过$el就可以获取模板里的元素
    // console.log(this.$refs.tabControl.$el.offsetTop); 直接这样拿到的高度是没有图片撑起的,所以是不正确的
  },
  methods:{
    //1.请求多个数据,函数执行完释放所有内存,所有要把数据保存起来
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        // console.log(res.data);
      })
    },
    //2.请求商品信息
    getHomeGoods(type){
      //页码数+1
      let page = this.goods[type].page+1
      getHomeGoods(type,page).then(res=>{
        for (let list of res.data.list) {
          this.goods[type].list.push(list)
        }
        this.goods[type].page+1;
        this.$refs.scroll.finishPullUp()
      })
    },

    //事件监听相关方法

    //防抖函数的封装,单独封装
    // debounce(func,delay){
    //   let timer = null
    //   return function(...args){
    //     if(timer) clearTimeout(timer)
    //     timer = setTimeout(()=>{
    //       func.apply(this,args)
    //     },delay)
    //   }
    // },
    tabClick(index){
      switch (index) {
        case 0:
          this.type = 'pop';
          break;
        case 1:
          this.type = 'new';
          break;
        case 2:
          this.type = 'sell';
          break;
      }
      //获取紧跟导航栏下的tabControl
      this.$refs.tabControl1.currentindex = index;
      this.$refs.tabControl2.currentindex = index;
    },
    // backClick(){
    //   //获取子组件,并与之通信
    //   //第一个scroll是子组件的别名,通过this.$refs.scroll获取子组件,
    //   //第二个scroll是子组件中定义的一个属性,该属性是一个BScroll对象
    //   //通过这个对象可以调用scrollTo()调整滚动的位置,第三个参数是回到顶部的时间
    //   this.$refs.scroll.scrollTo(0,0,500)
    // },
    //监听滚动事件
    contentBack(position){
      //判断BackTop是否显示
      this.isShowBackTop=(-position.y)>BACK_POSITION

      //决定tabControl是否吸顶
      this.isTabFixed = (-position.y)>this.tabOffsetTop

    },
    //下拉加载,但是这里有一个Bug,因为图片是异步加载的,
    //所以开始要进行滚动的内容区域一开始的高度不包括图片,
    //当图片加载过来的时候发现要进行滚动的区域高度不够,所以会出现滚动不了的情况
    //解决办法就是拿到图片后再刷新一下,重新计算滚动内容区域的高度
    //如何监听图片已经加载?@click="方法"
    loadMore(){
      this.getHomeGoods(this.type)
    },
    swiperImageLoad(){
      //输出四次,因为每张图片都会发送一次请求
      //所以只要设置只发射一次自定义事件就好,见HomeSwiper组件
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      console.log(this.tabOffsetTop);
    }
  },
  destroyed(){
    console.log("home destroyed");
  },
  // 页面激活时调用
  activated(){
    // 表示回到离开页面时所记录的位置
    this.$refs.scroll.scrollTo(0,this.saveY,200)
    //离开时拒绝接受图片加载事件,但是这个取消全局事件,
    //所以第二个参数用于取消哪个函数是在图片加载后调用的
    //而不同页面需要在图片加载后调用的函数不一样,这样就可以取消特定的事件
    //而其他页面的不会取消
    // this.$bus.off('homeImageLoad',func)
  },
  //离开当前页面调用,可以用于保存当前页面的位置信息
  deactivated(){
    //记录离开当前页面时滚动区滑动的距离
    this.saveY = this.$refs.scroll.getScrollY();
    this.$bus.$off('itemlImageLoad',this.imageListener)
        console.log(this.saveY);
  }
}
</script>

<style lang="css" scoped>
  #home{
    /* 不需要设置高度,因为父级高度会被内容撑起 */
    height: 100vh;
    /* position: relative; */
  }
  .home-bar{
    background-color: pink;
    /* 不需要定位了,因为滚动区域紧跟home-bar 不会印象布局 */
    /* position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9; */
  }
  /* better-scroll的滚动区域会会覆盖正常文档流中的盒子
    ,而且如果涵盖了其他部分,会阻止原生点击事件!!
   */
  .content{
    position: absolute;
    /* 设置在首页滚动的区间,这个区间如果涵盖了TabBar那一栏,会阻止原生点击事件 */
    /* 如果父元素设置了relative,则滚动的区域会涵盖TabBar那一栏,所以父级不需要谁定位 */
    overflow: hidden;
    left: 0;
    right: 0;
    top:44px;
    bottom:50px;
  }

  /* 实现tabControl吸顶方法1:(不能实现)
  吸顶时position:fixed失效,是因为如果祖先元素设置了transform属性
  则此时相对于祖先元素固定定位,而不是可视窗口,因为better-scroll插件
  是通过改变translate(x,y)来实现的,所以使用position:fixed无法实现吸顶
  .fixed{
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  } */

  /* 实现吸顶方法2: 因为紧跟导航栏 所以一开始隐藏
     一开始显示的是加入滚动的tab-control
   */
  .tab-control{
    position:relative;
    z-index: 9;
  }

</style>
