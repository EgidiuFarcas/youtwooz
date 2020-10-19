<template>
    <div class="p-4 text-center font-raleway font-light">
        <p class="w-full text-left">
            <span class="text-lg underline"><router-link to="/account">Account</router-link></span>
            <span class="float-right text-lg underline"><router-link to="/">Home</router-link></span>
        </p>
        <h1 class="text-2xl mb-2">Submission Creator</h1>
        <div class="shadow-md rounded-lg w-full flex flex-col border-solid border-t-8 border-theme-dark">
            <!-- PAGE 1 - Name, box, type -->
            <Page1 id="page1" class="page"/>
            <!-- PAGE 2 - Description -->
            <Page2 id="page2" class="page"/>
            <!-- PAGE 3 - Category, price, height, artists -->
            <Page3 id="page3" type="2D+3D" class="page"/>
            <!-- PAGE 4 - Images -->
            <Page4 id="page4" type="2D+3D" :hasBox="true" class="page"/>
            

            <div class="my-4 px-4">
                <div class="w-full flex flex-row">
                    <button v-if="pageNR > 1" @click="prevPage" class="px-4 py-2 w-full mr-4 bg-theme-light text-white hover:bg-theme-dark outline-none focus:outline-none">Previous</button>
                    <button v-if="pageNR < 4" @click="nextPage" class="px-4 py-2 w-full bg-theme-light text-white hover:bg-theme-dark outline-none focus:outline-none" :class="{'ml-4': pageNR > 1}">Next</button>
                    <button v-if="pageNR === 4" class="px-4 py-2 w-full border-solid border-2 border-theme-light bg-white text-theme-light hover:bg-theme-light hover:text-white outline-none focus:outline-none">Finish</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Page1 from '@/components/SubmissionCreator/Page1.vue';
import Page2 from '@/components/SubmissionCreator/Page2.vue';
import Page3 from '@/components/SubmissionCreator/Page3.vue';
import Page4 from '@/components/SubmissionCreator/Page4.vue';

export default {
    components: {
        Page1, Page2, Page3, Page4
    },
    data(){
        return {
            pageNR: 1,
        }
    },
    mounted(){
        this.displayPage();
    },
    methods: {
        displayPage(){
            console.log(this.pageNR)
            let pages = document.getElementsByClassName('page');
            pages.forEach(page => {
                if(page.id !== 'page'+this.pageNR) page.classList.add('hidden');
                else page.classList.remove('hidden');
            });
        },
        prevPage(){
            this.pageNR -= 1;
            if(this.pageNR < 1) this.pageNR = 1;
            this.displayPage();
        },
        nextPage(){
            this.pageNR += 1;
            let pages = document.getElementsByClassName('page');
            if(this.pageNR > pages.length) this.pageNR = pages.length;
            this.displayPage();
        }
        
    }
}
</script>