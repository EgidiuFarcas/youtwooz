<template>
    <div class="text-center font-raleway mx-auto md:w-3/4 lg:w-1/2 xl:w-2/4 2xl:w-1/3">
        <UserInfo />
        <div class="p-4">

        <UserSubmissions class="mt-4" />
        </div>
    </div>
</template>

<script>
import UserInfo from '@/components/Account/UserInfo.vue'
import UserSubmissions from '@/components/Account/UserSubmissions.vue'

export default {
    components: {
        UserInfo, UserSubmissions
    }
}
</script>