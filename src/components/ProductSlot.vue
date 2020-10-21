<template>
    <div class="Showcase_item z-10">
      <router-link
        :to="(hidden) ? '/' : '/products/mizkif'"
        class="ProductCard " :class="{'ProductCard--faded': faded == 'true'}"
        :style="'--env-keyColor: '+info.gradientTo+'88;--env-gradientStops: '+info.gradientFrom+' 0%, '+info.gradientTo+' 100%;'"
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

    
    </div>
</template>

<script>
import {apiURL} from '@/assets/variables.js';
export default {
    props: ['faded', 'hidden', 'info'],
    computed: {
      style(){
        return (this.hidden == 'true') ? 'filter: brightness(0);' : '';
      }
    },
    data(){
      return {
        apiURL: apiURL
      }
    },
    methods: {
      LightenDarkenColor(col, amt) {
        var num = parseInt(col, 16);
        var r = (num >> 16) + amt;
        var b = ((num >> 8) & 0x00FF) + amt;
        var g = (num & 0x0000FF) + amt;
        var newColor = g | (b << 8) | (r << 16);
        return newColor.toString(16);
      }
    }
}
</script>