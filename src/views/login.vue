<template>
  <div class="login-component pt-5 container">
    <h3 class="text-center">login</h3>
    <div class="login-box p-5">
      <form @submit.prevent="userLogin()" class="text-sm-right" novalidate>
        <div class="form-group mb-4">
          <label for="email" class="login-label mr-4">
            User Email
          </label>
          <input v-model="email" type="email" class="email-input credentials-inputs" 
          id="email" :class="[{'error': errordetails.emailerror}]">
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
    </div>
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
      password: '',
      showToaster: false,
      errorType: '',
      errorMsg: '',
      errordetails: {
        emailerror: false,
        passworderror: false
      }
    }
  },
  components: {
    Toaster
  },
  methods: {
      userLogin() {
        let validations = new Validations();
        this.errordetails.emailerror = validations.checkEmail(this.email);
        this.errordetails.passworderror = validations.checkEmpty(this.password);
        if(validations.checkError(this.errordetails)) {
          this.$store
          .dispatch('login', {
            email: this.email,
            password: this.password
          })
          .then(() => {
            this.showToaster = true;
            this.errorMsg = 'User Logged Sucessfully';
            this.errorType = 'sucess';
            setTimeout(()=>{
              this.$router.push({ name: 'dashboard' })
            }, 2000);          
          })
          .catch(() => {
            this.showToaster = true;
            this.errorMsg = 'Invalid username or password!';
            this.errorType = 'error';
          })
        }
      },
    }
  }
</script>
<style scoped>
.login-component {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.site-name {
  border-left: 10px solid green;
    padding-left: 5px;
    border-bottom: 2px solid green;
}
.i-logo {
  color: #e24c4c;
  font-style: italic;
  font-family: initial;
  font-size: 40px;
}
</style>
