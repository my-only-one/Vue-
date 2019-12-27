<template>
  <div class="header" @click="changeTitle">
    <h1>{{title}}</h1>
  </div>
</template>

<script>
  export default {
    name: "Header",
    props: {
      title: {
        type: String
      }
    },
    data() {
      return {
        // title: 'Vue Componets Demo'
      }
    },
    methods: {
      changeTitle () {
        // this.title = 'changeTitle'

        // 注册事件 参数1：事件名称 参数2 ...值,titleChange 在App.vue中使用
        this.$emit('titleChange', 'mingyuan通过$emit到App.vue修改title值')

      }
    },
    // 生命周期函数
    beforeCreate () {
      // alert('这时实例还没有被创建,所以你无法知道data,也不能用watch监听')
    },
    created () {
      // alert('这时实例已经创建,可以的得到data,调用watch,但是页面还是空白的')
    },
    beforeMount () {
      // alert('页面挂载前,此时页面依然是空白的,这是render函数首次被调用')
    },
    mounted () {
      // alert('页面挂载了,这是你可以看到页面的内容,也可以访问到DOM')
    },
    beforeUpdate () {
      // alert('数据更新之前,也就是虚拟DOM打补丁之前,这是访问的DOM还有原有的DOM')
    },
    updated () {
      // alert('数据已经更新完毕')
    },
    beforeDestory () {
      // alert('页面离开之前被调用,清除定时器或者三方的一些DOM结构')
    },
    destoryed () {
      // alert('当前实例完全被销毁')
    }
  }
</script>

<style scoped>
  .header {
    background: lightgreen;
    padding: 10px;
  }

  h1 {
    color: #222;
    text-align: center;
  }
</style>
