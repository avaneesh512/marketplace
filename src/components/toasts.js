import Vue from "vue"
import Toasted from 'vue-toasted';
Vue.use(Toasted)

Vue.toasted.register('loginError', 'Wrong Email or password!', {
  type: 'error',
  duration: 2000
})
Vue.toasted.register('noInternet', 'No Internet Connection!', {
  type: 'error',
  duration: 2000
})
Vue.toasted.register('unknownError', 'Something went wrong!', {
  type: 'error',
  duration: 2000
})
Vue.toasted.register('register_error',     
  (payload) => {        
  // if there is no message passed show default message
  if(! payload.message) {
    return "Oops.. Something Went Wrong.."
  }  
  // if there is a message show it with the message
  return payload.message;
  }, {
  type: 'error',
  duration: 2000
})