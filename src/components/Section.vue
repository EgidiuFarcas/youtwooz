<template>
    <!-- Live now section -->
        <div id="shopify-section-1556398916230" class="shopify-section">
          <div
            class="Article" :class="{'Article--hot': hot == 'true'}"
            id="collection-live"
            data-collection-wrapper="live">
            <div class="Article_inner">
                <!-- Section title -->
                <div class="Article_header">
                    <h2 class="Article_title">{{ title }}</h2>
                    <div v-if="description" class="Article_description">
                        <p>{{ description }}</p>
                    </div>
                </div>
                
                <div class="Article_content" id="products-live">
                    <div class="Showcase  Showcase--center-items" data-collection-list="coming-soon">
                        <!-- Here go the items -->
                        <ProductSlot :faded="faded" v-for="i in [0,1,2]" :key="i" />
                    </div>
                </div>
            </div>
          </div>
        </div>
</template>

<script>
import ProductSlot from '@/components/ProductSlot.vue'

export default {
    components: {
        ProductSlot
    },
    props: ['title', 'description', 'hot', 'faded']
}
</script>