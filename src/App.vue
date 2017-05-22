<template>
  <div > 
    <v-header :seller="seller">
    
    </v-header >
    <div class="tab border-1px">
        <!-- 使用 router-link 组件来导航. -->
        <!-- 通过传入 `to` 属性指定链接. -->
        <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
        <div class="tab-item">
            <router-link to="/goods" >商品</router-link></div>
        <div class="tab-item">
            <router-link to="/ratings">评论</router-link></div>
        <div class="tab-item">
            <router-link to="/seller">商家</router-link></div>
    </div>
    <div class="content">
    <!-- 路由匹配到的组件将渲染在这里 -->
    <keep-alive>  
      <router-view :seller="seller"></router-view>
    </keep-alive>
    </div>
  </div>
</template>
<script>
  import header from './components/header/header.vue' ;


  export default{
      data() {
          return{
            seller: {}
          }
      },
      created() {
          this.$http.get('/api/seller').then( (response) => {
                response = response.body;
                this.seller = response.data;
          });
      },
      components: {
       'v-header' :header
      }

  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "./common/stylus/mixin.styl"
  .tab{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
   border-1px(rgba(7,17,27,.1))
  }
  .tab-item{
    flex:1;
    text-align: center;

  }
 .router-link-active{
    
    color: rgb(240,20,20) !important;
  }
.tab-item a{
    display: block;
    font-size: 14px;
    color: rgb(77,85,93) ;
  }

</style>
