<template>
    <div class="p-4 font-raleway text-center mx-auto md:w-3/4 lg:w-1/2 xl:w-2/4 2xl:w-1/3">
        <p class="w-full text-left">
            <span class="text-lg underline"><router-link to="/account">Account</router-link></span>
            <span class="float-right text-lg underline"><router-link to="/">Home</router-link></span>
        </p>
        <h1 class="text-2xl mb-2 font-light"> Admin Panel</h1>
        <SubmissionManagement class="mb-4"/>
        <PricesManagement class="mb-4" />
        <CategoryManagement class="mb-4"/>
    </div>
</template>

<script>

import PricesManagement from '@/components/Admin/PricesManagement.vue'
import CategoryManagement from '@/components/Admin/CategoryManagement.vue'
import SubmissionManagement from '@/components/Admin/SubmissionManagement.vue'

export default {
    components: {
        PricesManagement, CategoryManagement, SubmissionManagement
    }
}
</script>