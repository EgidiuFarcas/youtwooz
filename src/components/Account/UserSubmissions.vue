<template>
    <div class="shadow-md rounded-lg w-full flex flex-col py-4 border-solid border-t-8 border-theme-dark transition-all duration-300">
        <h1 class="text-2xl">My Figures</h1>
        <div class="my-4">
            <button @click="$router.push('/create-submission')" class="text-xl px-3 py-1 bg-black text-white border-white border-solid border-3 rounded-full shadow mx-2 hover:border-red-500 focus:shadow-none focus:outline-none">
                <svg class="inline-block fill-current my-auto" width="25" height="25" viewBox="0 0 20 20"><path d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"></path></svg>
                New Submission
            </button>
        </div>
        <div class="w-full px-2">
            <ul class="flex border-b items-center justify-evenly">
                <li @click="show = 'drafts'" class="mr-1 border-0 transition-all duration-300" :class="{'border-b border-theme-light': show === 'drafts'}">
                    <button class="bg-white inline-block rounded-t py-2 px-4 text-theme-dark font-semibold outline-none focus:outline-none">Drafts</button>
                </li>
                <li @click="show = 'pending'" class="mr-1 border-0 transition-all duration-300" :class="{'border-b border-theme-light': show === 'pending'}">
                    <button class="bg-white inline-block py-2 px-4 text-theme-light hover:text-theme-dark font-semibold outline-none focus:outline-none">Pending</button>
                </li>
                <li @click="show = 'published'" class="mr-1 border-0 transition-all duration-300" :class="{'border-b border-theme-light': show === 'published'}">
                    <button class="bg-white inline-block py-2 px-4 text-theme-light hover:text-theme-dark font-semibold outline-none focus:outline-none">Published</button>
                </li>
            </ul>
        </div>
        <div v-if="show === 'drafts'" class="w-full flex flex-col p-2">
            <p v-if="drafts.length === 0">You have no drafts.</p>
            <submission @removedSubmission="drafts = drafts.filter(e => e._id !== $event);" v-for="sub in drafts" :key="sub.id" :info="sub"></submission>
        </div>
        <div v-if="show === 'pending'" class="w-full flex flex-col p-2">
            <p v-if="pending.length === 0">You have no pending submissions.</p>
            <submission @removedSubmission="pending = pending.filter(e => e._id !== $event);" v-for="sub in pending" :key="sub.id" :info="sub"></submission>
        </div>
        <div v-if="show === 'published'" class="w-full flex flex-col p-2">
            <p v-if="published.length === 0">You have no published submissions.</p>
            <submission @removedSubmission="published = published.filter(e => e._id !== $event);" v-for="sub in published" :key="sub.id" :info="sub"></submission>
        </div>
    </div>
</template>

<script>
import Submission from '@/components/Account/Submission.vue';
import axios from 'axios';
import {apiURL} from '@/assets/variables.js';

export default {
    components: {
        'submission': Submission
    },
    data() {
        return {
            drafts: [],
            pending: [],
            published: [],
            show: 'pending',
        }
    },
    mounted() {
        this.fetchSubmissions();
    },
    methods: {
        fetchSubmissions() {
            axios({
                method: "POST",
                url: apiURL + "/api/submission/get/mine",
                headers: {
                    'Authorization': this.$cookies.get('access-token')
                }
            })
            .then(async res => {
                let subs = res.data.submissions;
                console.log(subs);
                for(let i = 0; i < subs.length; i++){
                    if(subs[i].priceID) subs[i].price = await this.getPrice(subs[i].priceID);
                    if(subs[i].categoryID) subs[i].category = await this.getCategory(subs[i].categoryID);

                    switch(subs[i].status){
                        case 'draft': 
                            this.drafts.push(subs[i]);
                            break;
                        case 'published':
                            this.published.push(subs[i]);
                            break;
                    }
                    if(String(subs[i].status).includes('pending')) this.pending.push(subs[i]);
                }
            })
            .catch(err => console.log(err.response));
        },
        async getPrice(id){
            let price = undefined;
            await axios({
                method: "POST",
                url: apiURL + "/api/price/get",
                headers: {
                    'Authorization': this.$cookies.get('access-token')
                },
                data: {
                    'priceID': id
                }
            }).then(res => price = res.data.value);
            return price;
        },
        async getCategory(id){
            let categ = undefined;
            await axios({
                method: "POST",
                url: apiURL + "/api/category/get",
                headers: {
                    'Authorization': this.$cookies.get('access-token')
                },
                data: {
                    'categoryID': id
                }
            }).then(res => categ = res.data.name);
            return categ;
        }
    }
}
</script>