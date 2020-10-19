<template>
    <div class="flex w-full flex-col items-center justify-center p-4">
        <!-- 2D Concept -->
        <div v-if="type !== '3D'" class="w-full">
            <p class="mt-2 text-lg leading-normal">Select 2D Concept</p>
            <input ref="concept2D" @change="upload2DConcept" type="file" class="hidden">
            <button @click="$refs.concept2D.click()" class="h-32 w-2/3 shadow-lg outline-none focus:outline-none">
                <img class="h-full w-auto mx-auto object-contain" :src="concept2D" alt="">
            </button>
        </div>
        <!-- 3D Concept -->
        <div v-if="type !== '2D'" class="w-full">
            <p class="mt-2 text-lg leading-normal">Select 3D Concept</p>
            <input ref="concept3D" @change="upload3DConcept" type="file" class="hidden">
            <button @click="$refs.concept3D.click()" class="h-32 w-2/3 shadow-lg outline-none focus:outline-none">
                <img class="h-full w-auto mx-auto object-contain" :src="concept3D" alt="">
            </button>
        </div>
        <!-- Box Concept -->
        <div v-if="hasBox" class="w-full">
            <p class="mt-2 text-lg leading-normal">Select Box Concept</p>
            <input ref="conceptBox" @change="uploadBoxConcept" type="file" class="hidden">
            <button @click="$refs.conceptBox.click()" class="h-32 w-2/3 shadow-lg outline-none focus:outline-none">
                <img class="h-full w-auto mx-auto object-contain" :src="conceptBox" alt="">
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {apiURL} from '@/assets/variables.js';

export default {
    props: {
        type: String,
        hasBox: Boolean,
        submissionID: String,
    },
    data(){
        return {
            concept2D: 'https://icon-library.com/images/add-image-icon-png/add-image-icon-png-15.jpg',
            concept2DFileUploaded: false,
            concept3D: 'https://icon-library.com/images/add-image-icon-png/add-image-icon-png-15.jpg',
            concept3DFileUploaded: false,
            conceptBox: 'https://icon-library.com/images/add-image-icon-png/add-image-icon-png-15.jpg',
            conceptBoxFileUploaded: false,
        }
    },
    methods: {
        upload2DConcept: async function(e){
            let files = e.target.files || e.dataTransfer.files;
            //If theres no image or more than 1, cancel
            if(!files.length || files.length > 1) return;
            let file = files[0];
            this.concept2D = URL.createObjectURL(file);

            let data = new FormData();
            data.append('file', file, file.fileName);
            data.append('imageType', '2D');
            data.append('submissionID', this.submissionID);

            axios({
                method: "post",
                url: apiURL + "/api/submission/new/image",
                headers: {
                    'Authorization': this.$cookies.get('access-token'),
                    'Content-Type': 'multipart/form-data'
                },
                data: data
            })
            .then(() => this.concept2DFileUploaded = true)
            .catch(err =>{
                this.concept2D = 'https://icon-library.com/images/add-image-icon-png/add-image-icon-png-15.jpg';
                alert(err.response.data);
            });
        },
        upload3DConcept: async function(e){
            let files = e.target.files || e.dataTransfer.files;
            //If theres no image or more than 1, cancel
            if(!files.length || files.length > 1) return;
            let file = files[0];
            this.concept3D = URL.createObjectURL(file);

            let data = new FormData();
            data.append('file', file, file.fileName);
            data.append('imageType', '3D');
            data.append('submissionID', this.submissionID);

            axios({
                method: "post",
                url: apiURL + "/api/submission/new/image",
                headers: {
                    'Authorization': this.$cookies.get('access-token'),
                    'Content-Type': 'multipart/form-data'
                },
                data: data
            })
            .then(() => this.concept3DFileUploaded = true)
            .catch(err => {
                this.concept3D = 'https://icon-library.com/images/add-image-icon-png/add-image-icon-png-15.jpg';
                alert(err.response.data);
            });
        },
        uploadBoxConcept: async function(e){
            let files = e.target.files || e.dataTransfer.files;
            //If theres no image or more than 1, cancel
            if(!files.length || files.length > 1) return;
            let file = files[0];
            this.conceptBox = URL.createObjectURL(file);

            let data = new FormData();
            data.append('file', file, file.fileName);
            data.append('imageType', 'Box');
            data.append('submissionID', this.submissionID);

            axios({
                method: "post",
                url: apiURL + "/api/submission/new/image",
                headers: {
                    'Authorization': this.$cookies.get('access-token'),
                    'Content-Type': 'multipart/form-data'
                },
                data: data
            })
            .then(() => this.conceptBoxFileUploaded = true)
            .catch(err => {
                this.conceptBox = 'https://icon-library.com/images/add-image-icon-png/add-image-icon-png-15.jpg';
                alert(err.response.data);
            });
        }
    }
}
</script>