<template>
    <div class="toaster d-flex align-items-center p-3" v-bind:class="type == 'error' ? 'bgcolor-red' : 'bgcolor-primary'">
        <div class="toaster-body text-white pr-3">
            {{msg}}
        </div>
        <div class="close-toaster text-white c-pointer"  @click.prevent="closeToaster()">
            <span>X</span>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            hideToaster: true
        }
    },
    props: {
        type: {
            default: ''
        },
        msg: {
            default: ''
        }
    },
    mounted() {
        debugger;
          setTimeout(()=>{
            this.closeToaster();
          },3000);
    },
    methods: {
        closeToaster() {
            debugger;
            this.$emit('hide-toaster', this.hideToaster);
        }
    }
}
</script>
<style scoped>
.toaster {
    position: absolute;
    top: 5px;
    right: 10px;
    border-radius: 5px;
}
</style>