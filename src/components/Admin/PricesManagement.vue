<template>
    <div class="text-left shadow-md rounded-lg w-full flex flex-col p-4 border-solid border-t-8 border-theme-dark">
        Manage Prices
        <div class="flex flex-row w-full mt-1">
            <input v-model="newPrice" type="text" placeholder="New Price Option" class="px-4 py-2 w-full border-solid border-2 border-theme-light rounded-l-lg shadow">
            <button @click="addPrice" class="px-4 py-2 transition-all duration-300 border-solid border-2 border-l-0 border-theme-light rounded-r-lg shadow outline-none focus:outline-none hover:bg-gray-200 focus:bg-theme-light focus:text-white">
                Add</button>
        </div>
        <div class="flex flex-col w-full mt-2 overflow-y-scroll" style="max-height: 15rem">
            <div v-for="price in prices" :key="price.id" class="flex flex-row w-full items-center bg-gray-200 pl-4 rounded-lg my-1">
                <p class="w-full text-left">{{price.amount}}</p>
                <button @click="deletePrice(price.id)" class="px-2 py-1 bg-white hover:bg-gray-300 focus:bg-theme-light rounded-lg border-solid border-2 border-theme-light">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {apiURL} from '@/assets/variables.js';

export default {
    data(){
        return {
            newPrice: "",
            prices: []
        }
    },
    beforeMount(){
        this.getPrices();
    },
    methods: {
        getPrices: function () {
            axios({
                method: "POST",
                url: apiURL + "/api/price/all",
                headers: {
                    'Authorization': this.$cookies.get('access-token')
                }
            })
            .then(res => {
                this.prices = res.data;
            })
            .catch(err => console.log(err));
        },

        deletePrice: function(id) {
            axios({
                method: "DELETE",
                url: apiURL + "/api/price/delete",
                headers: {
                    'Authorization': this.$cookies.get('access-token')
                },
                data: {
                    'priceID': id
                }
            })
            .then(() => {
                this.prices = this.prices.filter((value) => value.id !== id);
            })
            .catch(err => console.log(err));
        },

        addPrice: function(){
            if(this.newPrice === "") return;
            axios({
                method: "POST",
                url: apiURL + "/api/price/new",
                headers: {
                    'Authorization': this.$cookies.get('access-token')
                },
                data: {
                    'priceAmount': this.newPrice
                }
            })
            .then((res) => {
                this.newPrice = "";
                this.prices.push({id: res.data.id, amount: res.data.amount});
            })
            .catch(err => console.log(err));
        }
    }
}
</script>