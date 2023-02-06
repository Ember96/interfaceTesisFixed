import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import axios from "axios";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    $userData: {}
  },
  mutations: {
    update$userData: function(state, newUserData) { state.$userData = newUserData; }
  }
});

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/" 
});


Vue.config.productionTip = false;
Vue.prototype.$axios = axiosClient;
Vue.prototype.$userData = {};


new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
