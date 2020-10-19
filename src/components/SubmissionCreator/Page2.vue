<template>
    <div class="transition-all duration-300">
        <p class="text-xl my-2">Description</p>
        <editor api-key="x1vs80oazox6mib08x44tpt36nzmozjw26e8u0rvpbmmbvb7"
        v-model="description"
        :init="{
            mobile: {
                menubar: true,
                toolbar_drawer: 'floating'
            },
            plugins: [
                'advlist autolink lists link charmap preview',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime paste'
            ],
            height: 500,
            toolbar:
                'undo redo | bold italic | alignleft aligncenter alignright alignjustify | fontselect styleselect | bullist numlist outdent indent | link',
            content_style: 
                `@import url('https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
                body { font-family: Inter, cursive; }`,
            font_formats: 'Luckiest Guy=Luckiest Guy, cursive; Inter=Inter, sans-serif;'
        }" style="width: 100%"/>
    </div>
</template>

<script>

import Editor from '@tinymce/tinymce-vue'

export default {
    components: {
        'editor': Editor
    },
    data() {
        return {
            description: ''
        }
    },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
</style>