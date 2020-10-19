<template>
  <div class="home">
    <Banner></Banner>
    <main class="Layout_content" role="main" id="main-content">
      <div class="Layout_page_container Layout_page_container--index">
        <AuthButtons class="text-center" />
        <!-- Live now -->
        <Section title="Live now!" hot="true" />

        <!-- Coming soon -->
        <Section title="Upcoming Drops" faded="true" hidden="true" />

        <!-- Sold Out -->
        <Section title="Past Drops" faded="true" description="Gone forever!" />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Banner from "@/components/Banner.vue";
import Section from "@/components/Section.vue";
import Footer from "@/components/Footer.vue";
import AuthButtons from "@/components/AuthButtons.vue";

export default {
  name: "Home",
  components: {
    Banner,
    Section,
    Footer,
    AuthButtons,
  },
  
};
</script>
