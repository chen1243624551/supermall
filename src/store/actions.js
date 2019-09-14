export default{
  addCart(context,payload){
    console.log(payload);
    var oldProduct = null;
    //判断要添加到carlList中的商品之前有没有加过,加过就只要数量+1,否则就添加到carlList
    for (let item of context.state.cartList) {
      if (item.iid === payload.iid) {
        oldProduct = item
      }
    }
    if (oldProduct) {
      context.commit('addCounter',oldProduct)
    }else {
      payload.count = 1
      context.commit('addToCart',payload)
    }
  }
}
