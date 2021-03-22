import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store";
import VueFluent from "vfluentdesign";
import "vfluentdesign/lib/index.css";
import ElementUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css";

Vue.use(VueFluent);
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
