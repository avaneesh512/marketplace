<template>
  <div class="dashboard container-fluid">
     <div class="row">
       <div class="col-12 p-0">
        <carousel :per-page="1" :mouse-drag="true" :loop="true" :autoplay="3000">
          <slide v-for="banner in bannerData" :key="banner.imgId">
            <a href="#"><img :src='require(`../assets/home_banners/${banner.imgUrl}`)' alt="" class="w-100"></a>    
          </slide>
        </carousel>
       </div>
     </div>
     <div class="position-relative my-5">
       <img id="slider_image" src="../assets/slider_offers/slider_1.png" class="img-fluid" />
     </div>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import { bannerData } from '../js/constants';

export default {
  data() {
  return{
      bannerData: []
    }
  },
  components: {
      Carousel,
      Slide
    },
    mounted() {
      this.bannerData = bannerData;
    }
};
</script>

<style>
.VueCarousel-pagination {
    width: 100%;
    text-align: center;
    position: absolute !important;
    bottom: 5%;
}
#slider_image{
  display: block;
  position: absolute;
  animation: linear infinite alternate;
  animation-name: run;
  animation-duration: 5s;
}
@keyframes run {
    0% {
      left: 0;
      transform: translateX(0);
    }
    100% {
      left: 100%;
      transform: translateX(-100%);
    }
}
</style>
