<template>
  <div class="container-fluid">
    <div class="row set-page-height">
      <div class="col-md-6 bg-violet">
        <div class="h-100 d-flex justify-content-center align-items-center contact-left-side-title">
          Contact our support and sales team
        </div>
      </div>
      <div class="contactus col-md-6">
        <!-- <div class="text-center my-3">
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
        </div> -->

        <div class="right-side-form">
          <h3 class="py-3">Reach Us</h3>
          <div class="contact-error-notification bgcolor-red text-white py-2 my-3 px-4" v-if="findIsError()">
            Please correct the below fields
          </div>
          <div class="contactus-box w-100">
            <form @submit.prevent="logUserDetails()" class="text-sm-right" novalidate>
              <div class="form-group mb-4 row">
                <label for="name" class="user-info-label col-4 text-right">
                  Name
                </label>
                <input type="text" class="name-input user-info-inputs col-4" id="name" v-model="name"
                  :class="[{'error': errordetails.nameerror}]">
              </div>
              <div class="form-group mb-4 row">
                <label for="email" class="user-info-label col-4 text-right">
                  Email
                </label>
                <input type="text" class="email-input user-info-inputs col-4" id="email" v-model="email"
                  :class="[{'error': errordetails.emailerror}]">
              </div>
              <div class="form-group mb-4 row">
                <label for="phone" class="user-info-label col-4 text-right">
                  Phone
                </label>
                <input type="text" class="phone-input user-info-inputs col-4" id="phone" v-model="phone"
                  :class="[{'error': errordetails.phoneerror}]">
              </div>
              <div class="form-group mb-4 row">
                <label for="message" class="user-info-label col-4 text-right">
                  Leave a comment
                </label>
                <textarea type="text" class="message-input user-info-inputs col-4" id="message" v-model="message"></textarea>
              </div>
              <div class="text-center">
                <button class="btn bgcolor-primary text-white py-2 px-5">Submit</button>
              </div>
            </form>
          </div>
        </div>
        <Toaster v-if="showToaster" :type="errorType" :msg="errorMsg" @hide-toaster="showToaster = !showToaster" />
      </div>
    </div>
  </div>

</template>

<script>
  import {
    Validations
  } from '../services/validations';
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
        if (validations.checkError(this.errordetails)) {
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
              if (res.data.status == 'success') {
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
      },
      findIsError(){
        if(this.errordetails.nameerror || this.errordetails.emailerror || this.errordetails.phone) {
          return true;
        }
        return false;
      }
    }
  };
</script>
<style scoped>
  .user-info-inputs {
      border: 1px solid #ccc;
      padding: 5px;
      border-radius: 5px;
  }

  .ft-style {
    font-style: italic;
    font-family: cursive;
    font-weight: bold;
  }

  .right-side-form {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .set-page-height {
    height: calc(100vh - 61px);
  }
  .bg-violet {
    background-color: #321F40;
  }
  .contact-left-side-title {
    color: #fff;
    font-weight: bold;
    font-size: 5em;
    margin-left: 15%;
  }
</style>