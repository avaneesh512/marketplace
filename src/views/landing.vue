<template>
  <div class="landing d-sm-flex justify-content-around align-items-center h-100 pt-5 container">

    <div class="box">
      <div class="box-image">
        <img src="../assets/shoppingimage.png" class="img-fluid w-100" title="shopping immage" />
      </div>
      <div class="box-content p-3">
        <div class="" v-if="!loggedIn">
          <h4>To continue shopping please login</h4>
            <router-link to="/login" class="no-hover color-primary">
              <span>click here to login</span> /
            </router-link>
            <router-link to="/register" class="no-hover color-primary">
              <span>click here to register</span>
            </router-link>
        </div>
        <div class="" v-if="loggedIn">
          <h4>Welcome to i store</h4>
          <a href="/" class="no-hover color-primary">click here to select products</a>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.box {
  border: 1px solid #ccc;
}
</style>

<script>
import { authComputed } from '../store/index.js';

export default {
    computed: {
    ...authComputed
    },
}
</script>


