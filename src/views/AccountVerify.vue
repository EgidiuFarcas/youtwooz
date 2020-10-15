<template>
    <div class="w-screen h-screen flex flex-col">
        <div class="my-auto text-xl" v-if="verified">
            Congratulations, your account is now verified!<br>
            If you're not automatically redirected click <router-link class="italic" to="/login">here</router-link>.
            <img class="w-10 h-auto mx-auto mt-4" src="@/assets/loading.gif" alt="">
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    mounted(){
        this.requestVerification();
    },
    data() {
        return {
            verified: false
        }
    },
    methods: {
        requestVerification: function (){
            console.log('Sending verification');

            // axios.post('http://localhost:3000/api/auth/verify', JSON.stringify(payload))
            axios({
                method: 'POST',
                url: 'http://localhost:3001/api/auth/verify',
                data: {
                    "userID": this.$route.params.userID,
                    "verifyToken": this.$route.params.verifyToken
                }
            })
            .then(response => {
                 console.log(response);
                 if(response.status === 200){
                    this.verified = true;
                    let router = this.$router;
                    setTimeout(function() {
                        router.push('/');
                    }, 3000);
                 }
            })
            .catch(err => console.log(err));
        }
    }
}
</script>