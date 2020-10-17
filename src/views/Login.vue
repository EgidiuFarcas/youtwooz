<template>
    <div class="h-screen w-screen">
        <div class="container mx-auto h-full flex justify-center items-center">
            <div class="w-full md:w-1/2 lg:w-1/3">
                <h1 class="font-hairline mb-6 text-center text-2xl">Welcome back!</h1>
                <div class="border-solid p-8 border-t-8 border-theme-light bg-white mb-6 rounded-lg shadow-lg">
                     <div id="errorBox" class="hidden mb-4 bg-red-500 text-white p-2 rounded shadow-md">
                        This is an error message, please fix your problem.
                    </div>
                    <div class="mb-4">
                        <label class="font-bold text-grey-darker block mb-2">Your Email</label>
                        <input v-model="email" required type="email" class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow" placeholder="Your Email">
                    </div>

                    <div class="mb-4">
                        <label class="font-bold text-grey-darker block mb-2">Password</label>
                        <input v-model="password" required type="password" class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow" placeholder="Your Password">
                    </div>

                    <div class="flex items-center justify-between">
                        <button @click="submit" class="bg-theme-light hover:bg-teal text-white font-bold py-2 px-4 rounded">
                            Login
                        </button>

                        <div class="flex flex-col">
                            <router-link class="no-underline inline-block align-baseline font-bold text-sm text-blue hover:text-blue-dark float-right" to="/">
                                Forgot Password?
                            </router-link>
                            <router-link class="no-underline inline-block align-baseline text-sm text-blue hover:text-blue-dark float-right" to="/">
                                Back to homepage
                            </router-link>
                        </div>
                    </div>
                    
                </div>
                <div class="text-center">
                    <p class="text-grey-dark text-sm">Don't have an account? <router-link to="/register" class="no-underline text-blue font-bold">Create an Account</router-link>.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {apiURL} from '@/assets/variables.js';

export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        submit: function(){
            let payload = {
                "email": this.email,
                "password": this.password
            };

            axios({
                method: 'POST',
                url: apiURL + '/api/auth/login',
                data: payload
            })
            .then(res => {
                document.getElementById('errorBox').classList.add('hidden');
                this.email = '';
                this.password = '';
                this.$cookies.set('access-token', res.data.access_token, "1d");
                this.$cookies.set('refresh-token', res.data.refresh_token, "7d");
                this.$router.push('/account');
            })
            .catch(err => {
                if(!err.response) return;
                if(err.response.status == 422){
                    this.displayError("There already is an account associated with the email");
                }else{
                    let errMsg = err.response.data;
                    errMsg = errMsg.replace(/"/g, '');
                    errMsg = errMsg.charAt(0).toUpperCase() + errMsg.slice(1);
                    this.displayError(errMsg);
                }
            });
        },
        displayError: function(text) {
            let errBox = document.getElementById('errorBox');
            errBox.innerHTML = text;
            errBox.classList.remove('hidden');
        }
    }
}
</script>