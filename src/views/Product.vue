<template>
  <div v-if="fetched">
    <a class="skip-link visually-hidden" href="#main-content"
      >Skip to content</a>
    <main class="Layout_content" role="main" id="main-content">
      <div class="Layout_page_container Layout_page_container--product">
        <div id="shopify-section-product" class="shopify-section">
          <section data-section-id="product" data-section-type="product">
            <div
              class="ModalWrapper ModalWrapper--with-cart ModalWrapper--expand-on-small"
              :style="'--env-keyColor: '+info.gradientTo+'88;--env-gradientStops: '+info.gradientFrom+' 0%, '+info.gradientTo+' 100%;'">
              <div class="ModalWrapper_overlay" data-modal-close="<"></div>
              <div class="ModalWrapper_inner" data-scroll-lock-scrollable="">
                <div class="ModalWrapper_box" data-gallery="">
                  <a
                    href="/"
                    class="ModalWrapper_box_close"
                    title="Close"
                    data-modal-close="<"
                    ><i data-mi="close"></i
                  ></a>
                  <div
                    class="ProductModal-gallery-pagination ProductModal-gallery-pagination--left"
                    data-gallery-goto="prev"
                  >
                    <i data-mi="arrow_back"></i>
                  </div>
                  <div
                    class="ProductModal-gallery-pagination ProductModal-gallery-pagination--right"
                    data-gallery-goto="next"
                  >
                    <i data-mi="arrow_forward"></i>
                  </div>
                  <div class="ProductModal" data-modal-content="">
                    <div class="ProductModal_inner">
                      <div class="ProductModal_gallery">
                        <div class="ProductGallery">
                          <div
                            class="ProductGallery_hero ProductGallery_hero--expect-thumbs"
                            data-gallery-swipezone=""
                          >
                            <div
                              class="ProductGallery_hero_media"
                              data-gallery-exhibit=""
                              data-gallery-current="14621150085193"
                            >
                              <img
                                :src="apiURL + ((info.type === 1) ? info.image3D : info.image2D)"
                                alt="Mizkif"
                                draggable="false"
                              />
                            </div>
                          </div>
                          <ul
                            class="ProductGallery_thumbs"
                            data-drag-scroller=""
                          >
                          <li v-if="info.image3D"
                              class="ProductGallery_thumbs_item" :class="{'active': info.type === 1}"
                              data-gallery-preview="14621150085193"
                              :data-gallery-source="apiURL + info.image3D">
                              <a
                                class="ProductGallery_thumbs_thumb"
                                :href="apiURL + info.image3D"
                                target="_blank">
                                <img
                                  :src="apiURL + info.image3D"
                                  alt="Mizkif"
                                  draggable="false"/>
                              </a>
                            </li>
                            <li v-if="info.image2D"
                              class="ProductGallery_thumbs_item" :class="{'active': info.type !== 1}"
                              data-gallery-preview="14621150085193"
                              :data-gallery-source="apiURL + info.image2D">
                              <a
                                class="ProductGallery_thumbs_thumb"
                                :href="apiURL + info.image2D"
                                target="_blank">
                                <img
                                  :src="apiURL + info.image2D"
                                  alt="Mizkif"
                                  draggable="false"/>
                              </a>
                            </li>
                            <li v-if="info.imageBox"
                              class="ProductGallery_thumbs_item"
                              data-gallery-preview="14621150838857"
                              :data-gallery-source="apiURL + info.imageBox"
                            >
                              <a
                                class="ProductGallery_thumbs_thumb"
                                :href="apiURL + info.imageBox"
                                target="_blank"
                              >
                                <img
                                  :src="apiURL + info.imageBox"
                                  alt="Mizkif"
                                  draggable="false"
                                />
                              </a>
                            </li>
                          </ul>

                        </div>
                      </div>

                      <div class="ProductModal_content">
                        <div
                          class="ProductModal_content_inner product-cascading-vars"
                        >
                          <div class="Product-header">
                            <div class="Product-header_left">
                              <div class="Product-brand text-left">{{info.category}}</div>
                              <div class="Product-name ">
                                {{info.name}}
                              </div>
                            </div>

                            <div class="Product-header_right">
                              <div class="Product-price">
                                <span class="Product-price_current ">
                                  {{info.price}}
                                </span>
                              </div>
                            </div>
                          </div>

                          
                            <div class="Product-toolbar-layout">
                              <span class="visually-hidden">
                                <select name="id" class="input-select">
                                  <option
                                    selected="selected"
                                    value="31825732730953"
                                  >
                                    Default Title
                                  </option>
                                </select>
                              </span>
                              <div
                                class="Product-toolbar-layout_item Product-toolbar-quantity"
                              >
                                <div class="QuantitySelect " data-stepper="">
                                  

                                  <div class="QuantitySelect_field">
                                    <input
                                      type="text"
                                      class="QuantitySelect_input"
                                      name="quantity"
                                      :value="likes + ((likes !== 1) ? ' likes' : ' like')"
                                      disabled
                                    />
                                  </div>

                                  
                                </div>
                              </div>
                              <div
                                class="Product-toolbar-layout_item" >
                                <div>
                                  <button @click="toggleLike()" class="px-6 py-4 rounded-full outline-none focus:outline-none" 
                                    :class="{'bg-theme-light text-white': liked, 'bg-black text-white': !liked}" >
                                    <div class="Button_inner">
                                      <div class="Button_content">
                                        <span class="Button_text">
                                         {{ (!liked) ? ' ♡ Like ' : ' ♡ Liked '}}
                                        </span>
                                      </div>
                                    </div>
                                  </button>
                                </div>

                              </div>
                            </div>

                          <div class="Product-wait_for_it">
                            This is not an order. It&nbsp;will&nbsp;ship:
                            <strong>SOMETIME SOON &trade;</strong>

                            <div
                              class="Product-wait_for_it-and_more"
                              data-page-scroll=".Product-infoline,.Product-details"
                              data-page-scroll-speed="999"
                            >
                              Learn More
                            </div>
                          </div>
                          <div class="Product-infoline">
                            <span class="Product-infoline_msg"
                              >NO international shipping</span
                            >
                            <span class="Product-infoline_msg"
                              >NO international shipping</span
                            >
                            <span class="Product-infoline_msg"
                              >NO international shipping</span
                            >
                            <span class="Product-infoline_msg"
                              >NO international shipping</span
                            >
                            <span class="Product-infoline_msg"
                              >NO international shipping</span
                            >
                          </div>

                          <div class="Product-details">
                            <div class="Product-details_item">
                              <div class="Product-detail-line">
                                <div class="Product-detail-line_label">
                                  Height
                                </div>
                                <div class="Product-detail-line_value">
                                  {{info.height}}
                                </div>
                              </div>
                            </div>
                            <div class="Product-details_item">
                              <div class="Product-detail-line">
                                <div class="Product-detail-line_label">
                                  2D Artist
                                </div>
                                <div class="Product-detail-line_value">
                                  {{(info.artist2D) ? info.artist2D : "NONE"}}
                                </div>
                              </div>
                            </div>
                            <div class="Product-details_item">
                              <div class="Product-detail-line">
                                <div class="Product-detail-line_label">
                                  Submitted By
                                </div>
                                <div class="Product-detail-line_value py-1">
                                  {{info.submitter.name}} <span class="text-xs text-white rounded-md px-1 py-1" :style="{'background-color': info.submitter.roleColor}"> • {{info.submitter.role}}</span>
                                </div>
                              </div>
                            </div>
                            <div class="Product-details_item">
                              <div class="Product-detail-line">
                                <div class="Product-detail-line_label">
                                  3D Artist
                                </div>
                                <div class="Product-detail-line_value">
                                  {{(info.artist3D) ? info.artist3D : "NONE"}}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div v-html="info.description" class="Product-description content w-full break-all">
                            
                          </div>
                          <div class="w-full break-all">
                            <CommentSection :submissionID="info._id" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script>

