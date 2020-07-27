<template>
  <div class="register-component pt-5 container">
    <h3 class="my-5 text-center">Register</h3>
      <form @submit.prevent="register()" class="text-sm-right" novalidate>
        <div class="form-group mb-4">
          <label for="name" class="login-label mr-4">
            Name
          </label>
          <input v-model="name" type="text" class="name-input credentials-inputs" 
          id="name" :class="[{'error': errordetails.nameerror}]">
        </div>
        <div class="form-group mb-4">
          <label for="email" class="login-label mr-4">
            User Email
          </label>
          <input v-model="email" type="email" class="email-input credentials-inputs" 
          id="email" :class="[{'error': errordetails.emailerror}]">
        </div>
        <div class="form-group mb-4">
          <label for="phone" class="login-label mr-4">
            Phone Number
          </label>
          <input v-model="phone" type="number" class="phone-input credentials-inputs" 
          id="phone" :class="[{'error': errordetails.phoneerror}]">
        </div>
        <div class="form-group mb-4">
          <label for="password" class="login-label mr-4">
            Password
          </label>
          <input v-model="password" type="password" class="password-input credentials-inputs" 
          id="password" :class="[{'error': errordetails.passworderror}]">
        </div>
        <div class="">
          <button class="btn text-white bgcolor-primary">Submit</button>
        </div>
      </form>
      <Toaster v-if="showToaster" :type="errorType" :msg="errorMsg" @hide-toaster="showToaster = !showToaster" />
  </div>
</template>

<script>
import Toaster from '../components/toaster';
import { Validations } from '../services/validations';
export default {
  data() {
    return {
      email: '',
      name: '',
      phone: '',
      password: '',
      showToaster: false,
      errorType: '',
      errorMsg: '',
      errordetails: {
        nameerror: false,
        emailerror: false,
        phoneerror: false,
        passworderror: false
      }
    }
  },
  components: {
    Toaster
  },
  methods: {
    register() {      
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
      this.errordetails.passworderror = validations.checkPassword(
        this.password
      );
      console.log(this.errordetails);
      if(validations.checkError(this.errordetails)) {
        this.$store.dispatch('register', {
          name: this.name,
          email: this.email,
          phone: this.phone,
          password: this.password
        })
        .then((data)=> {
          if(data && data.error) {
            this.showToaster = true;
            this.errorMsg = data.message;
            this.errorType = 'error';
          }
        })
      }
    }
  }
};
</script>
<style scoped>
.register-component {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
@media(max-width: 600px) {
  input {
    width: 85%;
  }
}
</style>
