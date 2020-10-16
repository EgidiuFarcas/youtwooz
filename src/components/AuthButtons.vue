<template>
    <div class="w-full mt-4">
        <button @click="$router.push('/login')" :class="{'hidden': isAuthenticated}"
            class="text-xl px-6 py-3 bg-black text-white border-white border-solid border-3 rounded-full shadow mx-2 hover:border-red-500 focus:shadow-none focus:outline-none">Login</button>
        <button @click="$router.push('/register')" :class="{'hidden': isAuthenticated}"
            class="text-xl px-6 py-3 bg-black text-white border-white border-solid border-3 rounded-full shadow mx-2 hover:border-red-500 focus:shadow-none focus:outline-none">Register</button>
        <button @click="$router.push('/account')" :class="{'hidden': !isAuthenticated}"
            class="text-xl px-6 py-3 bg-black text-white border-white border-solid border-3 rounded-full shadow mx-2 hover:border-red-500 focus:shadow-none focus:outline-none">My Account</button>
    
    </div>
</template>

<script>
import AuthMiddleware from '@/middleware/AuthMiddleware.js';

export default {
    data() {
        return {
            isAuthenticated: false
        }
    },
    async beforeMount(){
        let am = new AuthMiddleware();
        if(await am.checkAuthentication()) this.isAuthenticated = true;
    }
}
</script>
