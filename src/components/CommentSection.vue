<template>
    <div class="flex flex-col w-full border-t-2 border-solid border-theme-light pt-4">
        <p>Comments</p>
        <div v-if="authenticated" class="flex w-full p-4">
            <textarea maxlength="500" v-model="newComment" class="w-full px-4 py-2 resize-none bg-gray-100 rounded-l-lg shadow-md" type="text" placeholder="Enter comment here">
            </textarea>
            <button @click="addComment" class="w-auto px-4 py-2 break-normal hover:bg-gray-200 focus:bg-theme-light focus:text-white border border-solid border-theme-light rounded-r-lg shadow-md outline-none focus:outline-none">
                Send
            </button>
        </div>
        <img v-if="!comments" class="h-64 w-auto mx-auto" src="https://flevix.com/wp-content/uploads/2019/07/Ajax-Preloader.gif" alt="">
        <p v-if="comments && comments.length === 0" class="p-4">This submission has no comments.</p>
        <div v-if="comments" class="p-4">
            <Comment v-for="comment in comments.slice().reverse()" :key="comment._id"
                :authenticated="authenticated" :info="comment" @commentDeleted="comments = comments.filter(c => c._id !== $event)"/>
        </div>
    </div>
</template>

<script>
import Comment from '@/components/Comment.vue';
import axios from 'axios';
import {apiURL} from '@/assets/variables.js';
import AuthMiddleware from '@/middleware/AuthMiddleware.js';

export default {
    components: {
        Comment
    },
    props: {
        submissionID: String
    },
    data(){
        return {
            authenticated: false,
            newComment: '',
            comments: undefined
        }
    },
    async mounted(){
        let am = new AuthMiddleware();
        if(await am.checkAuthentication()) this.authenticated = true;
        await this.fetchComments();
    },
    methods: {
        async addComment(){
            if(!this.authenticated || this.newComment === '') return;
            await axios({
                method: 'post',
                url: apiURL + '/api/comment/new',
                headers: {
                    'Authorization': this.$cookies.get('access-token')
                },
                data: {
                    'itemID': this.submissionID,
                    'text': this.newComment
                }
            })
            .then(res => {
                this.comments.push(res.data);
                this.newComment = '';
            });
        },
        async fetchComments(){
            await axios({
                method: 'post',
                url: apiURL + '/api/comment/get-all',
                data: {
                    'itemID': this.submissionID
                }
            })
            .then(res => {
                this.comments = res.data.comments
            });
        }
    }
}
</script>