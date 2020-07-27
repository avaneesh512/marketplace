import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import 'bootstrap';
//import axios from 'axios';
import './components/toasts';


Vue.config.productionTip = false;

new Vue({
  data() {
    return {
      test: 'test'
    }
  },
  router,
  store,
  created () {
    const userString = localStorage.getItem('user')
    if (userString) {
      const userData = JSON.parse(userString)
      this.$store.commit('SET_USER_DATA', userData)
    }
    // axios.interceptors.response.use(
    //   response => response,
    //   error => {
    //     if (error.response.status === 401) {
    //       this.$store.dispatch('logout');
    //       this.$toasted.global.loginError();
    //     }
    //     return Promise.reject(error)
    //   }
    // )
  },
  render: h => h(App)
}).$mount("#app");
