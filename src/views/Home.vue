<template>
  <div class="home">
    <Banner></Banner>
    <main class="Layout_content" role="main" id="main-content">
      <div class="Layout_page_container Layout_page_container--index">
        <AuthButtons class="text-center" />
        <!-- Filters -->
        <div class="mt-4 w-full md:w-2/3 mx-auto flex flex-row">
          <!-- Category Dropdown -->
          <input v-model="filterText" class="text-center shadow-lg w-full rounded-lg border-2 border-solid border-black px-4 py-2 text-xl" type="text" placeholder="Lookup Name/Category">
          
        </div>
        <!-- Live now -->
        <Section title="Live now!" :submissions="published" :filterText="filterText.toLowerCase()" hot="true" />

        <!-- Coming soon -->
        <Section v-if="pending.length > 0" title="Upcoming Drops" :submissions="pending" faded="true" hidden="true" />

        <!-- Sold Out -->
        <!-- <Section title="Past Drops" faded="true" description="Gone forever!" /> -->
      </div>
    </main>
    <Footer />
  </div>
</template>

<style>
  
.svg-icon {
  width: 1em;
  height: 1em;
}

.svg-icon path,
.svg-icon polygon,
.svg-icon rect {
  fill: #000000;
}

.svg-icon circle {
  stroke: #000000;
  stroke-width: 1;
}
</style>

<script>
// @ is an alias to /src
import Banner from "@/components/Banner.vue";
import Section from "@/components/Section.vue";
import Footer from "@/components/Footer.vue";
import AuthButtons from "@/components/AuthButtons.vue";

import axios from 'axios';
import {apiURL} from '@/assets/variables.js';

let maxPublished = 10;
let maxPending = 10;

export default {
  name: "Home",
  components: {
    Banner,
    Section,
    Footer,
    AuthButtons,
  },
  data(){
    return {
      published: [],
      pending: [],
      filterText: ''
    }
  },
  async mounted(){
    await this.fetchPublished();
    await this.fetchPending();
  },
  methods: {
    fetchPublished: async function(){
      await axios({
        method: "POST",
        url: apiURL + "/api/submission/get/published",
        headers: {
          'Authorization': this.$cookies.get('access-token')
        },
        data: {
          'amount': maxPublished
        }
      })
      .then(async res => {
        let subs = res.data.submissions;
        for(let i = 0; i < subs.length; i++){
          if(subs[i].priceID) subs[i].price = await this.getPrice(subs[i].priceID);
          if(subs[i].categoryID) subs[i].category = await this.getCategory(subs[i].categoryID);
        }
        this.published = subs;
      })
      .catch(err => console.log(err.response));
    },
    fetchPending: async function(){
        await axios({
        method: "POST",
        url: apiURL + "/api/submission/get/pending",
        headers: {
          'Authorization': this.$cookies.get('access-token')
        },
        data: {
          'amount': maxPending
        }
      })
      .then(async res => {
        let subs = res.data.submissions;
        for(let i = 0; i < subs.length; i++){
          if(subs[i].priceID) subs[i].price = await this.getPrice(subs[i].priceID);
          if(subs[i].categoryID) subs[i].category = await this.getCategory(subs[i].categoryID);
        }
        this.pending = subs;
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
};
</script>
