<template>
    <div class="h-screen w-screen">
        <div class="container mx-auto h-full flex justify-center items-center">
            <div class="w-full md:w-1/2 lg:w-1/3">
                <h1 class="font-hairline mb-6 text-center text-2xl">Welcome to Youtwooz!</h1>
                <div class="border-solid p-8 border-t-8 border-theme-light bg-white mb-6 rounded-lg shadow-lg">
                    <div id="errorBox" class="hidden mb-4 bg-red-500 text-white p-2 rounded shadow-md">
                        This is an error message, please fix your problem.
                    </div>
                     <div id="successBox" class="hidden mb-4 bg-green-500 text-white p-2 rounded shadow-md">
                        Account created! Check your email to verify it. (Check Spam/Junk folder too)
                    </div>
                     <div class="mb-4">
                        <label class="font-bold text-grey-darker block mb-2">Your Username</label>
                        <input v-model="username" required type="text" class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow" placeholder="Your Username">
                    </div>
                    <div class="mb-4">
                        <label class="font-bold text-grey-darker block mb-2">Your Email</label>
                        <input v-model="email" required type="email" class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow" placeholder="Your Email">
                    </div>
                    <div class="mb-4">
                        <label class="font-bold text-grey-darker block mb-2">Password</label>
                        <input v-model="password" required type="password" class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow" placeholder="Your Password">
                    </div>
                    <div class="mb-4">
                        <label class="font-bold text-grey-darker block mb-2">Confirm Password</label>
                        <input v-model="password_confirmation" required type="password" class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow" placeholder="Your Password">
                    </div>

                    <div class="flex items-center justify-between">
                        <button @click="submitForm" type="button" 
                            class="g-recaptcha bg-theme-light hover:bg-teal text-white font-bold py-2 px-4 mx-auto rounded focus:outline-none hover:bg-theme-dark">
                            Register
                        </button>

                        <!-- <a class="no-underline inline-block align-baseline font-bold text-sm text-blue hover:text-blue-dark float-right" href="#">
                            Forgot Password?
                        </a> -->
                    </div>
                    
                </div>
                <div class="text-center">
                    <p class="text-grey-dark text-sm">Already have an account? <router-link to="/login" class="no-underline text-blue font-bold">Login here</router-link>.</p>
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
            username: '',
            password: '',
            password_confirmation: ''
        }
    },
    methods: {
        submitForm: function(){
            if(this.password !== this.password_confirmation){
                this.displayError('Password and Password confirmation do not match.');
                return;
            }
            let payload = {
                "email": this.email,
                "username": this.username,
                "password": this.password
            };

            axios({
                method: 'POST',
                url: apiURL + '/api/auth/register',
                data: payload
            })
            .then(res => {
                if(res.status === 200){
                    document.getElementById('errorBox').classList.add('hidden');
                    document.getElementById('successBox').classList.remove('hidden');
                    this.email = '';
                    this.username = '';
                    this.password = '';
                    this.password_confirmation = '';
                }
            })
            .catch(err => {
                console.log(err.response);
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