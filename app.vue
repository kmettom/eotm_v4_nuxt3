<template>
  <div >

    <div id="eotmAppContainer" :class="{ 'no-scroll' : state.noScroll }">

      <div id="eotmBackground"></div>

      <Transition name="nav">
        <div class="eotm-content-container"  >
        <!--          v-show="enterAnimationDone"-->

          <Navigation  />

          <div id="scrollContainer"    >
            <div  id="scrollableContainer" class="" >
              <!--      data-scroll-->
              <main class="content-wrapper" >
                <!--                :class="{ 'content-extra-margin' : contentExtraMargin }"-->
                <NuxtPage/>
              </main>

              <Footer></Footer>
            </div>

          </div>

          <!-- NOTE: article gallery outside of the scroll container -->
          <gallery v-if="state.gallery" ></gallery>

        </div>
      </Transition>

    </div>

  </div>
</template>
<script setup lang="ts">

import {state} from "~/store/appStore";
import Gallery from "~/components/article/gallery/Gallery.vue";
import Footer from "~/components/Footer.vue";

// import searchMenu from "~/components/menu/searchMenu.vue";


// export default {
//   name: "Navigation",
//   components: {
//     Footer,
//     Gallery,
//   },
//   data() {
//     return {
//       menuState: {active: false, type: null},
//       contentExtraMargin: false,
//     };
//   },
// }

</script>