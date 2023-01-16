<template>
  <nav class="menu-bg-overlay">
    <div class="basic-menu-wrapper">
      <div class="basic-menu-link" :class="{'active' : activeMenu == 'Home'}">
<!--        <router-link :to="{ name: 'Home' }">-->
          <span class="menu-txt" v-bind="{ 'data-cursorsize': 75, 'data-cursoropacity': 0.3 }">Articles</span>
<!--        </router-link>-->
      </div>

      <!-- <div class="basic-menu-link" :class="{'active' : activeMenu == 'Shop'}">
        <router-link :to="{ name: 'Shop'}">
          <span class="menu-txt" v-bind="{ 'data-cursorsize': 75, 'data-cursoropacity': 0.3 }">shop</span>
        </router-link>
      </div> -->

      <div class="basic-menu-link" :class="{'active' : activeMenu == 'About'}">
<!--        <router-link :to="{ name: 'About'}">-->
          <span class="menu-txt" v-bind="{ 'data-cursorsize': 75, 'data-cursoropacity': 0.3 }">about</span>
<!--        </router-link>-->
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Menu",
  props: ["menustate"],
  components: {},
  data() {
    return {
      activeMenu: this.$route.name,
    };
  },
  created: function () {},
  methods: {},
  watch: {
    $route(to, from) {
      this.activeMenu = to.name;
    },
  },
};
</script>

<style scoped lang="scss" >

 .menu-bg-overlay {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  width: 100vw;
  height: 100vh;
  background: transparent;
  z-index: 0;
  &:before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    right: 0px;
    left: 0px;
    bottom: 0px;
    margin: 0 auto;
    filter: blur(1px);
    background-image: $bg-radient;
  }
}

.basic-menu-wrapper {
  position: absolute;
  top: 50%;
  transform: translate(0%, -50%);
  right: 0px;
  left: 0px;
  width: 100%;
  text-align: center;
}
.basic-menu-link {
  // cursor: pointer;
  margin: 7% auto;
  a:hover {
    .menu-txt {
      color: $green;
    }
  }
  &.active {
    pointer-events: none;
    .menu-txt {
      color: $green;
    }
    a {
      pointer-events: none;
    }
  }
  a {
    text-decoration: none;
  }
  .menu-txt {
    transition: ease all 0.3s;
    font-family: 'LatoLight', sans-serif;
    font-size: 50px;
    line-height: 60px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: $white;
     @include respond-width($w991) {
    font-size: 36px;
  }
  }
}
</style>
