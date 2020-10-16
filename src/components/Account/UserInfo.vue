<template>
    <div class="shadow-md rounded-b-lg w-full flex flex-col py-4 bg-theme-light text-white">
        <img src="@/assets/default_pfp.png" class="w-24 h-auto mx-auto rounded-lg shadow-lg">
        <p class="mt-2 text-xl">@{{user.name}} <span class="bg-blue-500 text-sm text-white rounded-md px-2 py-1"> • {{user.role}}</span></p>
        <p class="text italic">{{user.email}}</p>
        <div class="mt-4">
            <button @click="logout"
             class="text-xl px-3 py-1 bg-black text-white border-white border-solid border-3 rounded-full shadow mx-2 hover:border-red-500 focus:shadow-none focus:outline-none">Logout</button>
        </div>
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
                role: 'User',
                points: '69',
                email: 'someemail@test.com'
            }
        }
    },
    mounted() {
        this.loadUserInfo();
    },
    methods: {
        async loadUserInfo(){
            axios({
                method: "POST",
                url: apiURL + "/api/auth/info",
                headers: {
                    'Authorization': this.$cookies.get('access-token')
                }
            }).then(res => {
                console.log(res);
                this.user = res.data;
            }).catch(err => console.log(err));
        },
        async logout(){
            let am = new AuthMiddleware();
            if(await am.logout()) window.location.reload();
        }
    }
}
</script>