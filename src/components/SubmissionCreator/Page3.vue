<template>
    <div class="transition-all duration-300">
        <div class="w-full px-4 mt-4">
            <input v-model="height" class="text-lg py-2 w-full shadow rounded-lg border-solid border border-theme-light" type="text" placeholder="Figure Height">
        </div>
        <div class="w-full px-4 mt-4">
            <input v-if="type !== '3D'" required v-model="artist2D" class="text-lg py-2 w-full shadow rounded-lg border-solid border border-theme-light" type="text" placeholder="2D Artist">
        </div>
        <div class="w-full px-4 mt-4">
            <input v-if="type !== '2D'" required v-model="artist3D" class="text-lg py-2 w-full shadow rounded-lg border-solid border border-theme-light" type="text" placeholder="3D Artist">
        </div>
        <div class="w-full px-4 mt-4">
            <label for="gradientFrom">Gradient Color Dark</label>
            <input required v-model="gradientFrom" id="gradientFrom" class="text-lg w-full rounded-lg h-10" type="color">
        </div>
        <div class="w-full px-4 mt-4">
            <label for="gradientTo">Gradient Color Light</label>
            <input required v-model="gradientTo" id="gradientTo" class=" w-full rounded-lg h-10" type="color">
        </div>
        <div class="w-full px-4 mt-4 flex flex-col overflow-y-scroll" style="max-height: 15rem">
            <p class="mb-2">Category</p>
            <div v-for="categ in categories" :key="categ.id">
                <div @click="pickCategory(categ.id)" class="flex flex-row w-full items-center bg-gray-200 rounded-lg my-1" :class="{'bg-theme-light text-white': category === categ.id}">
                    <p class="w-full text-center py-2">{{categ.name}}</p>
                </div>
            </div>
        </div>
        <div class="w-full px-4 mt-4 flex flex-col overflow-y-scroll" style="max-height: 15rem">
            <p class="mb-2">Price</p>
            <div v-for="p in prices" :key="p.id">
                <div @click="pickPrice(p.id)" class="flex flex-row w-full items-center bg-gray-200 rounded-lg my-1" :class="{'bg-theme-light text-white': price === p.id}">
                    <p class="w-full text-center py-2">{{p.amount}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {apiURL} from '@/assets/variables.js';
const Entities = require('html-entities').AllHtmlEntities;
 
const entities = new Entities();

export default {
    props: {
        type: String,
        info: Object,
    },
    data() {
        return {
            height: '',
            artist2D: '',
            artist3D: '',
            category: '',
            gradientFrom: '#000000',
            gradientTo: '#FFFFFF',
            price: '',
            categories: [],
            prices: [],
        }
    },
    mounted(){
        this.getCategories();
        this.getPrices();
        if(this.info !== undefined){
            this.height = entities.decode(this.info.height);
            this.artist2D = entities.decode(this.info.artist2D);
            this.artist3D = entities.decode(this.info.artist3D);
            if(this.info.gradientFrom) this.gradientFrom = entities.decode(this.info.gradientFrom);
            if(this.info.gradientTo) this.gradientTo = entities.decode(this.info.gradientTo);
            this.category = this.info.categoryID._id;
            this.price = this.info.priceID._id;
        }
    },
    methods: {
        pickCategory: function(id){
            this.category = id
        },
        pickPrice: function(id){
            this.price = id
        },
        getCategories: function () {
            axios({
                method: "POST",
                url: apiURL + "/api/category/all",
                headers: {
                    'Authorization': this.$cookies.get('access-token')
                }
            })
            .then(res => {
                this.categories = res.data;
            })
            .catch(err => console.log(err));
        },
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
    }
}
</script>