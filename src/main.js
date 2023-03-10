import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import axios from "axios";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  userData: {}
}

const mutations = {
  update (state, userData) {
    state.userData = userData;
  }
}

const store = new Vuex.Store({
  state,
  mutations,
});

const axiosClient = axios.create({
  //baseURL: "https://localhost:3000/"
  //baseURL: "https://sensingdata.onrender.com/"
  baseURL: "https://34.219.134.43:3000/"
});


Vue.config.productionTip = false;
Vue.prototype.$axios = axiosClient;
//Vue.prototype.$userData = {};


new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
