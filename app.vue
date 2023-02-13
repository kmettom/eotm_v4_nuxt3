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

import {state} from "~/store";
import Gallery from "~/components/article/gallery/Gallery.vue";
import Footer from "~/components/Footer.vue";

// import searchMenu from "~/components/menu/searchMenu.vue";


// export default {
//   name: "app",
//   components: {
//   },
//   mounted() {
//     console.log("mounted");
//   },
// };


</script>

<style  lang="scss">
@import "./assets/scss/_main.scss";

#eotmAppContainer {
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  &.no-scroll {
    height: calc(100vh - 20px); // TODO: find the 20px difference - what is the cause?
    overflow: hidden;
  }
}

#scrollContainer{
  margin: 0px;
  padding: 0px;
  display: block;
  position: relative;
}
#scrollableContainer{
  will-change: transform;
}

.content-wrapper {
  position: relative;
  padding-top: 25vh;
  min-height: 100vh;
  // transition: ease margin 0.3s;
  @include respond-width($w768) {
    padding-top: 25vh;
  }
  @include respond-width($w550) {
    padding-top: 15vh;
  }
}

.content-extra-margin {
  margin-top: 0px;
}

#eotmBackground {
  z-index: -1;
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100%;
  background: $grey-d-bg;
  &:after {
    content: "";
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    width: 100vw;
    height: 100vh;
    filter: blur(10px);
    position: absolute;
    background-image: $bg-radient;
  }
}

#particles-js{
  // position: absolute;
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100%;
  // background: grey;
}

.nav-enter-active,
.nav-leave-active {
  transition: ease all 1.4s;
}
.nav-enter,
.nav-leave-to {
  opacity: 0;
}
.nav-enter-to,
.nav-leave {
  opacity: 1;
}
</style>