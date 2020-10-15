<template>
    <div class="w-full mt-4">
        <button @click="$router.push('/login')" 
            class="text-xl px-6 py-3 bg-black text-white border-white border-solid border-3 rounded-full shadow mx-2 hover:border-red-500 focus:shadow-none focus:outline-none">Login</button>
        <button @click="$router.push('/register')"
            class="text-xl px-6 py-3 bg-black text-white border-white border-solid border-3 rounded-full shadow mx-2 hover:border-red-500 focus:shadow-none focus:outline-none">Register</button>
    </div>
</template>


