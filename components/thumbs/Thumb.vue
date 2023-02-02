<template>

  <transition name="thumb" @enter="thumbEnterAni" @leave="thumbLeaveAni" >

    <div  class="thumb-wrapper"   :class="{'empty-thumb' : article.emptyThumb}" @mouseenter="thumbHover(true , article._id )" @mouseout="thumbHover(false, article._id)"   :id="'thumb' + article._id"  >

      <a  @click.prevent="goToArticle"  class="thumb-hex-wrapper"  v-set-data-attrs="{cursorsize: 75 , cursoropacity: 0.3 }" >
        <div class="t-bg" v-if="article.thumb.title"  >
          <img class="t-bg-img" :alt="article.thumb.title" :src="'/assets/thumbs/' + article.thumb.picture.path"  v-imgloader:thumb.webgl="thumbMeshId" />
        </div>
        <div class="t-content" ref="thumbContent" >
          <div class="t-cont-static" v-if="article.thumb.title" >
            <h2 class="t-headline" :id="'headline' + article._id"  >{{article.thumb.title}}</h2>
          </div>
          <div class="t-cont-dynamic" :id="'content' + article._id">
            <p class="t-desc">{{article.thumb.description}}</p>
            <div class="t-tags">
              <span class="t-tag" v-for="tag in article.tags.slice(0, 3)">
                #{{tag}}
              </span>
            </div>
          </div>
        </div>
      </a>

    </div>

</transition>

</template>

<script>
import { ThumbsService } from "./thumbsService.js";

import { gsap } from "gsap";
// import { mapState } from 'vuex';
// import {CanvasService}  from '~/utilities/canvas/canvasService.js';
// import {DisplayService} from '~/utilities/displayService.js';


export default {
  name: "Thumb",
  props: ["article"],
  data() {
    return {
      thumbActiveAnimations: [],
      hoverAniOpt: { // hover animation
        step1dur: 0.35,
        step2delay: 0.25,
        step2dur: 0.05,
        easeAni: "linear",
      },
      goToArtAniOpt: { // go to Article animation
        aniDuration: 750, //1000
      },
      entLvAni: { // enter and leave animation
        minOpacity: 0,
        minScale: 0.9,
        leaveDur: 350,
        enterDur: 750,
        // yTrans: '50px',
        // xTrans: '50px',
      },

    };
  },
  computed: {
    thumbMeshId(){
      return "thumb" + this.article.href;
    }
  },
  methods: {
    thumbHover(_activate, _id) {
     // if(DisplayService.isMobile()) return;

     if (_activate && !this.thumbActiveAnimations[_id]) {
       this.thumbActiveAnimations[_id] = gsap.timeline();
       this.thumbActiveAnimations[_id]
         .to(
           "#headline" + _id,
           {
             ease: this.hoverAniOpt.easeAni,
             duration: this.hoverAniOpt.step2dur,
             y: -75,
           },
           this.hoverAniOpt.step2delay
         )
         .to(
           "#content" + _id,
           {
             ease: this.hoverAniOpt.easeAni,
             duration: this.hoverAniOpt.step2dur,
             y: -75,
             opacity: 1,
           },
           this.hoverAniOpt.step2delay + 0.05
         );
     } else if (!_activate && this.thumbActiveAnimations[_id]) {
       this.thumbActiveAnimations[_id].reverse();
       this.thumbActiveAnimations[_id] = false;
     }
   },
    goToArticle(){
      if(false){
      // if(DisplayService.isMobile()){
        this.$router.push({ name: "Article", params: { href: this.article.href }})
      }else {
        this.$emit("aniAllThumbsOut");
        // CanvasService.thumbToArticle(this.thumbMeshId).then( () => {
        //   this.$router.push({ name: "Article", params: { href: this.article.href }})
        // });
      }
    },
    thumbEnterAni(el, done){
      gsap.to( this.$refs.thumbContent, 0 , { opacity: this.entLvAni.minOpacity, scale: this.entLvAni.minScale } );
      done();
      setTimeout(() => {
        gsap.to( this.$refs.thumbContent, this.entLvAni.enterDur / 1000 ,{ opacity: 1 , scale: 1} );
      } , this.entLvAni.leaveDur + 50 )
    },
    thumbLeaveAni(el, done){
      gsap.to( this.$refs.thumbContent , this.entLvAni.leaveDur / 1000 , { opacity:this.entLvAni.minOpacity  , scale: this.entLvAni.minScale });
      setTimeout(() => {
        done();
      } , this.entLvAni.leaveDur)
    },
  },
  watch: {
  },
  mounted() {

    // this.fetchThumbsPage(false);

  },
  beforeDestroy() {},
};
</script>

