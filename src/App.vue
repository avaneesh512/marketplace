<template>
  <div id="app">
    <header-bar />
    <router-view class="app-body position-relative primary-body" />    
  </div>
</template>

<script>
import HeaderBar from './components/header';
export default {
 components: { 
  HeaderBar
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.credentials-inputs {
  border: 1px solid #ccc;
    padding: 5px;
    border-radius: 5px;
}
@import './assets/styles.less';
@import'~bootstrap/dist/css/bootstrap.css'
</style>
