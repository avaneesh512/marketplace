<template>
  <div class="profile pt-5 container">
      <div class="">
        <div class="profile-title d-flex align-items-center justify-content-center">
          <div class="">
              <svg class="bi bi-people-circle" width="4em" height="4em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 008 15a6.987 6.987 0 005.468-2.63z"/>
                <path fill-rule="evenodd" d="M8 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
                <path fill-rule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8z" clip-rule="evenodd"/>
                </svg>
          </div>
          <div class="pl-4">
                <h2>Hello, {{userInfo.name}}</h2>
          </div>
        </div>
        <div class="mt-5" v-if="userDetails !== ''">
          <form class="row" @submit.prevent="updateUserDetails()" novalidate>
            <div class="col-md-6">
                <div class="form-group mb-4 row align-items-center">
                    <label for="name" class="login-label mr-4 col-md-3">
                        Name
                    </label>
                    <input type="text" class="credentials-inputs col-md-7 mx-4 mx-md-0" 
                    id="name" v-model="userDetails.name" :disabled="disabledFields" 
                    :class="[{'error': errorDetails.nameerror}]">
                </div>
                <div class="form-group mb-4 row align-items-center">
                    <label for="email" class="login-label mr-4 col-md-3">
                        Email
                    </label>
                    <input type="email" class="credentials-inputs col-md-7 mx-4 mx-md-0" 
                    id="email" v-model="userDetails.email" :disabled="disabledFields"
                    :class="[{'error': errorDetails.emailerror}]">
                </div>
                <div class="form-group mb-4 row align-items-center">
                    <label for="phone" class="login-label mr-4 col-md-3">
                        Phone
                    </label>
                    <input type="text" class="credentials-inputs col-md-7 mx-4 mx-md-0" 
                    id="phone" v-model="userDetails.phone" :disabled="disabledFields"
                    :class="[{'error': errorDetails.phoneerror}]">
                </div>
                <div class="form-group mb-4 row align-items-center">
                    <label for="address" class="login-label mr-4 col-md-3">
                        Address
                    </label>
                    <textarea type="text" class="credentials-inputs col-md-7 mx-4 mx-md-0" 
                    id="address"  v-model="userDetails.address" :disabled="disabledFields" />
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group mb-4 row align-items-center">
                    <label for="state" class="login-label mr-4 col-md-3">
                        State
                    </label>
                    <div class="position-relative col-md-7 mx-4 mx-md-0 p-0">
                        <div class="credentials-inputs text-left c-pointer" @click="showSelectMenu=!showSelectMenu"
                        v-bind:class="{ 'disable-select' : disabledFields}">
                            {{userDetails.state}}
                            <span class="position-absolute" style="right: 11px;">
                                <svg class="bi bi-caret-down-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z"/>
                                </svg>
                            </span>
                        </div>
                        <div class="options-block position-absolute" v-if="showSelectMenu">
                            <span class="d-block" v-for="(state,index) in statesList" :key="index"
                            @click="optionSelected(state)">{{state.name}}</span>
                        </div>
                    </div>
                </div>
                <div class="form-group mb-4 row align-items-center">
                    <label for="pincode" class="login-label mr-4 col-md-3">
                        Pincode
                    </label>
                    <input type="number" class="credentials-inputs col-md-7 mx-4 mx-md-0" 
                    id="pincode"  v-model="userDetails.pincode" :disabled="disabledFields">
                </div>
                <div class="d-sm-flex justify-content-center">
                    <button class="btn bgcolor-primary text-white mr-sm-5" @click.prevent="enableFields()">Edit</button>
                    <button class="btn bgcolor-primary text-white">Update</button>
                </div>
            </div>
          </form>
        </div>
      </div>
    <Toaster v-if="showToaster" :type="errorType" :msg="errorMsg" @hide-toaster="showToaster = !showToaster" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { States } from '../services/states';
import { Validations } from '../services/validations';
import axios from "axios";
import Toaster from '../components/toaster';
export default {
    data() {
        return{
            statesList: '',
            userDetails: {},
            showSelectMenu: false,
            disabledFields: true,
            showToaster: false,
            errorType: '',
            errorMsg: '',
            errorDetails: {
               nameerror: false,
               emailerror: false,
               phoneerror: false
           }
        }
    },
    computed: {
        ...mapState({
            userInfo: (state) => state.user
        })
    },
    mounted() {
        this.getStatesList();
        this.getuserDetails();
    },
    components: {
        Toaster
    },
    methods: {
        getStatesList() {            
            let states = new States();
            this.statesList = states.getStates();
        },
        getuserDetails() {
            axios.get("//localhost:3000/profile")
            .then((res) => {
                this.userDetails = res.data;
                console.log(this.userDetails);
                if(this.userDetails && this.userDetails.state =='') {
                    this.userDetails.state = 'Select State';
                }
            })
            .catch((error)=> {
                console.log(error);
            })
        },
        optionSelected(state) {
            this.showSelectMenu = false;
            this.userDetails.state = state.name;
        },
        enableFields() {
            this.disabledFields = false;
        },
        updateUserDetails() {
            let validations = new Validations();
            this.errorDetails.nameerror = validations.checkEmpty(this.userDetails.name);
            this.errorDetails.emailerror = validations.checkEmail(this.userDetails.email);
            this.errorDetails.phoneerror = validations.checkPhone(this.userDetails.phone);
            if(validations.checkError(this.errorDetails)) {
                this.$store
                .dispatch('updateuser', this.userDetails)
                .then(() => {                
                this.showToaster = true;
                this.errorMsg = 'User Data Updated Successfully';
                this.errorType = 'success';   
                this.disabledFields = true;                       
                })
                .catch(() => {
                this.showToaster = true;
                this.errorMsg = 'Something Went Wrong';
                this.errorType = 'error';
                })
            }
        }
    }

};
</script>
<style scoped>
#state {
    padding: 8px 5px;
}
.options-block {
    width: inherit;
    background: #eee;
    z-index: 2;
    height: 200px;
    overflow-y: scroll;
    border: 1px solid #ccc;
}
.options-block.position-absolute span{
    padding: 5px;
}
.options-block.position-absolute span:hover{
    background-color: #fff;
    cursor: pointer;
}
.c-pointer{
    cursor: pointer;
}
.disable-select {    
    pointer-events: none;
    background-color: #EBEBE4;
}
@media (max-width: 567px){
    button {
        width: 100%;
        margin-bottom: 10px;
    }
}
</style>
