<template>
  <div id="app">
    <FormHelper :title-name="title"><!--:title-name 向子组件传值-->
      <h2 slot="t">{{title}}</h2>
      <p slot="text">这个是文本内容</p>
    </FormHelper>
  </div>
</template>

<script>
// 1.引入组件
import FormHelper from '@/components/FormHelper'
  export default {
    name: 'App',
    // 2.注册组件
    components: {
      FormHelper
    },
    data() {
      return {
        title: '这是标题'
      }
    },
    methods: {}
  }
</script>

<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  h2{
    background: lightgreen;
  }
</style>
