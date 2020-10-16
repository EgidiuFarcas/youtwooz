<template>
    <div class="">
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