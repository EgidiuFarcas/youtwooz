<template>
    <div class="p-4 font-raleway text-center">
        <p class="w-full text-left">
            <span class="text-lg underline"><router-link to="/account">Account</router-link></span>
            <span class="float-right text-lg underline"><router-link to="/">Home</router-link></span>
        </p>
        <h1 class="text-2xl mb-2 font-light"> Admin Panel</h1>
        <PricesManagement class="mb-4" />
        <CategoryManagement />
    </div>
</template>

<script>

import PricesManagement from '@/components/Admin/PricesManagement.vue'
import CategoryManagement from '@/components/Admin/CategoryManagement.vue'

export default {
    components: {
        PricesManagement, CategoryManagement
    }
}
</script>