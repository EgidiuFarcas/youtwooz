<template>
  <div id="app touch-scroll">
    <vue-page-transition name="overlay-left-full">
      <router-view/>
    </vue-page-transition>
  </div>
</template>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}


.overlay-left,  .overlay-right,  .overlay-top,  .overlay-bottom   {
    background: #ff467f !important;
    z-index: 1000;
}
</style>
