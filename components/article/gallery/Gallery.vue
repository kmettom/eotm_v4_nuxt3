<template>
  <div class id="galleryOverlay" >

    <div class="gallery-close" @click="closeGallery"
    :data-cursorsize="$store.state.cursorHover.size"
    :data-cursoropacity="$store.state.cursorHover.opacity">
      <span
      :data-cursorsize="$store.state.cursorHover.size"
      :data-cursoropacity="$store.state.cursorHover.opacity">close</span>
      <svg
        width="17"
        height="18"
        viewBox="0 0 17 18"
        fill="none"
        :data-cursorsize="$store.state.cursorHover.size"
        :data-cursoropacity="$store.state.cursorHover.opacity"
      >
        <path
          class="line"
          d="M8.63887 9.82851L16.2928 17.4824L16.9999 16.7753L9.34598 9.1214L16.9998 1.46753L16.2927 0.760422L8.63887 8.41429L0.984985 0.760406L0.277879 1.46751L7.93176 9.1214L0.277832 16.7753L0.984939 17.4824L8.63887 9.82851Z"
          :data-cursorsize="$store.state.cursorHover.size"
          :data-cursoropacity="$store.state.cursorHover.opacity"
        />
      </svg>
    </div>

    <div class="gallery-picture-container" v-if="imageActive && meshId && galleryImageSrc"  >
        <img v-if="imageActive" :src="galleryImageSrc" alt v-imgloader:imagegallery.webgl="meshId" />
    </div>


    <div class="gallery-btn-holder">
      <div    class="gallery-btn next"      @click="pictureChange(1)"      :data-cursorsize="$store.state.cursorHover.size"      :data-cursoropacity="$store.state.cursorHover.opacity"      >
      <svg      width="39"      height="28"      viewBox="0 0 39 28"      fill="none"      :data-cursorsize="$store.state.cursorHover.size"      :data-cursoropacity="$store.state.cursorHover.opacity"      >
      <path
      d="M35.809 13.268L24.635 2.095 25.803.926l12 12 .01-.01 1.168 1.168-.01.01.01.01-1.169 1.168-.01-.01-11.998 12-1.169-1.169L35.808 14.92H.473v-1.652H35.81z"
      :data-cursorsize="$store.state.cursorHover.size"
      :data-cursoropacity="$store.state.cursorHover.opacity"
      fill="#3EC28F"
      />
    </svg>

    <svg
    viewBox="0 0 39 28"
    width="39"
    height="28"
    fill="none"
    :data-cursorsize="$store.state.cursorHover.size"
    :data-cursoropacity="$store.state.cursorHover.opacity"
    >
    <path
    d="M12.009 14.09L-.001 2.101 1.166.932l12.01 11.988 1.169 1.167-1.167 1.17L1.19 27.266.021 26.1 12.01 14.09z"
    fill="#3ec28f"
    />
  </svg>
</div>

<div
class="gallery-btn prev"
@click="pictureChange(-1)"
:data-cursorsize="$store.state.cursorHover.size"
:data-cursoropacity="$store.state.cursorHover.opacity"
>
<svg width="39" height="28" fill="none"
:data-cursorsize="$store.state.cursorHover.size"
:data-cursoropacity="$store.state.cursorHover.opacity">
<path
fill-rule="evenodd"
clip-rule="evenodd"
d="M3.172 14.92l11.173 11.173-1.168 1.169-12-12-.009.01L0 14.104l.01-.01-.01-.01 1.168-1.168.01.01 11.999-12 1.168 1.169L3.172 13.268h35.335v1.652H3.172z"
:data-cursorsize="$store.state.cursorHover.size"
:data-cursoropacity="$store.state.cursorHover.opacity"
fill="#3EC28F"
/>
</svg>

<svg viewBox="0 0 39 28" width="39" height="28">
  <path
  d="M2.346 14.094l11.999 11.999-1.168 1.169-12-12L.01 14.094l1.168-1.168 11.999-12 1.168 1.169L2.346 14.094z"
  fill="#3ec28f"
  />
</svg>
</div>

    </div>

  </div>

</template>

<script>

