<template>
    <div class="text-left shadow-md rounded-lg w-full flex flex-col p-4 border-solid border-t-8 border-theme-dark">
        Manage Categories
        <div class="flex flex-row w-full mt-1">
            <input v-model="newCategory" type="text" placeholder="New Price Option" class="px-4 py-2 w-full border-solid border border-theme-light rounded-l-lg shadow">
            <button @click="addCategory" class="px-4 py-2 transition-all duration-300 border-solid border border-l-0 border-theme-light rounded-r-lg shadow outline-none focus:outline-none hover:bg-gray-200 focus:bg-theme-light focus:text-white">
                Add</button>
        </div>
        <div class="flex flex-col w-full mt-2 overflow-y-scroll" style="max-height: 15rem">
            <div v-for="categ in categories" :key="categ.id" class="flex flex-row w-full items-center bg-gray-200 pl-4 rounded-lg my-1">
                <p class="w-full text-left">{{categ.name}}</p>
                <button @click="deleteCategory(categ.id)" class="px-2 py-1 bg-white hover:bg-gray-300 focus:bg-theme-light rounded-lg border-solid border border-theme-light">Delete</button>
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
            newCategory: "",
            categories: []
        }
    },
    beforeMount(){
        this.getCategories();
    },
    methods: {
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

        deleteCategory: function(id) {
            axios({
                method: "DELETE",
                url: apiURL + "/api/category/delete",
                headers: {
                    'Authorization': this.$cookies.get('access-token')
                },
                data: {
                    'categoryID': id
                }
            })
            .then(() => {
                this.categories = this.categories.filter((value) => value.id !== id);
            })
            .catch(err => console.log(err));
        },

        addCategory: function(){
            if(this.newCategory === "") return;
            axios({
                method: "POST",
                url: apiURL + "/api/category/new",
                headers: {
                    'Authorization': this.$cookies.get('access-token')
                },
                data: {
                    'categoryName': this.newCategory
                }
            })
            .then((res) => {
                this.newCategory = "";
                this.categories.push({id: res.data.id, name: res.data.name});
            })
            .catch(err => console.log(err));
        }
    }
}
</script>