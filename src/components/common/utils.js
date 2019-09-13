//防抖动函数的封装
export function debounce(func,delay){
  let timer = null
  return function(...args){
    if(timer) clearTimeout(timer)
    timer = setTimeout(()=>{
      func.apply(this,args)
    },delay)
  }
}

//日期格式化函数的封装
export function formatDate(date,fmt){
  //获取年份
  //test()方法用于判断模式与该参数是否匹配,匹配的情况下返回true；否则，返回 false
  //这里传进来的参数是yyyy-MM-dd,和模式(y+)匹配,返回true
  if (/(y+)/.test(fmt)) {
    //RegExp.$1、RegExp.$2…RegExp.$9，分别用于存储第一、第二……第九个匹配的捕获组
    fmt = fmt.replace(RegExp.$1,(date.getFullYear()+ '').substr(4-RegExp.$1.length));
  }
  let o ={
    'M+':date.getMonth() +1,
    'd+':date.getDate(),
    'h+':date.getHours(),
    'm+':date.getMinutes(),
    's+':date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1,(RegExp.$1.length === 1)?str:padLeftZero(str));
    }
  }
  return fmt;
};
function padLeftZero(str){
  return ('00'+str).substr(str.length);
}
