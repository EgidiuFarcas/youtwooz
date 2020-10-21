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

                          <form
                            method="post"
                            action="/cart/add"
                            id="product_form_4567039508553"
                            accept-charset="UTF-8"
                            class="shopify-product-form"
                            enctype="multipart/form-data"
                            data-product-form="mizkif"
                          >
                            <input
                              type="hidden"
                              name="form_type"
                              value="product"
                            /><input type="hidden" name="utf8" value="✓" />
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
                                  <div
                                    class="QuantitySelect_spinner QuantitySelect_spinner--down"
                                    data-stepper-step="down"
                                  >
                                    <i data-mi="arrow_drop_down"></i>
                                  </div>

                                  <div class="QuantitySelect_field">
                                    <input
                                      type="number"
                                      class="QuantitySelect_input"
                                      data-stepper-input=""
                                      name="quantity"
                                      value="1"
                                      min="1"
                                      max="99"
                                      step="1"
                                      data-product-quantity="mizkif"
                                    />

                                    <span
                                      class="QuantitySelect_value"
                                      data-stepper-spinning=""
                                    ></span>
                                  </div>

                                  <div
                                    class="QuantitySelect_spinner QuantitySelect_spinner--up"
                                    data-stepper-step="up"
                                  >
                                    <i data-mi="arrow_drop_up"></i>
                                  </div>
                                </div>
                              </div>
                              <div
                                class="Product-toolbar-layout_item"
                                data-state-switcher=""
                              >
                                <div
                                  data-state-default=""
                                  data-state-current=""
                                >
                                  <button
                                    name="add"
                                    type="submit"
                                    class="Button  Button--primary"
                                  >
                                    <div class="Button_inner">
                                      <div class="Button_content">
                                        <i
                                          class="Button_icon"
                                          data-mi="shopping_basket"
                                        ></i>

                                        <span class="Button_text"
                                          >Add to cart</span
                                        >
                                      </div>
                                    </div>
                                  </button>
                                </div>

                              </div>
                            </div>
                          </form>

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
                                <div class="Product-detail-line_value">
                                  {{info.submitter.name}}
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

                          <div v-html="info.description" class="Product-description content">
                            
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
const Entities = require('html-entities').AllHtmlEntities;
 
const entities = new Entities();

export default {
  components: {},
  data(){
    return {
      info: null,
      fetched: false,
      apiURL: apiURL
    }
  },
  async mounted(){
    await this.fetchData();
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
        this.fetched = true;
        console.log("loaded");
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
