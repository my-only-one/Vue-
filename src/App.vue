<template>
  <div id="app">
    <Header :title='title' @titleChange="updateTitle"/>
    <!--    <hello></hello>-->

    <!--3.调用组件-->
    第一种方式:
    <!--    属性传值：值有2种情况：1.传值  2.传引用(对象,数组)-->
    <users :users='users'/>
    <hr>
    <users :users='users'/>


    <!--    <p>第二种方式:<Users/></p>-->
    <!--    <p>第三种方式:<users-name/></p>-->
    <Footer :title='title'/>
    <router-view>dgdgdg</router-view>
  </div>
</template>

<script>
  // 1.局部引用组件
  import Users from '@/components/Users' // 局部组件
  import HelloWorld from '@/components/HelloWorld'  // 局部组件,main.js有全局组件，已注释
  import Header from '@/components/Header'
  import Footer from '@/components/Footer'

  export default {
    name: 'App',
    // 2.注册组件
    components: {
      users: Users, // 第一种方式
      // Users, // 第二种方式
      // 'users-name':Users, // 第三种方式
      // hello: HelloWorld
      Header,
      Footer
    },
    data() {
      return {
        users: [
          {name: '小猪佩奇', wechat: '123', show: true},
          {name: '大象艾美莉', wechat: '123', show: true},
          {name: '小羊苏西', wechat: '123', show: false},
          {name: '小羊苏西2', wechat: '123', show: true},
          {name: '小羊苏西3', wechat: '123', show: true},
          {name: '小羊苏西4', wechat: '123', show: true},
          {name: '小羊苏西5', wechat: '123', show: true}
        ],
        title: 'Vue ming yuan'
      }
    },
    methods: {
      updateTitle(p) {
        this.title = p

      }
    }
  }
</script>

<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  h3 {
    color: purple;
    font-size: 30px;
  }
</style>
