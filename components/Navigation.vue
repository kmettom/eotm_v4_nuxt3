<template>
  <header
    class="nav-wrapper"
    :class="{ 'search-menu': menuState.type == 'search' }"
  >
    <Transition name="menu">
      <app-menu
        v-show="menuState.active && menuState.type === 'basic'"
        :menustate="menuState"
      ></app-menu>
    </Transition>

    <Transition name="logo">
      <div class="logo-wrapper" v-show="menuState.type !== 'search'">
<!--         <router-link :to="{ name: 'Home' }">-->
          <img class="logo" src="/assets/img/common/logo_sm.svg" alt="logo" v-bind="{ 'data-cursorsize': 75, 'data-cursoropacity': 0.3 }" />
<!--         </router-link>-->
      </div>
    </Transition>

    <div class="menu-button-wrapper">
      <Transition name="searchtxt">
        <span
          id="searchBtn"
          class="search-btn-wrapper"
          v-show="!menuState.active"
          @click="basicMenuToggle('search')"
          v-bind="{ 'data-cursorsize': 75, 'data-cursoropacity': 0.3 }"
        >
          <span class="menu-txt">Search</span>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.85509 5.79931C9.85509 8.19644 7.91184 10.1397 5.5147 10.1397C3.11757 10.1397 1.17432 8.19644 1.17432 5.79931C1.17432 3.40218 3.11757 1.45892 5.5147 1.45892C7.91184 1.45892 9.85509 3.40218 9.85509 5.79931ZM9.08821 9.76797C8.14183 10.6207 6.88888 11.1397 5.5147 11.1397C2.56529 11.1397 0.174316 8.74873 0.174316 5.79931C0.174316 2.8499 2.56529 0.458923 5.5147 0.458923C8.46412 0.458923 10.8551 2.8499 10.8551 5.79931C10.8551 7.01421 10.4494 8.13436 9.76613 9.03168L14.7836 14.0492L14.0765 14.7563L9.08821 9.76797Z"
              fill="#3EC28F"
            />
          </svg>
        </span>
      </Transition>

      <span
        id="menuBtn"
        v-bind:class="{ 'close-btn': menuState.active }"
        class="menu-btn-wrapper"
        @click="basicMenuToggle('basic')"
        v-bind="{ 'data-cursorsize': 75, 'data-cursoropacity': 0.3 }"
      >

        <span class="menu-txt" v-show="!menuState.active">Menu</span>
        <span class="menu-txt" v-show="menuState.active" >Close</span>

        <svg
          width="20"
          height="20"
          viewBox="0 0 20 10"
          fill="none"
          aria-labelledby="menuTitle menuDesc"
          role="img"
          v-bind:class="{ 'menu-icon': menuState.active }"
        >
          <title id="menuTitle">menu icon</title>
          <desc id="menuDesc">click the icon to open the menu</desc>
          <path
            class="line-one"
            d="M0.351318 1.04846H22.9998"
            stroke="#3EC28F"
          />
          <path
            class="line-two"
            d="M0.351318 8.95898H22.9998"
            stroke="#3EC28F"
          />
        </svg>
      </span>
    </div>

    <Transition name="searchmenu">
      <search-menu v-show="menuState.type === 'search'"></search-menu>
    </Transition>
  </header>
</template>

<script>
import appMenu from "./menu/Menu.vue";
import searchMenu from "./menu/searchMenu.vue";

export default {
  name: "Navigation",
  components: {
    appMenu,
    searchMenu,
  },
  data() {
    return {
      menuState: { active: false, type: null },
      contentExtraMargin: false,
    };
  },
  created: function () {},
  methods: {
    basicMenuToggle(_type) {
      let menuCloseTimeout =  0;
      if(this.$route.name == "Search" && this.menuState.active ){
        menuCloseTimeout =  350;
        this.$router.push({ name: 'Home'});
      }
      setTimeout(() => { // set timeout to ease the animations if cancelling search
        this.menuState.active = !this.menuState.active;
        if(this.menuState.type == "search"){
          this.$emit('searchMenuState', this.menuState.active);
        }

        if (_type === "basic") {
          this.menuState.type = this.menuState.active ? "basic" : "null";
          this.$store.commit("noScrollState", this.menuState.active);
        } else {
          this.menuState.type = "search";
          this.menuState.active = true;
          this.$emit('searchMenuState', true);
        }



      }, menuCloseTimeout);
    },
    closeSearchFromState(){ //resets navigation to closed when state was changed
      this.menuState.active = false;
      this.$store.commit("noScrollState", false);
      this.menuState.type = null;
      this.$emit('searchMenuState', false);
    }
  },
  watch: {
    $route(to, from) {
      if ( ( from.query.tags || from.name !== "Search" ) && to.name !== "Search" && ( !from.query.tags) ) {
        this.closeSearchFromState();
      }
      if( from.name == "Search" && to.name == "Article"){
        this.closeSearchFromState();
      }
    },

  },
};
</script>


<style scoped lang="scss" >

