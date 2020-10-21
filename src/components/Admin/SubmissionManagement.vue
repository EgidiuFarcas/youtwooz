<template>
    <div class="text-left shadow-md rounded-lg w-full flex flex-col p-4 border-solid border-t-8 border-theme-dark">
        <p class="w-full text-center">Manage Submissions</p>
        <p>Find Submission</p>
        <div class="flex flex-row w-full mt-1">
            <input v-model="submissionName" type="text" placeholder="Submission Name" class="px-4 py-2 w-full border-solid border border-theme-light rounded-l-lg shadow">
            <button @click="findSubmission" class="px-4 py-2 transition-all duration-300 border-solid border border-l-0 border-theme-light rounded-r-lg shadow outline-none focus:outline-none hover:bg-gray-200 focus:bg-theme-light focus:text-white">
                Find</button>
        </div>
        <div class="flex flex-col w-full mt-2 overflow-y-scroll" style="max-height: 15rem">
            <div v-for="sub in foundSubmissions" :key="sub._id" class="flex flex-row w-full items-center bg-gray-200 pl-4 rounded-lg my-1">
                <p class="w-full text-left">{{sub.name}}</p>
                <button @click="preview(sub._id)" class="px-2 py-1 ml-1 bg-white hover:bg-gray-300 focus:bg-theme-light focus:text-white rounded-lg border-solid border border-theme-light outline-none focus:outline-none">Preview</button>
                <button @click="deleteSubmission(sub._id)" class="px-2 py-1 ml-1 bg-white hover:bg-gray-300 focus:bg-theme-light focus:text-white rounded-lg border-solid border border-theme-light outline-none focus:outline-none">Delete</button>
            </div>
        </div>
        <p>Pending Submission</p>
        <div class="flex flex-row w-full mt-1">
            <input v-model="submissionNameFilter" type="text" placeholder="Submission Name" class="px-4 py-2 w-full border-solid border border-theme-light rounded-lg shadow">
        </div>
        <div class="flex flex-col w-full mt-2 overflow-y-scroll" style="max-height: 15rem">
            <div v-for="sub in submissions" :key="sub._id" class="flex flex-row w-full items-center bg-gray-200 pl-4 rounded-lg my-1">
                <p class="w-full text-left">{{sub.name}}</p>
                <button @click="preview(sub._id)" class="px-2 py-1 ml-1 bg-white hover:bg-gray-300 focus:bg-theme-light focus:text-white rounded-lg border-solid border border-theme-light outline-none focus:outline-none">Preview</button>
                <button @click="approve(sub._id)" class="px-2 py-1 ml-1 bg-white hover:bg-gray-300 focus:bg-theme-light focus:text-white rounded-lg border-solid border border-theme-light outline-none focus:outline-none">Approve</button>
                <button @click="reject(sub._id)" class="px-2 py-1 ml-1 bg-white hover:bg-gray-300 focus:bg-theme-light focus:text-white rounded-lg border-solid border border-theme-light outline-none focus:outline-none">Reject</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {apiURL} from '@/assets/variables.js';

export default {
    data() {
        return {
            submissionName: '',
            foundSubmissions: [],
            submissionNameFilter: '',
            submissions: [],
        }
    },
    mounted(){
        this.fetchSubmissions();
    },
    methods: {
        findSubmission(){
            axios({
                method: "POST",
                url: apiURL + "/api/submission/query",
                headers: {
                    'Authorization': this.$cookies.get('access-token')
                },
                data: {
                    'query': this.submissionName,
                }
            }).then((res) => {
                console.log(res.data);
                this.foundSubmissions = res.data;
            })
        },
        preview(id){
            window.open('/products/'+id, '_blank');
        },
        approve(id){
            axios({
                method: "POST",
                url: apiURL + "/api/submission/status",
                headers: {
                    'Authorization': this.$cookies.get('access-token')
                },
                data: {
                    'submissionID': id,
                    'status': 'published',
                    'statusMessage': 'Ready to rumble'
                }
            }).then(() => {
                this.submissions = this.submissions.filter(e => e._id !== id);
            })
        },
        deleteSubmission(id) {
            axios({
                method: "POST",
                url: apiURL + "/api/submission/delete",
                headers: {
                    'Authorization': this.$cookies.get('access-token')
                },
                data: {
                    'submissionID': id,
                }
            }).then(() => {
                this.foundSubmissions = this.foundSubmissions.filter(e => e._id !== id);
            })
        },
        reject(id) {
            axios({
                method: "POST",
                url: apiURL + "/api/submission/status",
                headers: {
                    'Authorization': this.$cookies.get('access-token')
                },
                data: {
                    'submissionID': id,
                    'status': 'rejected',
                    'statusMessage': 'Manual review rejected.'
                }
            }).then(() => {
                this.submissions = this.submissions.filter(e => e._id !== id);
            })
        },
        async fetchSubmissions() {
            await axios({
                method: "POST",
                url: apiURL + "/api/submission/get/pending",
                data: {
                    'amount': 100
                }
            })
            .then(res => {
                let subs = res.data.submissions;
                for(let i = 0; i < subs.length; i++){
                    if(subs[i].status.includes('manual review')){
                        this.submissions.push(subs[i]);
                    }
                }
            })
            .catch(err => console.log(err.response))
        }
    }
}
</script>