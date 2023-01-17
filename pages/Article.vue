<template>

  <article class="article-wrapper" v-if="artContent">
    <div class="buttons-wrapper" v-if="$store.state.isAdminMode">
      <div
        class="save-button btn"
        @click="$router.push({ name: 'AdminArticle' , params: { href: articleData.href }} )"
      >edit article</div>
      <div
        class="save-button btn"
        @click="$router.push({ name: 'AdminThumbs' } )"
      >thumbs admin</div>
    </div>

    <h1 class="article-title">{{artContent.title}}</h1>
    <h2 class="article-main-description">{{artContent.description}}</h2>

    <div class="knowledge-container" v-if="artContent.knowledge.length > 0">
      <div class="knowledge" v-for="(knowledgeItem, index) in artContent.knowledge" :key="index">
        <p class="section-description">{{knowledgeItem.description}}</p>
        <div class="knowledge--video" v-if="knowledgeItem.videoUrl">
          <div class="knowledge--video--overlay"
          @click="playVideo(knowledgeItem)"
          v-show="!knowledgeItem.videoUrl.includes('autoplay=1')"
          :data-cursorsize="$store.state.cursorHover.size"
          :data-cursoropacity="$store.state.cursorHover.opacity"
          >
            <button class="play-btn">
              <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
                <path class="play-btn-large" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00">
                  </path>
                  <path d="M 45,24 27,14 27,34" fill="#fff">
                    </path>
                    </svg>
            </button>
          </div>
          <iframe
            id="video"
            data-cursorsize="0"
            width="1215"
            height="670"
            :src="knowledgeItem.videoUrl"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>

        <div class="knowledge-picture" v-if="knowledgeItem.picture">
          <img class="knowledge-picture_img" :src="'/assets/galleries/' + articleData.href + '/' + knowledgeItem.picture" :alt="artContentTitle" v-imgloader />
        </div>
      </div>
    </div>

    <div class="pictures-container margin" v-if="artContent.gallery">
      <p  class="gallery-description section-description" v-if="artContent.gallery.description ">{{artContent.gallery.description}}</p>

      <!-- <div class="main-picture" v-if="artContent.gallery.mainPicture"   >
        <img class="main-picture_img" :alt="artContentTitle"  :data-cursorsize="$store.state.cursorHover.size"  :data-cursoropacity="$store.state.cursorHover.opacity" :src="'/assets/galleries/' + articleData.href + '/' + artContent.gallery.pictures[0][0]" @click="openGallery(0)" v-imgloader:gallery.webgl="meshIdMainImg" />
      </div> -->

      <div class="pictures" v-if="artContent.gallery.pictures.length > 0">
        <div
          class="picture"
          v-for="(picture, index) in artContent.gallery.pictures"
          :key="index"
          @click="openGallery(index)"
          :data-cursorsize="$store.state.cursorHover.size"
          :data-cursoropacity="$store.state.cursorHover.opacity"
        >
        <!-- v-if="index != 0" -->
        <!-- v-if="!artContent.gallery.mainPicture || index != 0" -->

          <img class="picture_img" :alt="artContentTitle" v-if="!isMobile" :data-cursorsize="$store.state.cursorHover.size" :data-cursoropacity="$store.state.cursorHover.opacity" :src="'/assets/galleries/' + articleData.href + '/' + picture[1]"  v-imgloader:gallery.webgl="meshIdGallery + '_' + index"  />
          <img class="picture_img" :alt="artContentTitle" v-else :src="'/assets/galleries/' + articleData.href + '/' + picture[0]" v-imgloader />

        </div>
      </div>
    </div>

    <div class="related-articles">

      <h3 class="related-title">Related:</h3>
      <div class="next-article-arrows" v-if="articleData.relatedArticles" v-bind="{ 'data-cursorsize': 75, 'data-cursoropacity': 0.3 }">
        <span   class="article-link next-article-arrows_left"  :data-cursorsize="$store.state.cursorHover.size"   :data-cursoropacity="$store.state.cursorHover.opacity" @click="goToRelatedArticle(articleData.relatedArticles.prev)" v-if="articleData.relatedArticles.prev">
          <svg width="35" height="15" fill="none" viewBox="0 0 39 28"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.172 14.92l11.173 11.173-1.168 1.169-12-12-.009.01L0 14.104l.01-.01-.01-.01 1.168-1.168.01.01 11.999-12 1.168 1.169L3.172 13.268h35.335v1.652H3.172z" fill="#3EC28F"/></svg>
          {{articleData.relatedArticles.prev.title}}
        </span>

        <span  class="article-link next-article-arrows_right"  :data-cursorsize="$store.state.cursorHover.size" :data-cursoropacity="$store.state.cursorHover.opacity" @click="goToRelatedArticle(articleData.relatedArticles.next)" v-if="articleData.relatedArticles.next">
          <svg width="35" height="15" viewBox="0 0 39 28" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M35.8085 13.268L24.6352 2.09474L25.8035 0.926461L37.8028 12.9257L37.8125 12.9161L38.9807 14.0844L38.9711 14.094L38.9807 14.1037L37.8125 15.272L37.8028 15.2623L25.8035 27.2616L24.6352 26.0933L35.8083 14.9202L0.473144 14.9202L0.473144 13.268L35.8085 13.268Z" fill="#3EC28F"/></svg>
          {{articleData.relatedArticles.next.title}}
        </span>
      </div>
    </div>

    <div class="choose-other-container" v-if="articleData.tags.length > 0">
      <h3 class="choose-other-title">Check other from:</h3>
      <div class="choose-tags">
        <span
        class="tag-link"
        v-for="tag in articleData.tags"
        :key="tag.id"
        :data-cursorsize="$store.state.cursorHover.size"
        :data-cursoropacity="$store.state.cursorHover.opacity"
        @click="tagLink(tag)"
        >#{{tag}}</span>
      </div>
    </div>

    <div class="sources-container" v-if="artContent.sources && artContent.sources.length > 0">
      <h3 class="sources-container_title">Source:</h3>
      <div class="source" v-for="(source, index) in artContent.sources" :key="index">
        <a class="source_link" v-bind:href="source" target="_blank" v-bind="{ 'data-cursorsize': 75, 'data-cursoropacity': 0.3 }">{{showLink(source, '//', '/')}}</a>
      </div>
    </div>

  </article>

