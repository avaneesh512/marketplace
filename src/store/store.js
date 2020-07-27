import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from '../router';
import '../components/toasts.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET_USER_DATA (state, userData) {      
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
      axios.defaults.headers.common['Authorization'] = `Bearer ${
        userData.token
      }`
    },
    CLEAR_USER_DATA (state) {
      localStorage.removeItem('user');      
      state.user = '';
      router.push('/login');
    }
  },
  actions: {
    login ({ commit }, credentials) {
      return axios
        .post('//localhost:3000/login', credentials)
        .then(({ data }) => {
          commit('SET_USER_DATA', data)
        })
    },
    logout ({ commit }) {
      commit('CLEAR_USER_DATA')
    },
    register ({ commit }, userDetails) {
      return axios
      .post('//localhost:3000/register', userDetails)
      .then(({ data }) => {
        if(data.error) {
          return data
        }else {
          commit('SET_USER_DATA', data)
          router.push({ name: 'dashboard' })
        }
      })
    },
    updateuser ({commit}, userdetails) {
      return axios
      .post('//localhost:3000/updateUser', userdetails)
      .then(({data}) => {
        commit('SET_USER_DATA', data)
      })
    }
  },
  modules: {
      
  },
  getters: {
    loggedIn (state) {
      return !!state.user
    },
    userInfo (state) {
      return state.user
    }
  }
});
