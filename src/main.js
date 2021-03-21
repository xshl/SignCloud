import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store";
import VueFluent from "vfluentdesign";
import "vfluentdesign/lib/index.css";

Vue.use(VueFluent);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
