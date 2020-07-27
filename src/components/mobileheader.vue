<template>
    <div class="mobile-header-container position-absolute w-100 h-100">
        <div class="mobile-sub-menu bgcolor-primary">
            <router-link to="/products" class="no-hover text-white">
                <div class="">
                    <span class="">Products</span>
                </div>
            </router-link>
            <router-link to="/orders" class="no-hover text-white" v-if="loggedIn">
                <div class="">
                    <span class="">Orders</span>
                </div>
            </router-link>
            <router-link to="/profile" class="no-hover text-white" v-if="loggedIn">
                <div class="">
                    <span class="">Profile</span>
                </div>
            </router-link>
            <router-link to="/contact-us" class="no-hover text-white">
                <div class="">
                    <span class="">Contact Us</span>
                </div>
            </router-link>

        <div class="mt-4" v-if="!loggedIn">
            <router-link to="/login" class="no-hover text-white">
                <button class="btn bgcolor-black text-white px-3">
                    Login
                </button>
            </router-link>
        </div>
        <div class="mt-4" v-if="loggedIn">
            <button class="btn bgcolor-black text-white px-3" @click="logout()">
                <svg class="bi bi-power color-red ft-20" width="1em" height="1em" viewBox="0 0 16 16"
                    fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M5.578 4.437a5 5 0 104.922.044l.5-.866a6 6 0 11-5.908-.053l.486.875z"
                        clip-rule="evenodd" />
                    <path fill-rule="evenodd" d="M7.5 8V1h1v7h-1z" clip-rule="evenodd" />
                </svg> Logout
            </button>
        </div>
        </div>
    </div>
</template>
<script>
    import {
        authComputed
    } from '../store/index.js';
    export default {
        data() {
            return {
                hideMenu: false
            }
        },
        computed: {
            ...authComputed
        },
        watch:{
            $route (){        
                this.$emit("showmenu", this.hideMenu);                        
            }
        },
        methods: {
            logout() {
                this.$store.dispatch('logout')
            },
        } 
    }
</script>

<style scoped>
    .mobile-header-container {
        z-index: 99;
        transition: all 5s ease-out;
        border-top: 1px solid #fff;
        top: 62px;
    }

    .mobile-sub-menu {
        height: inherit;
        width: inherit;
    }

    .mobile-sub-menu span {
        display: block !important;
        text-align: left;
        padding: 20px 25px;
        font-size: 20px;
        border-bottom: 1px solid #fff;
    }
</style>