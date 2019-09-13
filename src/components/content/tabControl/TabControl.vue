<template lang="html">
  <!-- 如果组件里的内容仅有文字差别就不用插槽了 -->
  <div class="tab-control">
    <div class="tab-control-item"
         v-for="(item,index) in titles"
         @click="itemClick(index)"
         :class="{active:index===currentindex}">
      <span >{{item}}</span>
    </div>

  </div>
</template>

<script>
export default {
  name:'TabControl',
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      //用于记住当前处于激活状态的选项下标
      //因为第一个选项一开始就要处于激活状态,所以值一开始为0
      //当点击其他选项的这个属性值随着变化就可以选中
      currentindex:0
    }
  },
  methods:{
    itemClick(index){
      this.currentindex = index;

      this.$emit('tabClick',index)
    }
  }
}
</script>

<style lang="css" scoped>
  .tab-control{
    display: flex;
    padding: 10px;
    text-align: center;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    background-color: white;
  }
  .tab-control-item{
    flex:1;
  }
  .active{
    color:red;
  }
  .active span{
    border-bottom: 2px solid red;
    padding-bottom: 5px;

  }
</style>
