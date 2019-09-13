<template lang="html">
  <div class="comment-info" v-if="Object.keys(commentInfo)!==0">
    <div class="head clear-fix">
      <div>用户评价</div>
      <a href="#">更多</a>
    </div>
    <div class="user-info">
      <!-- 由于数据是异步请求的,所以这个时候可能还没拿到commentInfo中的user -->
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="user-comment">
      <p>{{commentInfo.content}}</p>
      <div class="other">
        <!-- 服务器返回的时间是时间戳,不同平台再转为自己想用的格式 -->
        <!-- 所以要用到过滤器 -->
        <span>{{commentInfo.created | showDate}}</span>
        <span class="style">{{commentInfo.style}}</span>
      </div>
    </div>
    <div class="image">
      <img :src="item" v-for="item in commentInfo.images" alt="">
    </div>
  </div>
</template>

<script>
import {formatDate} from '../../../components/common/utils'
export default {
  name:'DetailCommentInfo',
  props:{
    commentInfo:{
      type:Object,
      defualt(){
        return {}
      }
    }
  },
  filters:{
    showDate(value){
      //1.将时间戳转为Date对象,时间戳单位为秒,但是Date对象只能把毫秒转
      //为对应的时间对象,所以要乘以1000
      const date = new Date(value * 1000)
      return formatDate(date,'yyyy-MM-dd')
    }
  }
}
</script>

<style lang="css" scoped>
  .comment-info{
    margin: 15px;
  }
  .head{
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    font-weight: bold;

  }
  .head div{
    float: left;
  }
  .head a{
    float: right;
  }
  .user-info{
    margin:15px 0;
    font-weight: 700;
    font-size: 15px;
  }
  .user-info img{
    width: 50px;
    border-radius: 50%;
    vertical-align:middle;
    margin-right: 5px;
  }
  .user-comment p{
    margin-bottom: 15px;
    line-height: 25px;
  }
  .user-comment .other{
    font-weight: 100;
    color: #aaa;
  }
  .image img{
    width: 100px;
  }
</style>
