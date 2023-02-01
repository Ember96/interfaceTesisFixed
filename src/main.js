import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/" 
});


Vue.config.productionTip = false;
Vue.prototype.$privKey = '';
Vue.prototype.$publicKey = '';
Vue.prototype.$web3Addr = '';
Vue.prototype.$axios = axiosClient;


new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
