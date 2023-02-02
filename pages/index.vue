<template>

  <div class="thumbs-container" ref="thumbsContainer" v-if="thumbsData">

    <div class="buttons-wrapper" v-if="state.isAdminMode">
      <div class="save-button btn"  @click="$router.push({ name: 'AdminThumbs'} )" >thumbs admin</div>
    </div>

    <thumb @aniAllThumbsOut="aniAllThumbsOut" ref="thumb" :key="item._id"  v-for="( item , index ) in thumbsData"  :article="item"></thumb>

    <div v-if="noResultsTxt"  class="no-results-txt">No results found</div>

    <div
    v-if="loadMoreBtnEnabled && !noResultsTxt"
    class="load-more-btn"
    @click="fetchThumbsPage(true)"
    :data-cursorsize="state.cursorHover.size"
    :data-cursoropacity="state.cursorHover.opacity"
    >
    <span class="text" :data-cursorsize="state.cursorHover.size" :data-cursoropacity="state.cursorHover.opacity">more</span>
    <span class="arrow" :data-cursorsize="state.cursorHover.size" :data-cursoropacity="state.cursorHover.opacity"></span>
    <span class="arrow copy" :data-cursorsize="state.cursorHover.size" :data-cursoropacity="state.cursorHover.opacity"></span>

  </div>

  </div>

</template>

<script>
import { ThumbsService } from "../components/thumbs/thumbsService.js";
import Thumb from "../components/thumbs/Thumb.vue";
// import LoadingSpinner from "../welcome/loadingSpinner.vue";

import {state} from "~/store/appStore";

import { gsap } from "gsap";
// import { mapState } from 'vuex';

export default {
  name: "Thumbs",
  props: [],
  components: {
    // LoadingSpinner,
    Thumb,
  },
  data() {
    return {
      // state: state,
      thumbsData: [],
      currentThumbsPage: 1,
      loadMoreBtnEnabled: false,
      noResultsTxt: false,
      loading: true
    };
  },
  methods: {
    aniAllThumbsOut(){

      gsap.to( this.$refs.thumbsContainer , 0.7 , { opacity:0  , scale: 1 });

      // setTimeout(() => {
        // done();
      // } , this.entLvAni.leaveDur)

      // thumbsContainer
      // for (var i = 0; i < this.$refs.thumb.length; i++) {
      //   this.$refs.thumb[i]
      // }
    },
    fetchThumbsPage(_nextPage) {
      if (_nextPage) {
        this.currentThumbsPage++;
      } else {
        this.currentThumbsPage = 1;
        this.thumbsData = [];
      }

      if (this.$route.name === "Search" || this.$route.query.tags ) {
        ThumbsService.searchThumbsPage(
        this.$route.params.searchword,
        this.$route.query.tags,
        this.currentThumbsPage
        ).then((_data) => {
          this.loading = false;

          this.loadMoreBtnEnabled = _data.nextPageAvailable;

          if (this.currentThumbsPage == 1 && _data.articles.length < 1) {
            this.noResultsTxt = true;
          } else {
            let newThumbs = _data.articles;
            this.thumbsData = this.thumbsData.concat(newThumbs);
          }

        });
      } else {
        ThumbsService.getThumbsPage(this.currentThumbsPage).then((_data) => {

          // commit("thumbsLoaded", true);

          this.loading = false;
          this.loadMoreBtnEnabled = _data.nextPageAvailable;
          let newThumbs = _data.articles;
          this.thumbsData = this.thumbsData.concat(newThumbs);
        });
      }
    },
  },
  watch: {
    $route(to, from) {
      this.fetchThumbsPage(false);
      this.noResultsTxt = false;
    },
  },
  mounted() {
    this.fetchThumbsPage(false);
  },
  updated(){
    // this.$store.commit('scrollupdateheight');
  },
};
</script>

<style scoped lang="scss">

.buttons-wrapper {
  position: absolute;
  top: -50px;
  right: 0px;
}
.btn {
  padding: 5px;
  &:hover {
    color: $green;
  }
}

  .thumbs-container {
    position: relative;
    /* margin: 100px auto 185px; */
    margin: 0px auto 185px;
    padding: 75px 0px 135px;
    color: $white;
    text-align: center;
    text-align: left;
    width: 1295px;
    min-height: 80vh;

    @include respond-width($width-4thumbs) {
      width: 975px;
    }

    @include respond-width($width-3thumbs) {
      width: 655px;
    }

    @include respond-width($width-2thumbs) {
      width: 335px;
      margin: 0px auto 185px;
      // max-width: 100%;
    }
     @include respond-width($width-thumbs-flat) {
       /* margin: 50px auto 100px; */
       margin: 0px auto 100px;
       padding: 50px 0px 185px;
    }
    @include respond-width($w550){
      /* margin: 75px auto 30px; */
      margin: 0px auto 30px;
      padding: 0px 0px 135px;
      width: 95%;
    }
  }

  .no-results-txt {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 22px;
    letter-spacing: 0.1em;
    color: $green;
    width: 100%;
    text-align: center;
    @include respond-width($w550){
      font-size: 22px;
    }
  }

  .load-more-btn {
    position: absolute;
    right: 0px;
    bottom: 0px;
    width: 50px;
    height: 110px;
    @include respond-width($w550){
      right: 20px;
      transform: scale(0.7);
    }
    &:hover {
      .arrow.copy {
        top: 15px;
        }
      }
      .text {
        top: 12px;
        right: -10px;
        position: absolute;
        display: block;
        transform: rotate(90deg);
        transform-origin: bottom;
        color: $green;
        font-weight: 300;
        // letter-spacing: 3px;
        text-transform: uppercase;
      }
      .arrow {
        transition: ease all 0.2s;
        left: 20px;
        top: 0px;
        position: absolute;
        display: block;
        height: 100%;
        width: 2px;
        background: $green;
        &.copy {
          background: transparent;
        }
        &:before,
        &:after {
          content: "";
          display: block;
          position: absolute;
          transform: rotate(-45deg);
          height: 2px;
          width: 35px;
          bottom: 10px;
          left: -4px;
          background: #3ec28f;
        }
        &:before {
          left: -29px;
          transform: rotate(45deg);
        }
      }
    }


  </style>
