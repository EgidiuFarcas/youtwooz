<template>
  <div class="home">
    <Banner></Banner>
    <main class="Layout_content" role="main" id="main-content">
      <div class="Layout_page_container Layout_page_container--index">
        <PatreonRedirect > </PatreonRedirect>
        
        <AuthButtons class="text-center" />
        <!-- Filters -->
        <div class="mt-4 w-full md:w-2/3 mx-auto flex flex-col md:flex-row">
          <!-- Category Dropdown -->
          <div class="w-full md:w-4/6 flex flex-row">
            <input v-model="filterText" class="text-center shadow-lg w-full rounded-l-lg md:rounded-r-none border-2 border-solid border-black px-4 py-2 text-xl" type="text" placeholder="Lookup Name/Category">
            <button v-if="didSearch === false || filterText !== ''" @click="fetchSearch" :class="{'rounded-none': didSearch, 'rounded-r-lg md:rounded-none': !didSearch}" 
              class="px-2 bg-white  border-2 border-l-0 border-black border-solid hover:bg-theme-light hover:text-white focus:outline-none">
              Search
            </button>
            <button v-if="didSearch === true" @click="$router.go();" 
              class="px-2 bg-white  border-2 border-l-0 border-black border-solid rounded-r-lg md:rounded-none hover:bg-theme-light hover:text-white focus:outline-none">
              Reset
            </button>
          </div>
          <div class="w-full md:w-2/6 ">
            <button @click="showSortOptions = !showSortOptions" :class="{'rounded-lg md:rounded-l-none': !showSortOptions, 'rounded-t-lg md:rounded-l-none': showSortOptions}"
              class="mt-1 md:mt-0 py-2 w-full h-full bg-black text-white shadow-lg border-2 border-l-0 border-solid border-black text-center focus:outline-none">
            Sort By: {{selectedOption}}</button>
            <div :class="{'hidden': !showSortOptions}" class="relative md:absolute bg-white rounded-b-lg shadow-lg overflow-hidden">
              <p v-for="option in options.filter(e => e !== selectedOption)" :key="option"
               class="p-2 cursor-pointer bg-white hover:bg-black hover:text-white" @click="selectSortOption(option)">{{ option }}</p>
            </div>
          </div>
        </div>
        <!-- Live now -->
        <Section title="Live now!" ref="livenow" :submissions="published" :filterText="filterText.toLowerCase()" hot="true" />
        <img v-if="loadTriggered" class="h-64 w-auto mx-auto" src="https://flevix.com/wp-content/uploads/2019/07/Ajax-Preloader.gif" alt="">

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
import PatreonRedirect from '@/components/PatreonRedirect.vue';

import axios from 'axios';
import {apiURL} from '@/assets/variables.js';

let maxPublished = 5;
let maxPending = 10;
let loadCount = 1;
let allLoaded = false;

export default {
  name: "Home",
  components: {
    Banner,
    Section,
    Footer,
    AuthButtons,
    PatreonRedirect
  },
  data(){
    return {
      published: undefined,
      pending: [],
      filterText: '',
      showSortOptions: false,
      options: ['Newest', 'Oldest', 'Most liked', 'Least liked'],
      selectedOption: 'Newest',
      loadTriggered: false,
      didSearch: false
    }
  },
  async mounted(){
    if(this.$route.params.sortBy){
      this.selectedOption = this.$route.params.sortBy.replace('_', ' ');
      this.selectedOption = this.selectedOption.charAt(0).toUpperCase() + this.selectedOption.slice(1);
      // this.options = this.options.filter(e => e !== this.selectedOption);
    }
    await this.fetchPublished();
    await this.fetchPending();
    this.scrollFetchPublished();
  },
  methods: {
    async fetchSearch(){
      await axios({
        method: "POST",
        url: apiURL + "/api/submission/get/search",
        headers: {
          'Authorization': this.$cookies.get('access-token')
        },
        data: {
          'query': this.filterText,
        }
      })
      .then(async res => {
        let subs = res.data;
        for(let i = 0; i < subs.length; i++){
          if(subs[i].priceID) subs[i].price = await this.getPrice(subs[i].priceID);
          if(subs[i].categoryID) subs[i].category = await this.getCategory(subs[i].categoryID);
        }
        this.published = subs;
        this.didSearch = true;
      })
      .catch(() => this.$router.go());
    },
    selectSortOption(option){
      this.selectedOption = option;
      this.showSortOptions = false;
      this.$router.push('/sort/'+option.toLowerCase().replace(' ', '_'));
      this.$router.go();
    },
    scrollFetchPublished: async function(){
      window.onscroll = async () => {
        let bottomOfWindow = window.scrollY + window.innerHeight >= this.$refs.livenow.$el.offsetHeight;
        
        if(bottomOfWindow && this.loadTriggered === false && allLoaded === false && this.filterText === ''){
          this.loadTriggered = true;
          await axios({
            method: "POST",
            url: apiURL + "/api/submission/get/published",
            headers: {
              'Authorization': this.$cookies.get('access-token')
            },
            data: {
              'from': loadCount * maxPublished,
              'to': maxPublished * (loadCount+1),
              'sortBy': this.$route.params.sortBy
            }
          })
          .then(async res => {
            let subs = res.data.submissions;
            for(let i = 0; i < subs.length; i++){
              if(subs[i].priceID) subs[i].price = await this.getPrice(subs[i].priceID);
              if(subs[i].categoryID) subs[i].category = await this.getCategory(subs[i].categoryID);
              this.published.push(subs[i]);
            }
            loadCount += 1;
            if(subs.length < maxPublished) allLoaded = true;
            console.log(subs);
            this.loadTriggered = false;
          })
          .catch(err => console.log(err.response));
        }
      }
    },
    fetchPublished: async function(){
      await axios({
        method: "POST",
        url: apiURL + "/api/submission/get/published",
        headers: {
          'Authorization': this.$cookies.get('access-token')
        },
        data: {
          'from': '0',
          'to': maxPublished,
          'sortBy': this.$route.params.sortBy
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
