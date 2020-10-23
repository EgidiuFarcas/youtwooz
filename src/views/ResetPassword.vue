<template>
    <div class="h-screen w-screen">
        <div class="container mx-auto h-full flex justify-center items-center">
            <div class="w-full md:w-1/2 lg:w-1/3">
                <h1 class="font-hairline mb-6 text-center text-2xl">Reset your Password!</h1>
                <div class="border-solid p-8 border-t-8 border-theme-light bg-white mb-6 rounded-lg shadow-lg">
                    <div id="errorBox" class="hidden mb-4 bg-red-500 text-white p-2 rounded shadow-md">
                        This is an error message, please fix your problem.
                    </div>
                    <div id="successBox" class="hidden mb-4 bg-green-500 text-white p-2 rounded shadow-md">
                        This is an error message, please fix your problem.
                    </div>
                    <div class="mb-4">
                        <label class="font-bold text-grey-darker block mb-2">New Password</label>
                        <input v-model="password" required type="password" class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow" placeholder="Your new password">
                    </div>
                     <div class="mb-4">
                        <label class="font-bold text-grey-darker block mb-2">Confirm Password</label>
                        <input v-model="password_confirmation" required type="password" class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow" placeholder="Your new password again">
                    </div>

                    <div class="flex items-center justify-between">
                        <button @click="submit" class="bg-theme-light hover:bg-teal text-white font-bold py-2 px-4 rounded mx-auto">
                            Reset Password
                        </button>
                    </div>
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
            password: '',
            password_confirmation: '',
        }
    },
    methods: {
        submit: function(){
            if(this.password !== this.password_confirmation){
                this.displayError("Passwords don't match.");
                return;
            }
            let payload = {
                "password": this.password,
                "userID": this.$route.params.userID,
                "verifyToken": this.$route.params.verifyToken
            };
            axios({
                method: 'POST',
                url: apiURL + '/api/auth/password-reset',
                data: payload
            })
            .then(() => {
                document.getElementById('errorBox').classList.add('hidden');
                this.password = '';
                this.password_confirmation = '';
                let sb = document.getElementById('successBox');
                sb.innerHTML = "Password successfuly reset. You'll be automatically redirected to the login page.";
                sb.classList.remove('hidden');
                setTimeout(() => {
                    this.$router.push('/login');
                },3000);
            })
            .catch(err => {
                document.getElementById('successBox').classList.add('hidden');
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