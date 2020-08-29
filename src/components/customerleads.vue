<template>
    <div class="leads">
        <h3 class="mb-5 text-center">Customer leads</h3>
        <table border="1" style="border: 1px solid #ddd; width: 95%" class="mx-auto">
            <thead class="text-white bgcolor-primary">
                <th width="20%" class="px-4 py-3">Name</th>
                <th width="20%" class="px-4 py-3">Email</th>
                <th width="20%" class="px-4 py-3">Phone</th>
                <th width="40%" class="px-4 py-3">Comment</th>
            </thead>
            <tbody>
                <tr v-for="(lead, index) in customerLeads" :key="index">
                    <td class="px-4 py-3">{{lead.name}}</td>    
                    <td class="px-4 py-3">{{lead.email}}</td>
                    <td class="px-4 py-3">{{lead.phone}}</td>
                    <td class="px-4 py-3">{{lead.message}}</td>                
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from "axios";
    export default {
        data() {
            return {
                customerLeads: []
            }
        },
        components: {

        },
        methods: {
            getCustomerLeads() {
                axios.get("//localhost:3000/customerleads")
                .then((res) => {
                    this.customerLeads = res.data;
                    console.log(this.customerLeads);
                })
                .catch((error)=> {
                    console.log(error);
                })
            }
        },
        mounted() {
            this.getCustomerLeads();
        }
    };
</script>

<style scoped>

</style>