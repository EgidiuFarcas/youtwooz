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
export default {
    props: {
        type: String,
        hasBox: Boolean
    },
    data(){
        return {
            concept2D: 'https://icon-library.com/images/add-image-icon-png/add-image-icon-png-15.jpg',
            concept2DFile: null,
            concept3D: 'https://icon-library.com/images/add-image-icon-png/add-image-icon-png-15.jpg',
            concept3DFile: null,
            conceptBox: 'https://icon-library.com/images/add-image-icon-png/add-image-icon-png-15.jpg',
            conceptBoxFile: null,
        }
    },
    methods: {
        upload2DConcept: function(e){
            let files = e.target.files || e.dataTransfer.files;
            //If theres no image or more than 1, cancel
            if(!files.length || files.length > 1) return;
            let file = files[0];
            this.concept2DFile = file;
            this.concept2D = URL.createObjectURL(file);
        },
        upload3DConcept: function(e){
            let files = e.target.files || e.dataTransfer.files;
            //If theres no image or more than 1, cancel
            if(!files.length || files.length > 1) return;
            let file = files[0];
            this.concept3DFile = file;
            this.concept3D = URL.createObjectURL(file);
        },
        uploadBoxConcept: function(e){
            let files = e.target.files || e.dataTransfer.files;
            //If theres no image or more than 1, cancel
            if(!files.length || files.length > 1) return;
            let file = files[0];
            this.conceptBoxFile = file;
            this.conceptBox = URL.createObjectURL(file);
        }
    }
}
</script>