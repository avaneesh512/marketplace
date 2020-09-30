<template>
  <div class="products-set container">
    <div class="row">
      <div class="col-md-3 mt-3" v-for="product in actualProductsData" :key="product.productId">
        <div class="product-box">
          <div class="image-container">
            <img :src='require(`../../public/images/product_images/${product.productImg}`)' class="img-fluid" />
          </div>
          <div class="product-content p-3">
            <P>{{product.productName}}</P>
            <P>Price - <span class="font-weight-bold">&#8377;{{product.price}}</span></P>
            <P :class="product.quantityAvailable > 0 ? 'color-primary' : 'color-red'">
              {{product.quantityAvailable > 0 ? 'In Stock' : 'Out of Stock'}}</P>
            <div class="">
              <span>Quantity </span>
              <span>
                <select @change="addQuantity($event, product)">
                  <option value="0" selected>0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </span>
            </div>
            <div class="">
              <a href="#" class="no-hover bgcolor-primary text-white d-block text-center py-2 my-3">Add to Cart</a>              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    data() {
      return {
        actualProductsData: []
      }
    },
    components: {},
    mounted() {      
      this.getProducts();
    },
    methods: {
      getProducts() {
        axios.get('//localhost:3000/getproducts')
          .then((res) => {
            this.actualProductsData = res.data;
            console.log(this.actualProductsData);
          })
          .catch((error) => {
            console.log(error);
          })
      },
      addQuantity(event, product) {
        console.log(event.target.value, product);
        product.selectedQuantity = event.target.value;
      }
    }
  };
</script>
<style scoped>
  .product-box {
    border: 1px solid #ccc;
  }

  .image-container {
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
</style>