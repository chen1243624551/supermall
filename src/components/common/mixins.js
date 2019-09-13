// mixins 选项接受一个混入对象的数组。这些混入实例对象可以像正常的实例对象一样包含选项，
// 他们将在 Vue.extend() 里最终选择使用相同的选项合并逻辑合并。
// 举例：如果你的混入包含一个钩子而创建组件本身也有一个，两个函数将被调用。
//
// Mixin 钩子按照传入顺序依次调用，并在调用组件自身的钩子之前被调用。
import {debounce} from './utils'

export const itemListenerMixin = {
  data(){
    return{
      imageListener:null,
      refresh:null
    }
  },
  mounted(){
    this.refresh = debounce(this.$refs.scroll.refresh,100)
    this.imageListener = ()=>{
      this.refresh()
    }
    this.$bus.$on('itemImageLoad',this.imageListener)
    console.log("混入");
  }
}
