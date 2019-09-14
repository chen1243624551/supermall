export default {
  // 将vuex中getters选项里的属性转为组件中的计算属性,可以直接使用
  cartLength(state){
    return state.cartList.length
  },
  cartList(state){
    return state.cartList
  }
}
