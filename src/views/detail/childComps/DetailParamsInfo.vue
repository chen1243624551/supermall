<template lang="html">
  <div class="paramsinfo" v-if="Object.keys(itemParams).length!==0">
    <table class="info-size" v-for="(table,index) in itemParams.rule.tables">
      <tr v-for="(tr,indey) in table" :key="indey">
        <td v-for="(td,indez) in tr" :key="indez">{{td}}</td>
      </tr>
    </table>
    <table class="info-param">
      <tr v-for="(tr,index) in itemParams.info.set" :key="index">
        <td>{{tr.key}}</td>
        <td class="value">{{tr.value}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name:'DetailParamsInfo',
  props:{
    itemParams:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style lang="css" scoped>
  .paramsinfo{
    padding: 20px 15px;
    border-bottom: 3px solid #ccc;
  }
  .paramsinfo table{
    width: 100%;
    /* 设置了border-collapse: collapse;就可以使得单元格公用一条边框
        所以设置单元格底边框的时候回连在一起
     */
    border-collapse: collapse;

  }
  .paramsinfo table tr td{
    /* text-align: left; */
    height: 45px;
    border-bottom: 1px solid #ccc;
  }
  .info-size,.info-param{
    border-bottom: 2px solid #ccc;
  }
  .info-param .value{
    padding-left: 18px;
    color: red;
  }
</style>
