<template>
    <div>
        <div class="bgcolor-primary py-2 header-fixed">
            <div class="container h-100">
                <div class="d-flex align-items-center justify-content-between h-100">
                    <div class="d-flex align-items-center">
                        <router-link to="/" class="no-hover text-white">
                            <div class="f-30 d-flex align-items-center">                                
                                <img src="../assets/site_logo.png" class="img-fluid" style="max-height: 40px;" />
                            </div>
                        </router-link>
                    </div>
                    <div class="header-menu font-weight-bold d-none d-md-block text-center">
                        <router-link to="/products" class="no-hover text-white d-inline-block mx-3">
                            <div class="">
                                <span class="">Products</span>
                            </div>
                        </router-link>
                        <router-link to="/orders" class="no-hover text-white d-inline-block mx-3" v-if="loggedIn">
                            <div class="">
                                <span class="">Orders</span>
                            </div>
                        </router-link>
                        <router-link to="/profile" class="no-hover text-white d-inline-block mx-3" v-if="loggedIn">
                            <div class="">
                                <span class="">Profile</span>
                            </div>
                        </router-link>
                        <router-link to="/contact-us" class="no-hover text-white d-inline-block mx-3">
                            <div class="">
                                <span class="">Contact Us</span>
                            </div>
                        </router-link>
                        <router-link to="/admin" class="no-hover text-white d-inline-block mx-3" v-if="loggedIn">
                            <div class="">
                                <span class="">Admin</span>
                            </div>
                        </router-link>
                    </div>
                    <div class="d-block d-md-none mr-2">
                        <span @click="toggleMenu()" class="text-white d-inline-block">
                            <svg class="bi bi-list" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M2.5 11.5A.5.5 0 013 11h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4A.5.5 0 013 7h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4A.5.5 0 013 3h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5z"
                                    clip-rule="evenodd" />
                            </svg>
                        </span>
                    </div>
                    <div class="d-none d-md-block" v-if="!loggedIn">
                        <router-link to="/login" class="no-hover text-white">
                            <button class="btn bgcolor-black text-white px-3">
                                Login
                            </button>
                        </router-link>
                    </div>
                    <div class="d-none d-md-block" v-if="loggedIn">
                        <button class="btn bgcolor-black text-white px-3" @click="logout()">
                            <svg class="bi bi-power color-red ft-20" width="1em" height="1em" viewBox="0 0 16 16"
                                fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M5.578 4.437a5 5 0 104.922.044l.5-.866a6 6 0 11-5.908-.053l.486.875z"
                                    clip-rule="evenodd" />
                                <path fill-rule="evenodd" d="M7.5 8V1h1v7h-1z" clip-rule="evenodd" />
                            </svg> Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <mobile-header v-if="showMobileHeader" @showmenu="showMobileHeader=false"></mobile-header>
    </div>
</template>
<script>
    import {
        authComputed
    } from '../store/index.js';
    import mobileHeader from './mobileheader.vue';
    export default {
        data() {
            return {
                showMobileHeader: false
            }
        },
        methods: {
            logout() {
                this.$store.dispatch('logout')
            },
            toggleMenu() {
                this.showMobileHeader = !this.showMobileHeader;
            }
        },
        computed: {
            ...authComputed
        },
        components: {
            mobileHeader
        }
    }
</script>
<style scoped>
    .header-menu {
        flex: 0.9;
        display: flex;
        justify-content: flex-end;
    }

    .mobile-sub-menu {
        top: 61px;
        width: 100%;
        left: 0;
    }

    .header-fixed {
        position: fixed !important;
        top: 0;
        width: 100%;
        z-index: 101;
        height: 61px;
    }
</style>