</template>

<script>
import { ArticleService } from "./ArticleService.js";
import { UserService } from "../admin/UserService.js";
import {gsap} from 'gsap';
// import {CanvasService}  from '../utilities/canvas/canvasService.js';
import {DisplayService} from '../utilities/displayService.js'

export default {
  name: "Article",
  props: ["href"],
  components: {
  },
  data() {
    return {
      articleData: null,
      artContent: null,
      artContentTitle: null,
      galleryOpen: false,
      currentGalleryPicture: null,
      adminLoggedIn: false,
      // knowledgeItem: [],
    };
  },
  computed: {
    isMobile(){
      return DisplayService.isMobile();
    },
    meshIdGallery(){
      return 'gallery' + this.articleData.href;
    },
    meshIdMainImg(){
      return 'gallerymain' + this.articleData.href;
    }
  },
  methods: {
    playVideo(_knowledgeItem) {
      if(!_knowledgeItem.videoUrl.includes("?autoplay=1")){
        _knowledgeItem.videoUrl += "?autoplay=1";
      }
    },
    goToRelatedArticle(_article){
      this.articleLeaveAni();
      setTimeout( () => {
        // gsap.fromTo( '.article-wrapper' , { opacity: 0 , y: '-25px' } , { duration: 1,  opacity: 1 , y: '0px'}  )
        this.$router.push({ name: 'Article', params: { href: _article.href }});
      } , 500);
    },
    articleEnterAni(){
        setTimeout( () => {
          gsap.fromTo( '.article-wrapper' , { opacity: 0 , y: '-25px' } , { duration: 1,  opacity: 1 , y: '0px'}  )
        } , 150);
    },
    articleLeaveAni(){
      gsap.fromTo( '.article-wrapper' , { opacity: 1 , y: '0px' } , { duration: 0.5,  opacity: 0 , y: '25px'}  )
    },
    getArticle() {
      ArticleService.getArticle(this.href).then((_data) => {
        this.articleData = _data;
        this.artContent = _data.content;
        this.artContentTitle = _data.content.title;
        this.articleEnterAni();
      });
    },
    showLink(_source, a, b) {
         //return _source.slice(0, 25);
         const indexStart = _source.indexOf(a) + a.length
         const indexEnd = _source.indexOf(b, indexStart)

         if(_source.includes('www')) {
           return _source.substring(indexStart, indexEnd)
         } else {
           return _source.split('.').slice(0, 2).join('.')
         }

    },
    openGallery(_index) {
      if(DisplayService.isMobile()) return;
      this.$store.commit('gallery' , { articleHref: this.articleData.href, picIndex: _index , pictures: this.artContent.gallery.pictures } );
    },
    tagLink(_tag) {
      this.$router.push({
        name: "Search",
        query: { tags: [_tag] },
      });
    },
  },
  mounted() {
    this.getArticle();
  },
  watch: {
    $route(to, from) {
      if( to.name == "Article"){
        this.getArticle();
      }
    },

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" >

.article-wrapper {
  @include article-wrapper;

  .buttons-wrapper {
    position: absolute;
    top: 0px;
    right: 0px;
  }
  .btn {
    padding: 5px;
    &:hover {
      color: $green;
    }
  }
}

.article-title {
  @include font-title;
  margin: 0px;
  padding: 0px;
}

.article-main-description {
  @include font-subtitle;
  max-width: 61vw;
  padding: 20px 0px 51px 0px;
     @include respond-width($w768) {
     max-width: 100%;
  }
}

.section-description {
  @include font-description;
  max-width: 78%;
  margin: 100px 0 51px;
      @include respond-width($w768) {
        max-width: 100%;
        margin: 51px 0;
  }
}

.knowledge-container {
  &.container-margin {
    margin-bottom: 100px;
  }

  .knowledge {

    &--video {
      position: relative;
      padding-bottom: 56.25%; /* 16:9 */
      height: 0;

      &:hover .play-btn-large {
        fill: $green;
        fill-opacity: 1;
      }

      &--overlay, iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      &--overlay {
        background: $black-trans-d;
        z-index: 20;
      }
    }


    .play-btn {
      border: none;
      background-color: transparent;
      padding: 0;
      outline: 0;
      position: absolute;
      left: 50%;
      top: 50%;
      width: 74px;
      height: 54px;
      margin-left: -36px;
      margin-top: -26px;
      -webkit-transition: opacity .25s cubic-bezier(0,0,0.2,1);
      transition: opacity .25s cubic-bezier(0,0,0.2,1);
      z-index: 63;
      cursor: pointer;

      &-large {
        transition: fill .1s cubic-bezier(0.4,0,1,1),fill-opacity .1s cubic-bezier(0.4,0,1,1);
        fill: #212121;
        fill-opacity: .8;
      }

      svg {
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
      }
    }
  }
}

.knowledge-picture,
.main-picture {
  margin: 0px auto 51px;
  display: inline-block;
  overflow: hidden;
  @include respond-width($w550){
    margin: 5px auto;
  }
  &_img {
    max-width: 100%;
    max-height: 70vh;
    // transition: all 0.5s ease;
  }
}

.pictures-container{
  margin-top: 10vh;
  @include respond-width($w550){
    margin-top: 3vh;
  }
  .gallery-description{
      margin-bottom: 25px;
  }
}

.pictures {
  display: flex;
  flex-flow: wrap;
  justify-content: left;
  @include respond-width($w550){
    justify-content: center;
  }

  .picture {
    overflow: hidden;
    flex: 0 0 auto;
    margin: 0px 25px 25px 0px;
    text-align: center;
    @include respond-width($w550){
      margin: 0px 0px 0px 0px;
      width: 100%;
    }

    &_img {
      height: 175px;
      @include respond-width($w550){
        height: 225px;
        max-width: 100%;
        margin: 5px auto;
      }
    }
  }
}

.sources-container {
  margin-top: 81px;

  &_title {
    @include font-title;
    margin: 0px;
    padding: 0px;
  }

  .source {
    padding-top: 21px;
    @include respond-width($w550){
      padding-top: 10px;
    }
    &_link {
      @include font-description;
      @include  word-wrap;
      text-decoration: none;
      &:hover {
        color: $green;
      }
    }
  }
}

.related-articles{
  .related-title{
    @include font-title;
  }
}

.next-article-arrows {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  text-transform: uppercase;
  @include respond-width($w550){
    // margin-top: 15px;
    display: block;
  }
  &:hover {
    color: $green;
  }

  @include respond-width($w991) {
    letter-spacing: 0.15em;
    font-size: 14px;
  }

  .article-link {
    @include respond-width($w550){
      margin-bottom: 15px;
    }
  }

  &_left {
    @include respond-width($w768) {
      display: flex;
      flex-direction: column;
    }
    @include respond-width($w550){
      display: block;
    }
  }

  &_right {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    @include respond-width($w768) {
      display: flex;
      flex-direction: column;
      text-align: end;
    }
    @include respond-width($w550){
      text-align: start;
      display: block;
    }
  }

  svg{
    @include respond-width($w550){
      display: none;
    }
  }

}

.choose-other-container {
  margin: 20vh auto 0vh;
  @include respond-width($w991) {
    margin-top: 12vh;
  }

  .choose-other-title {
    @include font-title;
    padding-bottom: 20px;
    flex: 0 0 100%;
  }

  .choose-tags{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    position: relative;
    @include respond-width($w550){
      display: block;
    }
  }

  .tag-link {
    @include font-description;
    text-decoration: none;
    display: inline-block;
    padding-bottom: 1vh;
    flex: 0 0 20vh;
    @include respond-width($w550){
      flex: none;
      width: auto;
      padding: 5px 20px 5px 0px;
    }
    &:hover {
      color: $green;
    }
  }

  .tag-link:last-child {
    padding-right: 0px;
  }
}
</style>
