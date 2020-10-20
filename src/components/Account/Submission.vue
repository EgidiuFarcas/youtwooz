<template>
    <div class="flex flex-col w-full shadow mb-4">
        <div class="flex w-full p-2 text-sm text-center">
            <p class="w-full">Status: <span class="italic">{{ info.status }}</span></p>
        </div>
        <div class="flex w-full py-4" :style="{'background': 'linear-gradient(to right, ' + this.info.gradientFrom + ', ' + this.info.gradientTo + ')'}">
            <img v-if="info.type !== 1 /* 1 == '3D' */" :src="(info.image2D) ? api + info.image2D : defaultImage" class="h-32 w-auto mx-auto" alt="">
            <img v-if="info.type !== 0 /* 0 == '2D' */" :src="(info.image3D) ? api + info.image3D : defaultImage" class="h-32 w-auto mx-auto" alt="">
        </div>
        <div class="flex flex-col">
            <p>{{ info.name }} - {{ info.category }}</p>
            <p>{{ info.price }}</p>
            <div class="w-full flex my-4 items-center justify-evenly">
                <button class="w-full mx-4 px-4 py-2 bg-black text-white border-solid shadow-md border-4 border-white hover:border-theme-light rounded-full outline-none focus:outline-none">Edit</button>
                <button @click="deleteSub(info._id)" class="w-full mx-4 px-4 py-2 bg-black text-white border-solid shadow-md border-4 border-white hover:border-theme-light rounded-full outline-none focus:outline-none">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
import {apiURL} from '@/assets/variables.js';

export default {
    props: {
        info: Object
    },
    data() {
        return {
            defaultImage: '/assets/noimage.png',
            api: apiURL
        }
    },
    methods: {
        deleteSub(id){
            axios({
                method: "post",
                url: apiURL + "/api/submission/delete",
                headers: {
                    'Authorization': this.$cookies.get('access-token')
                },
                data: {
                    'submissionID': id
                }
            })
            .then(() => {
                this.$emit('removedSubmission', id);
            })
            .catch(err => console.log(err.response));
        }
    }
}
</script>