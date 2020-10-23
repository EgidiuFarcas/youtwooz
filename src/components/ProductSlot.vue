<template>
    <div class="Showcase_item z-10 flex flex-col" v-if="info.name.toLowerCase().includes(filterText) || info.category.toLowerCase().includes(filterText)">
      <router-link
        :to="(hidden) ? '/' : '/products/'+info._id"
        class="ProductCard " :class="{'ProductCard--faded': faded == 'true'}"
        :style="'--env-keyColor: '+info.gradientTo+'44;--env-gradientStops: '+info.gradientFrom+' 0%, '+info.gradientTo+' 100%;'"
      >
        <div class="ProductCard_media">
          <div class="ProductCard_media_inner">
            <img v-if="info.type !== 1" :style="style" :src="apiURL + info.image2D" :alt="info.name"/>
            <img v-if="info.type === 1" :style="style" :src="apiURL + info.image3D" :alt="info.name"/>
          </div>
        </div>

        <div class="ProductCard_actions" data-countdown-content="">
          <button
            class="Button  Button--expect-colors Button--small Button--wide"
          >
            <div class="Button_inner">
              <div class="Button_content">
                <span class="Button_text">Limited edition </span>
              </div>
            </div>
          </button>
        </div>

        <div class="ProductCard_content">
          <strong class="ProductCard_category">{{(hidden) ? "Mystery" : info.category}} </strong>

          <h3 class="ProductCard_name" title="Mizkif">
            <div class="ProductCard_name_inner ProductCard_name_inner--orig">
              {{(hidden) ? "?????" : info.name}}
            </div>
            <div
              class="ProductCard_name_inner ProductCard_name_inner--clone"
              aria-hidden="true"
            >
              {{(hidden) ? "?????" : info.name}}
            </div>
          </h3>
          <div v-if="!hidden" class="ProductCard_price">
            <span class="ProductCard_price_current ">{{info.price}} </span>
          </div>
        </div>
        
      </router-link>
      <div>
          <button @click="toggleLike()" class="text-xl border-theme-light border border-solid rounded-full px-3 py-1 outline-none focus:outline-none"
            :class="{'bg-theme-light text-white': liked === true, 'text-theme-light': liked !== true}">
            {{ likes }} {{ (!liked) ? ' ♡ Like ' : ' ♡ Liked '}}
          </button>
        </div>
    </div>
</template>

<style>
  .svg-icon {
    fill: #ff0000 !important;
  }
</style>

<script>
import axios from 'axios';
import {apiURL} from '@/assets/variables.js';
export default {
    props: ['faded', 'hidden', 'info', 'filterText'],
    computed: {
      style(){
        return (this.hidden == 'true') ? 'filter: brightness(0);' : '';
      }
    },
    data(){
      return {
        apiURL: apiURL,
        liked: false,
        likes: undefined
      }
    },
    async mounted(){
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
    methods: {
      toggleLike(){
        this.liked = !this.liked;
        if(this.liked) this.addLike();
        else this.removeLike();
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
        .catch(() => {
          this.liked = false;
          this.$router.push('/login');
        });
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