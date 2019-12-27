<template>
  <div class="home">
      <div class="login-bg"></div>
      <div class="login-box">
        <p align="center"><img src="@/assets/images/login.png" alt="" class="login-img"></p>
        <div class="login-txt">
          <p class="dis-flex">
            <i class="icon"><img src="@/assets/images/user-icon.png" alt=""></i>
            <input type="text" id="account" placeholder="请输入用户名" ref="account" autofocus="autofocus"
                   v-model="account" autocomplete="off">
          </p>
          <p class="dis-flex">
            <i class="icon"><img src="@/assets/images/pwd-icon.png" alt=""></i>
            <input type="password" id="password" placeholder="请输入密码" ref="password" autofocus="autofocus"
                   v-model="password" autocomplete="off">
          </p>
        </div>
        <a class="login-btn" @click="onsubmit">登录</a>
      </div>
  </div>

</template>

<script>
  import Vue from 'vue';
  import {Toast} from 'vant';

  Vue.use(Toast);
  export default {
    name: "login",
    data() {
      return {
        account: '',
        password: ''
      }
    },
    methods: {
      formValidation() {
        // 用户名
        if (this.account === '') {
          Toast('用户名不能为空');
          this.$refs.account.focus();
          return false
        }
        // 密码
        if (this.password === '') {
          Toast('密码不能为空');
          this.$refs.password.focus();
          return false
        }
        return true
      },
      onsubmit() {
        if (!this.formValidation()) {
          return false
        }

        this.$axios.post(this.GLOBAL.host + 'Traffic/LKJ/Login/DoLogin',
          this.$qs.stringify({
            account: this.account,
            password: this.password
          })
        ).then(response => {
          //获取你需要的数据
          let datas = response.data
          console.log(datas)
          if (datas.code === 200) {
            Toast('登录成功');
            localStorage.setItem('lkjhhrzm', datas.result); // 保存
            this.$router.push({path:'/gather'})
          } else if (datas.code === 400) {
            Toast(datas.message)
          }
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '/../../assets/css/style.scss';
</style>
