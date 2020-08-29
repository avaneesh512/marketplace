<template>

  <div class="landing h-100 container">
    <div class="box d-sm-flex justify-content-center align-items-center py-5">
      <div class="box-image flex-1">
        <img src="../assets/shoppingimage.png" class="img-fluid w-100" title="shopping immage" />
      </div>
      <div class="box-content p-3 d-flex justify-content-center flex-2">
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
          <h4>Welcome to Marketplace</h4>
          <a href="/" class="no-hover color-primary">click here to select products</a>
        </div>
      </div>
    </div>
  <div class="">
        <slick
        ref="slick"
        :options="slickOptions">
        <a href="#"><img src="../assets/banners/landing_banner_1.png" alt="" class="img-fluid"></a>
        <a href="#"><img src="../assets/banners/landing_banner_2.png" alt="" class="img-fluid"></a>
      </slick>
  </div>


    <!-- <div class="my-5">
      <a class="" href="/products">
        <img src="../assets/promotions/promotion_tag_1.png" class="img-fluid" />
      </a>
    </div> -->
    
  </div>
</template>


<style scoped>

</style>

<script>
import { authComputed } from '../store/index.js';
import Slick from 'vue-slick';

export default {
    data() {
        return {
            slickOptions: {
                slidesToShow: 1,
                nextArrow: `<em class="fa fa-chevron-right right-arrow" style="cursor:pointer;z-index:1"></em>`,
			          prevArrow: `<em class="fa fa-chevron-left left-arrow" style="color:#cccccc;cursor:pointer;z-index:1"></em>`,
            },
        };
    },
    computed: {
    ...authComputed
    },
    components: { Slick },
    methods: {
         next() {
            this.$refs.slick.next();
        },

        prev() {
            this.$refs.slick.prev();
        },
    }
}
</script>


