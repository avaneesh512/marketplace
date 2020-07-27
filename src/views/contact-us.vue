<template>
  <div class="contactus container-fluid bg-img pt-5">
    <div class="text-right my-3">
      <div class="p-3 bg-white scanner-code d-inline-flex justify-content-center align-items-center flex-column">
        <div class="ft-style">
          Scan QR code to open our website in your mobile browser
        </div>
        <div class="">
          <a rel='nofollow' href='https://www.qr-code-generator.com' border='0' style='cursor:default'></a><img
            src='https://chart.googleapis.com/chart?cht=qr&chl=https%3A%2F%2Fqtwonlinetraining.000webhostapp.com%2F&chs=180x180&choe=UTF-8&chld=L|2'
            alt=''>
        </div>
        <div class="py-2 px-5 bgcolor-black text-white">
          Scan Me
        </div>
      </div>
    </div>

    <div class="text-white p-3 text-center contactus-box">
      <h3>Reach Us</h3>
      <div class="d-flex justify-content-center">
        <form @submit.prevent="logUserDetails()" class="text-sm-right" novalidate>
          
          <div class="form-group mb-4">
            <label for="name" class="user-info-label mr-4">
              Name
            </label>
            <input type="text" class="name-input user-info-inputs" 
            id="name" v-model="name" :class="[{'error': errordetails.nameerror}]">
          </div>
          <div class="form-group mb-4">
            <label for="email" class="user-info-label mr-4">
              Email
            </label>
            <input type="text" class="email-input user-info-inputs" 
            id="email" v-model="email" :class="[{'error': errordetails.emailerror}]">
          </div>
          <div class="form-group mb-4">
            <label for="phone" class="user-info-label mr-4">
              Phone
            </label>
            <input type="text" class="phone-input user-info-inputs" 
            id="phone" v-model="phone" :class="[{'error': errordetails.phoneerror}]">
          </div>
          <div class="form-group mb-4 d-flex align-items-center">
            <label for="message" class="user-info-label mr-4">
              Leave a comment
            </label>
            <textarea type="text" class="message-input user-info-inputs" 
            id="message" v-model="message"></textarea>
          </div>
          <div class="">
            <button class="btn bg-white">Submit</button>
          </div>
        </form>
      </div>
    </div>
    <Toaster v-if="showToaster" :type="errorType" :msg="errorMsg" @hide-toaster="showToaster = !showToaster" />
  </div>
</template>

<script>
import { Validations } from '../services/validations';
import axios from "axios";
import Toaster from '../components/toaster';
  export default {
      data() {
        return {
          showToaster: false,
          email: '',
          name: '',
          phone: '',
          message: '',
            errordetails: {
            nameerror: false,
            emailerror: false,
            phoneerror: false
          }
        }
      },
      components: {
        Toaster
      },
      methods: {
        logUserDetails() {
          let validations = new Validations();
          this.errordetails.nameerror = validations.checkEmpty(
            this.name
          );
          this.errordetails.emailerror = validations.checkEmail(
            this.email
          );

          this.errordetails.phoneerror = validations.checkPhone(
            this.phone
          );
          console.log(this.errordetails);
          if(validations.checkError(this.errordetails)) {    
            let userContactInfo = {
              name: this.name,
              email: this.email,
              phone: this.phone,
              message: this.message
            }         
            axios
              .post('//localhost:3000/logContactInfo', userContactInfo)
              .then((res) => {
                this.name = '';
                this.email = '';
                this.phone = '';
                this.message = '';
                if(res.data.status == 'success') {
                  this.showToaster = true;
                  this.errorMsg = res.data.message;
                  this.errorType = 'success';
                } else {
                  this.showToaster = true;
                  this.errorMsg = 'Sorry something went wrong try again !';
                  this.errorType = 'error';
                }
            })            
          }
        }
      }
  };
</script>
<style scoped>
  .bg-img {
    background-image: url('../assets/contactusBanner.jpg');
    height: 100vh;
    background-position: center;
    background-size: cover;
  }

  .ft-style {
    font-style: italic;
    font-family: cursive;
    font-weight: bold;
  }
  .contactus-box {
    width: 25%;
    margin-left: auto;
    background-color: #5dc178;
  }
</style>

// https://www.qr-code-generator.com/solutions/static-url-qr-code/