import axios from 'axios';
import {apiURL} from '@/assets/variables.js';
import AuthMiddleware from '@/middleware/AuthMiddleware.js';
import CommentSection from '@/components/CommentSection.vue';
const Entities = require('html-entities').AllHtmlEntities;
 
const entities = new Entities();

export default {
  components: {
    CommentSection
  },
  data(){
    return {
      info: null,
      fetched: false,
      apiURL: apiURL,
      liked: false,
      likes: undefined
    }
  },
  async mounted(){
    await this.fetchData();
    await this.fetchLikes();
    console.log(this.info.submitter.role);
  },
  methods: {
    async fetchData(){
      await axios({
        method: "post",
        url: apiURL + "/api/submission/info",
        data: {
          'submissionID': this.$route.params.id
        }
      })
      .then(async res => {
        this.info = res.data;
        this.info.description = entities.decode(this.info.description);
        this.info.height = entities.decode(this.info.height);
        this.info.submitter = await this.getUser(this.info.submitterID);
        if(this.info.priceID) this.info.price = await this.getPrice(this.info.priceID);
        if(this.info.categoryID) this.info.category = await this.getCategory(this.info.categoryID);
        await this.loadUserRole(this.info.submitter.roleID);
        this.fetched = true;
      })
      .catch(err => console.log(err.response));
    },
    async getUser(id){
      let user = undefined;
      await axios({
        method: "POST",
        url: apiURL + "/api/auth/user",
        headers: {
          'Authorization': this.$cookies.get('access-token')
        },
        data: {
          'userID': id
        }
      }).then(res => user = res.data);
      return user
    },
    async loadUserRole(roleID){
           await axios({
                method: "POST",
                url: apiURL + "/api/role/get",
                data: {
                    'roleID': roleID
                }
            }).then(res => {
                this.info.submitter.role = res.data.name;
                this.info.submitter.roleColor = res.data.color;
            }).catch(err => console.log(err));
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
};
</script>
