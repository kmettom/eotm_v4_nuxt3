<template>
  <div class="search-menu-wrapper">
    <div class="search-query-wrapper">
      <input
        type="text"
        name
        value
        :placeholder="searchPlaceholder"
        v-model="searchWord"
      />
    </div>

    <div class="tags-wrapper">
      <div
        class="tag"
        v-for="tag in mainSearchTags"
        @click="markTag(tag)"
        :class="{'active' : tagsActive.includes(tag)}"
        >
        <span
        :data-cursorsize="$store.state.cursorHover.size"
        :data-cursoropacity="$store.state.cursorHover.opacity">#{{tag}}</span>
      </div>
    </div>
  </div>
</template>

<script>
// import { TagsService } from "../../article/TagsService.js";
// import { DisplayService } from '../../utilities/displayService.js';

export default {
  name: "SearchMenu",
  data() {
    return {
      tempActiveSearchTag: null,
      mainSearchTags: null,
      searchWord: null,
      tagsActive: [],
      searchIntervalActive: null,
      searchInterval: null,
      searchPlaceholder: DisplayService.isMobile() ? "Search" : 'Type a phrase or pick a tag',
    };
  },
  created: function () {},
  methods: {
    getTags() {
      this.mainSearchTags = [];
      TagsService.getTags().then((_data) => {
        for (var i = 0; i < _data.length; i++) {
          if (_data[i].mainSearchTag) this.mainSearchTags.push(_data[i].name);
        }
        this.setActiveTags(this.$route.query.tags);
      });
    },
    setActiveTags(_tags){
      if (!_tags) {
        this.tagsActive = [];
      } else if (typeof _tags == "string") {
        this.tagsActive.push(_tags);
      } else {
        this.tagsActive = _tags;
      }

      for (var i = 0; i < this.tagsActive.length; i++) {
        if( !this.mainSearchTags.includes( this.tagsActive[i] ) ) {
          this.mainSearchTags.push(this.tagsActive[i]);
        }
      }

    },
    markTag(_tag) {
      if (this.tagsActive.includes(_tag)) {
        this.tagsActive = this.tagsActive.filter((item) => item !== _tag);
      } else {
        this.tagsActive.push(_tag);
      }
      this.updateSearchParams();
    },
    updateSearchParams() {
      if (this.tagsActive.length == 0) {
        if (!this.searchWord) {
          this.$router.push({ name: "Home" });
        } else {
          this.$router.push({
            name: "Search",
            params: { searchword: this.searchWord },
          });
        }
      } else {
        this.$router.push({
          name: "Search",
          params: { searchword: this.searchWord },
          query: { tags: this.tagsActive },
        });
      }
    },
    searchIntervalSet() {
      let intCounterr = 0;
      this.searchInterval = setInterval(
        function () {
          intCounterr += 200;
          if (intCounterr > 400) {
            clearInterval(this.searchInterval);
            this.searchIntervalActive = false;
            this.updateSearchParams();
          }
        }.bind(this),
        200
      );
    },
  },
  watch: {
    searchWord(newVal , oldVal) {

      if(typeof newVal == 'string' && newVal.length == 0) this.searchWord = null; // fix for backend, if there is '' string, backend gets error // test after backend fixed

      if (newVal === undefined || oldVal === undefined) {
        return;
      }

      if (this.searchInterval && this.searchIntervalActive) {
        clearInterval(this.searchInterval);
        this.searchIntervalActive = false;
      }
      this.searchIntervalActive = true;
      this.searchIntervalSet();
    },
    $route(to, from) {
      if ( from.name == "Article" && to.name == "Search" && to.query.tags ) {
        this.setActiveTags(to.query.tags);
      }
      else if( to.name != "Search" && to.name != "Article"  ){
        this.tagsActive = [];
        this.tempActiveSearchTag = null;
        this.searchWord = null;
      }

    },
  },
  mounted() {
    this.getTags();
    this.searchWord = this.$route.params.searchword;
  },
};
</script>

<style scoped >
/* lang="scss"  */
/* .search-menu-wrapper {
  position: absolute;
  left: 0px;
  width: 100%;
  z-index: 1;
  top: 50%;
  transform: translate(0, -50%);
}

.search-query-wrapper {
  transition: ease all 0.3s;
  z-index: 1;
  padding-left: 0px;
  padding-bottom: 0px;
  width: 80%;
  input {
    height: 40px;
    background: transparent;
    width: 100%;
    border: none;
    box-shadow: none;
    outline: none;
    font-size: 22px;
    line-height: 26px;
    color: $grey-l;
    @include respond-width($w550){
      font-size: 16px;
    }
  }
}

$tagLeftMargin: 4vw;
.tags-wrapper {
  position: absolute;
  z-index: 5;
  left: -$tagLeftMargin;
  bottom: -83px;
  height: 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  @include respond-width($w550){
    bottom: -20px;
  };
}
.tag {
  font-size: 22px;
  color: $grey-l;
  line-height: 26px;
  margin: 0px 0px 28px $tagLeftMargin;
  display: inline-block;
  @include respond-width($w550){
    font-size: 16px;
    line-height: 18px;
    margin: 0px 12px 14px 4vw;
  };
  &:hover{
    color: $green;
  }
  &.active {
    text-decoration: underline;
    color: $green;
  }
} */
</style>
