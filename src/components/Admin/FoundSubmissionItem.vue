<template>
    <div v-if="sub">
        <div v-if="!showInput" class="flex flex-row w-full items-center bg-gray-200 pl-4 rounded-lg my-1">
            <p class="w-full text-left">{{sub.name}}</p>
            <button @click="preview(sub._id)" class="px-2 py-1 bg-white hover:bg-gray-300 focus:bg-theme-light focus:text-white border-solid border border-theme-light outline-none focus:outline-none">Preview</button>
            <button @click="showInput = true" class="px-2 py-1 bg-white hover:bg-gray-300 focus:bg-theme-light focus:text-white border-solid border border-r-0 border-l-0 border-theme-light outline-none focus:outline-none">Reject</button>
            <button @click="deleteSubmission(sub._id)" class="px-2 py-1 bg-white hover:bg-gray-300 focus:bg-theme-light focus:text-white rounded-r-lg border-solid border border-theme-light outline-none focus:outline-none">Delete</button>
        </div>
        <div v-if="showInput" class="flex flex-row w-full items-center bg-gray-200 rounded-lg my-1">
            <input v-model="rejectReason" class="w-full border border-solid border-theme-light rounded-l-lg px-4 py-1" type="text" placeholder="Reason">
            <button @click="reject(sub._id)" class="px-2 py-1 bg-white hover:bg-gray-300 focus:bg-theme-light focus:text-white border-solid border border-l-0 border-r-0 border-theme-light outline-none focus:outline-none">Reject</button>
            <button @click="showInput = false" class="px-2 py-1 bg-white hover:bg-gray-300 focus:bg-theme-light focus:text-white rounded-r-lg border-solid border border-theme-light outline-none focus:outline-none">Cancel</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {apiURL} from '@/assets/variables.js';
export default {
    props: {
        sub: Object,
    },
    data() {
        return {
            showInput: false,
            rejectReason: '',
        }
    },
    methods: {
        preview(id){
            window.open('/products/'+id, '_blank');
        },
        reject(id) {
            if(this.rejectReason === '') return;
            axios({
                method: "POST",
                url: apiURL + "/api/submission/status",
                headers: {
                    'Authorization': this.$cookies.get('access-token')
                },
                data: {
                    'submissionID': id,
                    'status': 'rejected',
                    'statusMessage': this.rejectReason
                }
            }).then(() => {
                this.$emit('itemRemoved', id);
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
    }
}
</script>