import {gsap} from 'gsap';
// import {CanvasService}  from '../../utilities/canvas/canvasService.js';
export default {
  name: "Gallery",
  props: [],
  data() {
    return {
      currentPicIndex: 0,
      lastImageVector: null,
      pictureChangeTime: 0.3, // in seconds
      galleryMeshListener: null,
      imageActive: false,
    };
  },
  computed: {
    meshId(){
      if(!this.imageActive) return false;
      return "imagegallery" + this.$store.state.gallery.articleHref + this.currentPicIndex;
    },
    galleryImageSrc(){
      if(!this.imageActive) return false;
      if(!this.$store.state.gallery.pictures[this.currentPicIndex]) return false;
      return '/assets/galleries/' + this.$store.state.gallery.articleHref + '/' + this.$store.state.gallery.pictures[this.currentPicIndex][0] ;
    },
  },
  methods: {
    closeGallery() {
      gsap.to( '#galleryOverlay' , 0.3 , { opacity: 0});
      gsap.fromTo( '.gallery-picture' , { opacity: 1 , x: '0px'} , { delay: 0, duration: 0.3, scale: 0.9, opacity: 0, x: '-150px'});
      // const closeImage = CanvasService.scene.getObjectByName(this.meshId);
      if(!closeImage) return;
      gsap.to( closeImage.material.uniforms.aniIn , {
        duration: 0.3,
        value: 0,
        onComplete: () => {
          // CanvasService.removeImageMesh( "imagegallery" , closeImage.name );
          this.imageActive = false;
        }
      })
      setTimeout(()=>{
        this.$store.commit("gallery" , false );
      }, 300);
    },
    pictureChange(_vector , _index) {

      // const oldImage = CanvasService.scene.getObjectByName(this.meshId);

      if(!oldImage) return;

      gsap.to( oldImage.material.uniforms.aniIn , {
        duration: this.pictureChangeTime,
        value:0,
        onComplete: () => {

          // CanvasService.removeImageMesh( "imagegallery" , oldImage.name );

          if (this.currentPicIndex === 0 && _vector == -1) {
            this.currentPicIndex = this.$store.state.gallery.pictures.length - 1;
          } else if ( this.currentPicIndex >= this.$store.state.gallery.pictures.length - 1 &&  _vector == 1 ) {
            this.currentPicIndex = 0;
          } else if ( !_vector && _index ) {
            this.currentPicIndex = Number(_index);
          } else {
            this.currentPicIndex = this.currentPicIndex + _vector;
          }

          this.$store.state.gallery.picIndex = this.currentPicIndex;
          this.imageActive = true;
          // CanvasService.scrollToMesh( "gallery" + this.$store.state.gallery.articleHref + '_' + this.currentPicIndex );

        }
      })

      this.imageActive = false;

    },
    keyEventEnable(enable) {
      if (enable) {
        window.addEventListener("keyup", this.keyEventAction);
        window.addEventListener('click', this.galleryMeshClick);
      } else {
        window.removeEventListener("click", this.galleryMeshClick, true);
        window.removeEventListener("keyup", this.keyEventAction, true);
      }
    },
    keyEventAction(e) {
      if (e.key === "Escape") {
        this.closeGallery();
      } else if (e.key === "ArrowLeft") {
        this.pictureChange(-1);
      } else if (e.key === "ArrowRight") {
        this.pictureChange(1);
      }
    },
    galleryMeshClick(){
      // if(CanvasService.pointer.intersects.length > 0){
      //   let galleryData = CanvasService.pointer.intersects[0].object.name.split("_");
        this.pictureChange(null , galleryData[1] )
      // }
    },
  },

  mounted() {
    this.currentPicIndex = this.$store.state.gallery.picIndex;
    this.imageActive = true;

    this.keyEventEnable(true);
    gsap.to( '#galleryOverlay' , 0.2 , { opacity: 1});

    gsap.fromTo( '.gallery-btn.prev' , { opacity: 0 , x: '10px'} , { delay: 0.4, duration: 0.3, opacity: 1, x: '0px'});
    gsap.fromTo( '.gallery-btn.next' , { opacity: 0 , x: '-10px'} , { delay: 0.4, duration: 0.3 , opacity: 1, x: '0px'});
    gsap.fromTo( '.gallery-close' , { opacity: 0 , y: '-10px'} , { delay: 0.4, duration: 0.3 , opacity: 1, y: '0px'});

  },
  beforeDestroy(){
    this.keyEventEnable(false);

  },
  watch: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" >
$sideImageWidth: 325px;
#galleryOverlay {
  opacity: 0;
  -webkit-transition: 0.35s ease all;
  transition: 0.35s ease all;
  bottom: 0px;
  left: 0;
  right: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
  z-index: 36;
  background: rgba(0, 0, 0, 0.75);
}
.gallery-picture-container{
  position: relative;
  position: absolute;
  top: 0%;
  right: 20px;
  left: 325px;
  bottom: 0px;
  margin: auto;
  max-width: calc(100% - #{$sideImageWidth});
  max-height: 80vh;
  text-align: center;
  img {
    margin: auto;
    max-width: 100%;
    max-height: 100%;
  }
}
.gallery-btn-holder{
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: calc(100% - #{$sideImageWidth});
}
.gallery-btn {
  position: absolute;
  bottom: 0px;
  padding: 15px;
  &.next {
    right: calc(50% - 100px);
    svg:nth-child(2) {
      left: 40px;
    }
    &:hover svg:nth-child(2) {
      left: 50px;
    }
  }
  &.prev {
    left: calc(50% - 100px);
    svg:nth-child(2) {
      right: 15px;
    }
    &:hover svg:nth-child(2) {
      right: 25px;
    }
  }
  svg {
    transition: ease all 0.2s;
    display: block;
    stroke: $green;
    stroke-width: 1px;
    &:nth-child(2) {
      top: 15px;
      position: absolute;
    }
  }
}

.gallery-close {
  position: absolute;
  padding: 10px;
  margin: 15px;
  top: 0px;
  right: 0px;
  &:hover {
    .line {
      stroke-width: 2px;
    }
  }

  span {
    @include font-title;
    font-size: 22px;
    color: $white;
  }

  svg {
    .line {
      transition: ease all 0.2s;
      stroke-width: 1px;
      stroke: $green;
    }

    .f {
      transform: translate(13px, 0px) rotate(45deg);
    }
    .t {
      transform: translate(-14px, 0px) rotate(-45deg);
    }
  }
}
</style>
