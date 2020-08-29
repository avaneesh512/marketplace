<template>
  <div class="admin-settings pb-5">
      <h1 class="mb-5 page-title">Admin settings</h1>
    <div class="create-products container-fluid mb-5">
      <h3 class="text-center mb-5">Create Product</h3>
      <form @submit.prevent="createProduct()" class="" novalidate enctype="multipart/form-data">
        <div class="row">
          <div class="col-md-4">
            <div class="form-group row">
              <label for="productname" class="login-label col-4">
                Product Name
              </label>
              <input v-model="productDetails.productName" type="text" class="productname-input credentials-inputs col-6"
                id="productname" :class="[{'error': errorDetails.productnameerror}]">
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group row">
              <label for="productCategory" class="login-label col-4">
                Product Category
              </label>              
              <div class="position-relative col-6 p-0" id="productCategory">
                <div class="credentials-inputs text-left c-pointer" @click="showProductCategory=!showProductCategory"
                 :class="[{'error': errorDetails.productcategoryerror}]">
                  {{productDetails.productCategory}}
                  <span class="position-absolute" style="right: 11px;">
                    <svg class="bi bi-caret-down-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z" />
                    </svg>
                  </span>
                </div>
                <div class="options-block position-absolute" v-if="showProductCategory">
                  <span class="d-block" v-for="(cat,index) in productCategoryList" :key="index"
                    @click="productCategorySelected(cat)">{{cat}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group row">
              <label for="productSubCategory" class="login-label col-4">
                Product SubCategory
              </label>              
              <div class="position-relative col-6 p-0" id="productSubCategory">
                <div class="credentials-inputs text-left c-pointer" @click="showProductSubCat=!showProductSubCat"
                 :class="[{'error': errorDetails.productsubcategoryerror}]">
                  {{productDetails.productSubCategory}}
                  <span class="position-absolute" style="right: 11px;">
                    <svg class="bi bi-caret-down-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z" />
                    </svg>
                  </span>
                </div>
                <div class="options-block position-absolute" v-if="showProductSubCat">
                  <span class="d-block" v-for="(subcat,index) in productSubCategoryList" :key="index"
                    @click="productSubCategorySelected(subcat)">{{subcat}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group row">
              <label for="productType" class="login-label col-4">
                Product Type
              </label>
             
              <div class="position-relative col-6 p-0" id="productType">
                <div class="credentials-inputs text-left c-pointer" @click="showProductType=!showProductType"
                 :class="[{'error': errorDetails.producttypeerror}]">
                  {{productDetails.productType}}
                  <span class="position-absolute" style="right: 11px;">
                    <svg class="bi bi-caret-down-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z" />
                    </svg>
                  </span>
                </div>
                <div class="options-block position-absolute" v-if="showProductType">
                  <span class="d-block" v-for="(type,index) in productTypeList" :key="index"
                    @click="productTypeSelected(type)">{{type}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group row">
              <label for="productImg" class="login-label col-4">
                Product Image
              </label>
                <input class="productimg-input credentials-inputs col-6" id="productImg" type="file" name="uploaded_image"
                @change="handleFileChange($event)"                
                :class="[{'error': errorDetails.productimgerror}]" ref="fileupload" />
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group row">
              <label for="price" class="login-label col-4">
                Price
              </label>
              <input v-model="productDetails.price" type="text" class="price-input credentials-inputs col-6" id="price"
                :class="[{'error': errorDetails.priceerror}]">
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group row">
              <label for="discount" class="login-label col-4">
                Discount
              </label>              
              <div class="position-relative col-6 p-0" id="discount">
                <div class="credentials-inputs text-left c-pointer" @click="showDiscount=!showDiscount"
                :class="[{'error': errorDetails.discounterror}]">
                  {{productDetails.discount}}
                  <span class="position-absolute" style="right: 11px;">
                    <svg class="bi bi-caret-down-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z" />
                    </svg>
                  </span>
                </div>
                <div class="options-block position-absolute" v-if="showDiscount">
                  <span class="d-block" v-for="(discount,index) in discountsList" :key="index"
                    @click="discountSelected(discount)">{{discount}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group row">
              <label for="quantityAvailable" class="login-label col-4">
                Quantity Available
              </label>
              <input v-model="productDetails.quantityAvailable" type="text"
                class="quantityavailable-input credentials-inputs col-6" id="quantityAvailable"
                :class="[{'error': errorDetails.quantityavailableerror}]">
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group row">
              <label for="size" class="login-label col-4">
                Product Size
              </label>
              <div class="position-relative col-6 p-0" id="size">
                <div class="credentials-inputs text-left c-pointer" @click="showSizes=!showSizes"
                 :class="[{'error': errorDetails.sizeerror}]">
                  {{productDetails.size}}
                  <span class="position-absolute" style="right: 11px;">
                    <svg class="bi bi-caret-down-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z" />
                    </svg>
                  </span>
                </div>
                <div class="options-block position-absolute" v-if="showSizes">
                  <span class="d-block" v-for="(size,index) in sizesList" :key="index"
                    @click="sizeSelected(size)">{{size}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12 text-right my-4">
            <button class="btn text-white bgcolor-primary mr-4">Submit</button>
            <button class="btn text-white bgcolor-red" type="button" @click="resetCreateProductForm()">Reset</button>
          </div>
        </div>
      </form>
    </div>   

    <div class="customer-leads-table">
        <customer-leads></customer-leads>
    </div> 
    <Toaster v-if="showToaster" :type="errorType" :msg="errorMsg" @hide-toaster="showToaster = !showToaster" />
  </div>
</template>

<script>
import { Validations } from '../services/validations';
import axios from "axios";
import Toaster from '../components/toaster';
import customerLeads from '../components/customerleads';
  export default {
    data() {
      return {
        productDetails: {
          productName: '',
          productCategory: 'select category',
          productSubCategory: 'select subcategory',
          productType: 'select product type',
          productImg: '',
          price: '',
          discount: 'select discount',
          quantityAvailable: '',
          size: 'select size'
        },
        errorDetails: {
          productnameerror: false,
          productcategoryerror: false,
          productsubcategoryerror: false,
          producttypeerror: false,
          productimgerror: false,
          priceerror: false,
          discounterror: false,
          quantityavailableerror: false,
          sizeerror: false
        },
        showSizes: false,
        sizesList: ['small', 'medium', 'large', 'extra large'],
        showDiscount: false,
        discountsList: ['10', '20', '30', '40', '50'],
        showProductType: false,
        productTypeList: ['cotton', 'silk', 'nylon', 'polyster', 'leather'],
        showProductSubCat: false,
        productSubCategoryList: ['jeans', 't-shirt', 'shirt', 'shorts', 'breifs', 'vests', 'trousers', 'shoes', 'blazers'],
        showProductCategory: false,
        productCategoryList: ['upper ware', 'bottom ware', 'foot ware', 'inner ware'],
        showToaster: false,
        errorType: '',
        errorMsg: '',
      }
    },
    components: {      
      Toaster,
      customerLeads
    },
    methods: {
      sizeSelected(size) {
        this.showSizes = false;
        this.productDetails.size = size;
      },
      discountSelected(discount) {
        this.showDiscount = false;
        this.productDetails.discount = discount;
      },
      productTypeSelected(type) {
        this.showProductType = false;
        this.productDetails.productType = type;
      },
      productSubCategorySelected(value) {
        this.showProductSubCat = false;
        this.productDetails.productSubCategory = value;
      },
      productCategorySelected(value) {
        this.showProductCategory = false;
        this.productDetails.productCategory = value;
      },
      handleFileChange(event){        
        this.productDetails.productImg = event.target.files[0];
      },
      createProduct() {
        let validations = new Validations();
            this.errorDetails.productnameerror = validations.checkEmpty(this.productDetails.productName);
            this.errorDetails.productcategoryerror = validations.checkDropDownEmpty(this.productDetails.productCategory);
            this.errorDetails.productsubcategoryerror = validations.checkDropDownEmpty(this.productDetails.productSubCategory);

            this.errorDetails.producttypeerror = validations.checkDropDownEmpty(this.productDetails.productType);
            this.errorDetails.productimgerror = validations.checkFileEmpty(this.productDetails.productImg);
            this.errorDetails.priceerror = validations.checkEmpty(this.productDetails.price);

            this.errorDetails.discounterror = validations.checkDropDownEmpty(this.productDetails.discount);
            this.errorDetails.quantityavailableerror = validations.checkEmpty(this.productDetails.quantityAvailable);
            this.errorDetails.sizeerror = validations.checkDropDownEmpty(this.productDetails.size);
            if(validations.checkError(this.errorDetails)) {
              let formData = new FormData();
              Object.keys(this.productDetails).forEach(key => formData.append(key, this.productDetails[key]));

              axios
                .post('//localhost:3000/createproduct', formData)
                .then((res) => {                    
                  if (res.data.status == 'success') {
                    this.showToaster = true;
                    this.errorMsg = res.data.message;
                    this.errorType = 'success';
                  } else {
                    this.showToaster = true;
                    this.errorMsg = 'Sorry something went wrong try again !';
                    this.errorType = 'error';
                  }
                  this.resetCreateProductForm();
                })
                .catch(() => {
                this.showToaster = true;
                this.errorMsg = 'Something Went Wrong';
                this.errorType = 'error';
                this.resetCreateProductForm();
                })
            }
      },
      resetCreateProductForm() {
          this.productDetails = {
          productName: '',
          productCategory: 'select category',
          productSubCategory: 'select subcategory',
          productType: 'select product type',
          productImg: '',
          price: '',
          discount: 'select discount',
          quantityAvailable: '',
          size: 'select size'
        }
        this.$refs.fileupload.value=null;
      }

    }
  };
</script>

<style scoped>
  .options-block {
    width: inherit;
    background: #eee;
    z-index: 2;
    border: 1px solid #ccc;
  }

  .options-block.position-absolute span {
    padding: 5px;
  }

  .options-block.position-absolute span:hover {
    background-color: #fff;
    cursor: pointer;
  }

  .page-title {    
    padding: 20px;    
  }
</style>