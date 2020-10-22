<template>
    <div v-if="info && user" class="mb-3 flex w-full px-4 py-2 bg-gray-200 rounded-lg shadow-md">
        <div class="flex flex-row mr-2">
            <img v-if="user" class="h-12 w-auto rounded-full" :src="apiURL + user.pfp" alt="">
            <img v-if="!user" class="h-12 w-auto rounded-full" src="@/assets/default_pfp.png" alt="">
        </div>
        <div class="flex flex-col w-full">
            <p class="font-bold">{{user.name}} <span class="text-xs px-2 py-1 rounded-lg text-white" :style="'background-color: '+user.roleColor">{{user.role}}</span></p>
            <p class="">{{ info.text }}</p>
            <div class="mt-2 flex items-center">
                <button @click="toggleLike" :class="{'bg-black': !liked, 'bg-theme-light': liked}" class="justify-self-start text-white px-2 py-1 rounded-full outline-none focus:outline-none">
                    {{likes}} {{ (!liked) ? ' ♡ Like ' : ' ♡ Liked '}}</button>
                <button @click="deleteComment" v-if="currentUser && currentUser._id === info.userID"
                    class="ml-auto bg-black text-white px-2 py-1 rounded-full outline-none focus:outline-none">
                    Delete
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {apiURL} from '@/assets/variables.js';
import AuthMiddleware from '@/middleware/AuthMiddleware.js';
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

export default {
    props:{
        info: Object,
        authenticated: Boolean,
    },
    data(){
        return {
            liked: false,
            likes: undefined,
            user: undefined,
            apiURL: apiURL,
            currentUser: undefined
        }
    },
    async mounted(){
        if(!this.info) return;
        await this.getUser();
        await this.fetchLikes();
        await this.loadUserRole(this.user.roleID);
        if(!this.authenticated){
            this.currentUser = await this.getCurrentUser();
        }
        this.info.text = entities.decode(this.info.text);
    },
    methods: {
        async deleteComment(){
            if(!this.authenticated) return;
            if(this.currentUser._id !== this.info.userID) return;
            await axios({
                method: 'delete',
                url: apiURL + '/api/comment/delete',
                headers: {
                    'Authorization': this.$cookies.get('access-token')
                },
                data: {
                    'commentID': this.info._id,
                }
            })
            .then(() => {
                this.$emit('commentDeleted', this.info._id);
            }).catch(err => console.log(err.response));
        },
        async loadUserRole(roleID){
           await axios({
                method: "POST",
                url: apiURL + "/api/role/get",
                data: {
                    'roleID': roleID
                }
            }).then(res => {
                this.user.role = res.data.name;
                this.user.roleColor = res.data.color;
            }).catch(err => console.log(err));
        },
        async getUser(){
            await axios({
                method: "POST",
                url: apiURL + "/api/auth/user",
                headers: {
                'Authorization': this.$cookies.get('access-token')
                },
                data: {
                'userID': this.info.userID
                }
            }).then(res => this.user = res.data);
        },
        async getCurrentUser(){
            let user = undefined;
            await axios({
                method: "POST",
                url: apiURL + "/api/auth/info",
                headers: {
                'Authorization': this.$cookies.get('access-token')
                },
            }).then(res => user = res.data);
            return user;
        },
        toggleLike(){
            this.liked = !this.liked;
            if(this.liked) this.addLike();
            else this.removeLike();
        },
        async fetchLikes(){
            await axios({
                method: 'post',
                url: apiURL + "/api/like/get-total",
                headers: {
                    'Authorization': this.$cookies.get('access-token')
                },
                data: {
                    'itemID': this.info._id
                }
            })
            .then(res => {
                this.likes = res.data.likes;
            })
            .catch(() => {
                return;
            });
            let am = new AuthMiddleware();
            if(!await am.checkAuthentication()) return;
            await axios({
                method: 'post',
                url: apiURL + "/api/like/get",
                headers: {
                    'Authorization': this.$cookies.get('access-token')
                },
                data: {
                    'itemID': this.info._id
                }
            })
            .then((res) => {
                if(res.data === true) this.liked = true;
            })
            .catch(() => {
                return;
            });
      },
      addLike(){
        axios({
          method: 'post',
          url: apiURL + '/api/like/new',
          headers: {
            'Authorization': this.$cookies.get('access-token')
          },
          data: {
            'itemID': this.info._id
          }
        })
        .then(() => {
          this.likes++;
        })
        .catch(() => this.liked = false);
      },
      removeLike(){
        axios({
          method: 'delete',
          url: apiURL + '/api/like/delete',
          headers: {
            'Authorization': this.$cookies.get('access-token')
          },
          data: {
            'itemID': this.info._id
          }
        })
        .then(() => {
          this.likes--;
        })
        .catch(() => this.liked = true);
      }
    }
}
</script>