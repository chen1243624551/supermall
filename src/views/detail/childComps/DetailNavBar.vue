<template lang="html">
  <div>
    <nav-bar>
      <div slot="left" @click="backClick">
        <img src="../../../assets/img/common/back.svg" alt="" class="back">
      </div>
      <div slot="center" class="titles">
        <div
              v-for="(item,index) in titles"
              class="title-item"
              :class="{active:index===currentindex}"
              @click="titleClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from '../../../components/common/navbar/NavBar'
export default {
  name:'DetailNavBar',
  components:{
    NavBar
  },
  data(){
    return {
      titles:['商品','参数','评论','推荐'],
      currentindex:0
    }
  },
  methods:{
    titleClick(index){
      this.currentindex = index;
      this.$emit('titleClick',index)
      // this.currentindex = index;
    },
    backClick(){
      //回到上一次路由
      this.$router.go(-1);
      // this.$router.back()
    }
  }
}
</script>

<style lang="css" scoped>
  .titles{
    display: flex;
  }
  .titles .title-item{
    font-size: 15px;
    flex:1;
  }
  .active{
    color:red;
  }
  .back{
    position: relative;
    top: 8px;
  }
</style>
