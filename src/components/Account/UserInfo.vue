<template>
    <div class="shadow-md rounded-b-lg w-full flex flex-col py-4 bg-gradient-to-b from-theme-light to-theme-dark text-white">
        <div>
            <div class="relative w-24 mx-auto">
            <img v-if="user.pfp === null" src="@/assets/default_pfp.png" class="block w-full h-auto mx-auto rounded-lg shadow-lg">
            <img v-if="user.pfp !== null" :src="user.pfp" class="block w-full h-auto mx-auto rounded-lg shadow-lg">
            <div @click="$refs.pfp.click()" class="absolute w-full h-full top-0 bg-gray-800 opacity-0 hover:opacity-50 rounded-lg transition-all duration-300">
                <img src="https://static.thenounproject.com/png/187803-200.png" class="w-8 float-right pr-1" style="filter:invert(1);" alt="">
            </div>
        </div>
        </div>
        <p class="mt-2 text-xl">@{{user.name}} <span class="text-sm text-white rounded-md px-2 py-1" :style="{'background-color': user.role.color}"> • {{user.role.name}}</span></p>
        <p class="text italic">{{user.email}}</p>
        <div class="mt-4">
            <button @click="$router.push('/')"
             class="text-xl px-3 py-1 bg-black text-white border-white border-solid border-3 rounded-full shadow mx-2 hover:border-red-500 focus:shadow-none focus:outline-none">Home</button>
            <button @click="$router.push('/admin')" v-if="user.role.name === 'Admin'"
             class="text-xl px-3 py-1 bg-black text-white border-white border-solid border-3 rounded-full shadow mx-2 hover:border-red-500 focus:shadow-none focus:outline-none">Admin</button>
            <button @click="logout"
             class="text-xl px-3 py-1 bg-black text-white border-white border-solid border-3 rounded-full shadow mx-2 hover:border-red-500 focus:shadow-none focus:outline-none">Logout</button>
        </div>
        <input type="file" ref="pfp" @change="uploadNewPFP" class="hidden">
    </div>
</template>

<script>
import AuthMiddleware from '@/middleware/AuthMiddleware.js';
import axios from 'axios';
import {apiURL} from '@/assets/variables.js';

export default {
    data() {
        return {
            user: {
                pfp: null,
                name: 'Username',
                email: 'someemail@test.com',
                role: {
                    name: 'User',
                    color: '#000000',
                }
            }
        }
    },
    mounted() {
        this.loadUserInfo();
    },
    methods: {
        uploadNewPFP: function (e){
            let files = e.target.files || e.dataTransfer.files;
            //If theres no image or more than 1, cancel
            if(!files.length || files.length > 1) return;
            let file = files[0];

            let data = new FormData();
            data.append('file', file, file.fileName);

            axios({
                method: "post",
                url: apiURL + "/api/auth/pfp",
                headers: {
                    'Authorization': this.$cookies.get('access-token'),
                    'Content-Type': 'multipart/form-data'
                },
                data: data
            })
            .then(res => this.user.pfp = apiURL + res.data)
            .catch(err => console.log(err));
        },
        
        async loadUserInfo(){
            let user = this.user;
            axios({
                method: "POST",
                url: apiURL + "/api/auth/info",
                headers: {
                    'Authorization': this.$cookies.get('access-token')
                }
            }).then(res => {
                user.name = res.data.name;
                user.email = res.data.email;
                user.role = res.data.role;
                if(res.data.pfp !== null) user.pfp = apiURL + res.data.pfp;
            }).catch(err => {
                if(err.response.status === 404) this.logout();
            });
        },
        async logout(){
            let am = new AuthMiddleware();
            await am.logout();
            window.location.reload();
        }
    }
}
</script>