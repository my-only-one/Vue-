// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible/flexible'
// import 'geek-ui-mobile' // 可以用
import './assets/css/global.css'
import Vant from 'vant';
import 'vant/lib/index.css';
import axios from 'axios'
// import VueAxios from 'vue-axios'
import qs from 'qs'; // qs依赖包用post请求需要用到的
// Vue.use(VueAxios,axios);
//下面是将$axios和$qs挂在原型上，以便在实例中能用 this.$axios能够拿到
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
Vue.use(Vant);
Vue.config.productionTip = false

import Global from '../static/config/global'   //引用
Vue.prototype.GLOBAL = Global;   //挂载原型，可以使用this.GLOBAL拿到global.js的内容

// 注册全局组件
// 1.引入组件
// import HelloWorld from '@/components/HelloWorld'
// 2.注册全局组件
// Vue.component('hello',HelloWorld)

/*(function (doc, win) {
  let docEl = doc.documentElement
  let isIOS = navigator.userAgent.match(/iphone|ipod|ipad|android/gi)
  let dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1

  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'

  docEl.dataset.dpr = dpr
  let meta = doc.getElementsByTagName('meta')
  let head = doc.getElementsByTagName('head')[0]

  // 判断是否有vierport;
  // 如果有则删除

  function removeViewport () {
    for (let i = 0; i < meta.length; i++) {
      if (meta[i].getAttribute('name') === 'viewport') {
        head.removeChild(meta[i])
      }
    }
  }
  removeViewport()

  // 创建节点
  function createViewport () {
    let metaEl = doc.createElement('meta')
    metaEl.setAttribute('name', 'viewport')
    metaEl.setAttribute('content', 'initial-scale=' + 1 / dpr + ', maximum-scale=' + 1 / dpr + ', minimum-scale=' + 1 / dpr + ', user-scalable=no')
    head.insertBefore(metaEl, head.children[0])
  }
  createViewport()

  let recalc = function () {
    let width = docEl.clientWidth
    if (width / dpr > 750) {
      width = 750 * dpr
    }
    docEl.style.fontSize = 100 * (width / 750) + 'px'
  }
  recalc()
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
})(document, window)*/
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  Vant,
  components: { App },
  template: '<App/>'
})
