<template>
    <div class="Showcase_item">
      <router-link
        to="/products/mizkif"
        class="ProductCard " :class="{'ProductCard--faded': faded == 'true'}"
        style="--env-keyColor: #fddee6;--env-gradientStops: #fc97b1 0%, #fcb6c8 100%;"
      >
        <div class="ProductCard_media">
          <div class="ProductCard_media_inner">
            <img
              src="//cdn.shopify.com/s/files/1/0160/2840/1712/products/mizkif_characterai_rb-min_x600.png?v=1601690078"
              alt="Mizkif"
            />
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
          <strong class="ProductCard_category">Streamer </strong>

          <h3 class="ProductCard_name" title="Mizkif">
            <div class="ProductCard_name_inner ProductCard_name_inner--orig">
              Mizkif
            </div>
            <div
              class="ProductCard_name_inner ProductCard_name_inner--clone"
              aria-hidden="true"
            >
              Mizkif
            </div>
          </h3>
          <div class="ProductCard_price">
            <span class="ProductCard_price_current ">€25,95 EUR </span>
          </div>
        </div>
      </router-link>

      <link
        rel="prefetch"
        href="//cdn.shopify.com/s/files/1/0160/2840/1712/products/mizkif_box_final_1200_x600.jpg?v=1601690100"
      />
    </div>
</template>

<script>
export default {
    props: ['faded']
}
</script>