<style scoped lang="scss">

.thumb-wrapper {
  position: relative;
  display: inline-block;
  margin: -75px 10px 0px;
  width: 300px;
  height: 345px;

  // ******hexagon THUMBS grid**************
  // $leftMoveConf: 80px;
  $leftMoveConf: 80px;
  @include respond-thumbs(5000px, $width-4thumbs) {
    &:nth-child(8n + 1),
    &:nth-child(8n + 2),
    &:nth-child(8n + 3),
    &:nth-child(8n + 4) {
      left: $leftMoveConf ;
    }
    &:nth-child(8n + 5),
    &:nth-child(8n + 6),
    &:nth-child(8n + 7),
    &:nth-child(8n + 8) {
      left: -$leftMoveConf ;
      // left: 0px;
    }
  }
  @include respond-thumbs($width-4thumbs, $width-3thumbs) {
    &:nth-child(6n + 1),
    &:nth-child(6n + 2),
    &:nth-child(6n + 3) {
      left: $leftMoveConf;
      // left: 160px;
    }
    &:nth-child(6n + 4),
    &:nth-child(6n + 5),
    &:nth-child(6n + 6) {
      left: -$leftMoveConf ;
      // left: 0px;
    }
  }
  @include respond-thumbs($width-3thumbs, $width-2thumbs) {
    &:nth-child(4n + 1),
    &:nth-child(4n + 2) {
      left: $leftMoveConf;
    }
    &:nth-child(4n + 3),
    &:nth-child(4n + 4) {
      left: -$leftMoveConf;
    }
  }
  @include respond-thumbs($width-2thumbs, $width-thumbs-flat) {
    &:nth-child(2n + 1) {
      left: $leftMoveConf;
    }
    &:nth-child(2n + 2){
      left: -$leftMoveConf;
    }
  }
  @include respond-width($width-thumbs-flat){
    left: auto;
    width: 100%;
    height: 23vh;
    min-height: 150px;
    margin: 3px auto;
    border-radius: 5px;
    overflow: hidden;
  }

}

.thumb-hex-wrapper {
  height: 100%;
  width: 100%;
  display: block;
  z-index: 0;
  color: $white;

}

.t-bg {
  width: 100%;
  height: 100%;
  text-align: center;
  position: relative;
  &:after{
    content: none;
    display: none;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    background: $black-trans;
    @include respond-width($width-thumbs-flat){
      content: '';
      display: block;
    }
  }

  .t-bg-img {
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
  }
}

.t-content {
  // transition: linear all 0.2s;
  height: 70px;
  position: absolute;
  top: 50%;
  opacity: 0;
  transform: translate(0, -50%);
  right: 0px;
  left: 0px;
  margin: 0 auto;
  width: 95%;
  text-align: center;
  pointer-events: none;
}
.t-cont-static {
  width: 235px;
  position: relative;
  margin: 0 auto;
  text-align: center;
}
.t-cont-dynamic {
  text-align: center;
  margin: 10px auto;
  opacity: 0;
  font-size: 14px;
  letter-spacing: 0px;
  transition: linear all 0.2s;
}
.t-headline {
  margin-bottom: 5px;
  transition: linear all 0.2s;
  text-transform: uppercase;
  font-weight: 400;
  text-align: center;
  font-size: 23px;
  @include respond-width($w350){
    font-size: 20px;
  }
}
.t-tags{
  margin: 8px 0px 0px;
  font-size: 12px;
  font-weight: bold;
  .t-tag{
    display: inline-block;
    padding: 2px 5px;
  }
}
.t-desc {
  margin-top: 0px;
}


</style>