.nav-wrapper {
  position: fixed;
  top: 0px;
  right: 0px;
  left: 0px;
  z-index: 33;
  height: 9vh;
  min-height: 30px;
  width: 85%;
  max-width: 1500px;
  margin: 0 auto;
  padding: 3.5vh 0;
  @include respond-width($w550){
    width: 95%;
  }
  &.search-menu {
    &:before {
      height: 500px;
      @include respond-width($w550){
        height: 50vh;
        background: linear-gradient(
          to bottom,
           $grey-d,
           rgba(40, 40, 40, 0.9) ,
          rgba(40, 40, 40, 0)
        );
      }
    }
  }
  &:after,
  &:before {
    transition: ease all 0.3s;
    pointer-events: none;
    content: "";
    width: 100vw;
    height: 150px;
    position: fixed;
    top: 0px;
    right: 0px;
    left: 0px;
    margin: 0 auto;
    background: linear-gradient(
      to bottom,
      $grey-d,
      rgba(20, 20, 20, 1),
      rgba(20, 20, 20, 0.9),
      rgba(0, 0, 0, 0)
    );
    // $grey-d-trans,
    @include respond-width($w550){
      height: 85px;
      background: linear-gradient(
        to bottom,
         $grey-d,
         $grey-d,
         rgba(40, 40, 40, 0)
      );
    }
  }
  &:after {
    content: "";
    width: 100%;
    height: 1px;
    position: absolute;
    bottom: 0px;
    top: 100%;
    right: 0px;
    left: 0px;
    margin: 0 auto;
    background: $white;
  }

  @include respond-width($w550) {
    padding: 2vh 0;
  }
}

.logo-wrapper {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  left: 0px;
  text-align: left;
  // @include respond-width($w550) {
  // }
  img {
    max-height: 100%;
    width: 25vw;
    max-width: 55px;
    @include respond-width($w1370) {
      // max-width: 170px;
    }
    @include respond-width($w550) {
      // width: 35vw;
    }
  }
}

.menu-button-wrapper {
  right: 0px;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  z-index: 2;
  .menu-txt {
    padding: 10px 0px;
    @include font-navbar;
    display: inline-block;
    vertical-align: middle;

    @include respond-width($w550) {
      font-size: 0.8rem;
    }
  }
  .search-btn-wrapper {
    display: inline-block;
    margin-right: 8vmax;

    @include respond-width($w550) {
      margin-right: 2vmin;
    }
  }
  .menu-btn-wrapper {
    display: inline-block;
    text-align: right;

    &:hover {
      svg {
        .line {
          stroke-width: 3px;
        }
        .f,
        .t {
          transform: translate(5px, 0px);
        }
        .s {
          transform: translate(-5px, 0px);
        }
      }
    }
    &.close-btn,
    &.close-btn:hover {
      svg {
        .f {
          transform: translate(13px, 0px) rotate(45deg);
        }
        .s {
          transform: translate(-50px, 0px);
        }
        .t {
          transform: translate(-14px, 0px) rotate(-45deg);
        }
      }
    }

    svg{
      .line-one,
      .line-two{
        transition: 0.25s ease-in-out;
      }
    }
    .menu-icon {
      .line-one {
        transform-origin: 30% 25%;
        transform: rotate(45deg);
      }

      .line-two {
        transform-origin: 35% 80%;
        transform: rotate(-45deg);
      }
    }
  }
  svg {
    position: relative;
    overflow: hidden;
    display: inline-block;
    vertical-align: middle;
    .circle,
    .line {
      transition: ease all 0.2s;
      stroke-width: 2px;
      stroke: $green;
    }
  }
}

#searchBtn {
  z-index: 10;
  &:hover {
    .circle,
    .line {
      stroke-width: 3px;
    }
    .line {
      transform: translate(5px, 5px);
    }
  }
}

.menu-enter-active,
.menu-leave-active {
  transition: ease all 0.4s;
}
.menu-enter,
.menu-leave-to {
  opacity: 0;
}
.menu-enter-to,
.menu-leave {
  opacity: 1;
}

.logo-enter-active,
.logo-leave-active {
  transition: ease all 0.35s;
}
.logo-enter,
.logo-leave-to {
  opacity: 0;
}
.logo-enter-to,
.logo-leave {
  opacity: 1;
}

.searchtxt-enter-active,
.searchtxt-leave-active {
  transition: ease all 0.35s;
}
.searchtxt-enter,
.searchtxt-leave-to {
  transform: translate(50px, 0%);
  opacity: 0;
}
.searchtxt-enter-to,
.searchtxt-leave {
  transform: translate(0px, 0px);
  opacity: 1;
}

.searchmenu-enter,
.searchmenu-leave {
  transform: translate(0px, -50%);
  opacity: 1;
}
.searchmenu-enter-active,
.searchmenu-leave-active {
  transition: ease all 0.35s;
}
.searchmenu-enter,
.searchmenu-leave-to {
  transform: translate(-100px, -50%);
  opacity: 0;
}
</style>
