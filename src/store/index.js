import Vuex from 'vuex'
import Vue from 'vue'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
Vue.use(Vuex);

//创建store对象
const store = new Vuex.Store({
  state:{
    cartList:[]
  },
  // 修改state中存储任何变量,要在选项mutations中修改!
  //mutations中的方法只要放一些简单逻辑,其他的交给actions
  //除了state选项都抽离出去
  mutations,
  //除了放异步的事件,还可以吧逻辑性强的方法放在这里面
  actions,
  getters
})

//挂载到vue实例中

export default store
