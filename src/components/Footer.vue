<template>
  <div class="footer">
    <h1>{{copyright}}{{title}}</h1>
  </div>
</template>

<script>
  export default {
    name: "Footer",
    props: {
      title: {
        type: String
      }
    },
    data() {
      return {
        copyright: 'copyright 2019 vue demo'
      }
    }
  }
</script>

<style scoped>
  .footer {
    background: #222;
    padding: 10px;
  }

  h1 {
    color: lightgreen;
    text-align: center;
  }
</style>
