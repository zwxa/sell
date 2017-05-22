// 引入路由模块并使用它
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 创建路由实例并配置路由映射
var router = new VueRouter({
  routes: [
    {
      path: '/goods',
      component: require('../components/goods/goods.vue')
    },{
      path: '/ratings', component: require('../components/ratings/ratings.vue')
  },{
      path: '/seller', component: require('../components/seller/seller.vue')
  },{ 
  	path:'*',redirect:'/goods'
  }]

})
// 输出router
export default router
