<template>
  <div class="users">
    <p>{{users}}</p>
    <ul>
      <li v-for="(item, index) in users" :key="index" @click="item.show = !item.show">
        <h2>{{item.name}}</h2>
        <h3 v-show="item.show">{{item.wechat}}</h3>
      </li>
    </ul>
    <!--传引用-->
    <button @click="deleteUser">deleteUser</button>
  </div>

</template>

<script>
  export default {
    name: "Users",
    // props: ['users','users1','users2','users3'],
    props: {
      users: {
        type: Array,
        required: true // 默认为false
      },
      /*users2: {
        type: Array,
        required: true
      }*/
    },
    data() {
      return {}
    },
    created () {

    },
    methods: {
      deleteUser() {
        this.users.pop();

      }
    }
  }
</script>

<style scoped lang="scss">
  h2 {
    color: green;
  }

  .users {
    width: 100%;
    max-width: 1200px;
    margin: 40px auto;
    padding: 0 20px;
    box-sizing: border-box;

    ul {
      display: flex;
      flex-wrap: wrap;

      li {
        flex-grow: 1;
        flex-basis: 200px;
        text-align: center;
        padding: 30px;
        border: 1px solid #222;
        margin: 10px;
      }
    }
  }

</style>
