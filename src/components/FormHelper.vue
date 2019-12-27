<template>
  <div>
    <slot name="t"></slot>
    <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis, reiciendis!</h1>
    <p>父组件传过来的title:{{titleName}}</p>
    <slot name="text"></slot>
  </div>
</template>

<script>
  export default {
    name: "FormHelper",
    props:['titleName'],
    data() {
      return {}
    }
  }
</script>

<style scoped>
  h1 {
    font-size: 24px;
  }

</style>
