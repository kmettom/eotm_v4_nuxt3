<template>
  <footer class="footer-wrapper">
    <div class="logo-wrapper">
      <NuxtLink to="/">
        <img class="logo" src="/assets/img/common/logo.svg" alt="logo" />
      </NuxtLink>

    </div>
    <div class="footer-left">
      <h4 class="footer-title">Info</h4>

      <div class="footer-link">
        <NuxtLink to="/">
          <span
              class="footer-txt"
              v-bind="{ 'data-cursorsize': 75, 'data-cursoropacity': 0.3 }"
          >Articles</span
          >
        </NuxtLink>

      </div>


      <div class="footer-link bottom">
        <NuxtLink to="/About">
          <span
              class="footer-txt"
              v-bind="{ 'data-cursorsize': 75, 'data-cursoropacity': 0.3 }"
          >About</span
          >
        </NuxtLink>
      </div>
    </div>

    <div class="footer-right">
      <div class="email-wrapper">
        <h4 class="footer-title">say hi</h4>
        <a class="email-link" href="mailto:hello@eotm.info" target
          >hello@eotm.info</a
        >
      </div>

      <div class="social-wrapper">
        <h4 class="footer-title">Follow</h4>
        <a href="https://www.facebook.com/eotm.info/" target="_blank" v-bind="{ 'data-cursorsize': 75, 'data-cursoropacity': 0.3 }" >
          <svg
            width="15"
            height="30"
            viewBox="0 0 15 30"
            fill="none"
          >
            <path
              d="M10.5525 5.92986H13.7307C13.9263 5.92986 14.1219 5.78317 14.1219 5.53869V0.600155C14.1219 0.40457 13.9752 0.208984 13.7307 0.208984H9.37894C7.2275 0.208984 5.61392 0.746845 4.4893 1.87146C3.46247 2.89829 2.97351 4.26738 2.97351 6.07655V9.59709H0.479794C0.284208 9.59709 0.088623 9.74378 0.088623 9.98826V14.7801C0.088623 14.9757 0.235312 15.1713 0.479794 15.1713H2.97351V28.9601C2.97351 29.1556 3.1202 29.3512 3.36468 29.3512H9.23225C9.42783 29.3512 9.62342 29.2045 9.62342 28.9601V15.1224H13.1929C13.3884 15.1224 13.5351 14.9757 13.5351 14.829C13.5351 14.829 13.9263 12.482 14.073 9.98826C14.073 9.89047 14.0241 9.79268 13.9752 9.69488C13.9263 9.59709 13.8285 9.59709 13.7307 9.59709H9.62342V6.7122C9.62342 6.41883 10.1124 5.92986 10.5525 5.92986ZM9.28115 10.3305H13.3395C13.1929 12.0908 12.9484 13.7533 12.8506 14.3889H9.23225C9.03666 14.3889 8.84108 14.5356 8.84108 14.7801V28.6178H3.75585V14.7801C3.75585 14.5845 3.60916 14.3889 3.36468 14.3889H0.870966V10.3794H3.36468C3.56027 10.3794 3.75585 10.2327 3.75585 9.98826V6.07655V6.02765C3.75585 4.46297 4.19592 3.28946 5.02716 2.40932C6.00509 1.43139 7.47198 0.94243 9.37894 0.94243H13.3884V5.19642H10.5525C9.77011 5.19642 8.88997 5.97876 8.88997 6.7122V9.98826C8.88997 10.1838 9.08556 10.3305 9.28115 10.3305Z"
            />
          </svg>
        </a>
        <a href="https://www.instagram.com/eotm.info/" target="_blank" v-bind="{ 'data-cursorsize': 75, 'data-cursoropacity': 0.3 }">
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
          >
            <path
              d="M16.2627 0.694824H4.81956C2.4791 0.694824 0.573242 2.60068 0.573242 4.94114V16.1052C0.573242 18.4456 2.4791 20.3515 4.81956 20.3515H16.2627C18.6031 20.3515 20.509 18.4456 20.509 16.1052V4.94114C20.509 2.60068 18.6031 0.694824 16.2627 0.694824ZM19.7116 16.1052C19.7116 18.007 18.1646 19.554 16.2627 19.554H4.81956C2.91769 19.554 1.37067 18.007 1.37067 16.1052V4.94114C1.37067 3.03927 2.91769 1.49225 4.81956 1.49225H16.2627C18.1646 1.49225 19.7116 3.03927 19.7116 4.94114V16.1052Z"
            />
            <path
              d="M10.5412 5.61922C7.83787 5.61922 5.63696 7.82013 5.63696 10.5234C5.63696 13.2267 7.83787 15.4276 10.5412 15.4276C13.2444 15.4276 15.4454 13.2267 15.4454 10.5234C15.4454 7.82013 13.2444 5.61922 10.5412 5.61922ZM10.5412 14.6302C8.27646 14.6302 6.43439 12.7881 6.43439 10.5234C6.43439 8.25872 8.27646 6.41665 10.5412 6.41665C12.8059 6.41665 14.6479 8.25872 14.6479 10.5234C14.6479 12.7881 12.8059 14.6302 10.5412 14.6302ZM16.3504 3.58179C15.6009 3.58179 14.9908 4.19182 14.9908 4.94141C14.9908 5.69099 15.6009 6.30102 16.3504 6.30102C17.1 6.30102 17.7101 5.69099 17.7101 4.94141C17.7101 4.19182 17.1 3.58179 16.3504 3.58179ZM16.3504 5.50359C16.0394 5.50359 15.7882 5.2524 15.7882 4.94141C15.7882 4.63041 16.0394 4.37922 16.3504 4.37922C16.6614 4.37922 16.9126 4.63041 16.9126 4.94141C16.9126 5.2524 16.6614 5.50359 16.3504 5.50359Z"
            />
          </svg>
        </a>
        <!-- <a href="#" target="_blank">
          <svg
            width="25"
            height="19"
            viewBox="0 0 25 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.90386 0.780273C1.83534 0.780273 0.959961 1.65571 0.959961 2.72417V16.3315C0.959961 17.4 1.83534 18.2754 2.90386 18.2754H22.3429C23.4114 18.2754 24.2868 17.4 24.2868 16.3315V2.72417C24.2868 1.65571 23.4114 0.780273 22.3429 0.780273H2.90386ZM2.90386 1.75222H22.3429C22.8897 1.75222 23.3148 2.17735 23.3148 2.72417V16.3315C23.3148 16.8784 22.8897 17.3034 22.3429 17.3034H2.90386C2.35698 17.3034 1.93191 16.8784 1.93191 16.3315V2.72417C1.93191 2.17735 2.35698 1.75222 2.90386 1.75222ZM9.20825 4.66997C9.08201 4.67344 8.96207 4.7259 8.87384 4.81626C8.78562 4.90661 8.73602 5.02776 8.73556 5.15405V13.9016C8.73545 13.9888 8.75882 14.0745 8.80323 14.1496C8.84763 14.2247 8.91144 14.2865 8.98794 14.3284C9.06445 14.3704 9.15083 14.3909 9.23802 14.388C9.32522 14.385 9.41001 14.3587 9.48351 14.3116L16.2872 9.93787C16.3557 9.89388 16.4121 9.83337 16.4512 9.76188C16.4903 9.6904 16.5108 9.61024 16.5108 9.52877C16.5108 9.44731 16.4903 9.36715 16.4512 9.29567C16.4121 9.22418 16.3557 9.16367 16.2872 9.11968L9.48351 4.74591C9.40143 4.6936 9.30553 4.66715 9.20825 4.66997ZM9.70751 6.04437L15.1273 9.52972L9.70751 13.0132V6.04437Z"
              fill="white"
            />
          </svg>
        </a> -->
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      // activeMenu: this.$route.name,
    };
  },
  created: function () {},
  methods: {},
  watch: {
    // $route(to, from) {
    //   this.activeMenu = to.name;
    // },
  },
};
</script>

<style scoped lang="scss" >
.footer-wrapper {
  border-top: 2px solid $white;
  position: relative;
  width: 85%;
  max-width: 1500px;
  padding: 62px 0px 7vh;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  @include respond-width($w550){
    padding: 25px 0px 7vh 0px;
    padding-left: 20px;
    width: 95%;
  }
  .footer-title {
    transition: ease all 0.3s;
    @include font-title;
    padding-bottom: 6vh;
    @include respond-width($w768) {
      padding-bottom: 2vh;
    }
  }

  .footer-link {
    padding-bottom: 14px;

    &.bottom {
      @include respond-width($w991) {
      padding-bottom: 0vh;
    }
    }

    a {
      text-decoration: none;
    }

    a:hover {
      .footer-txt {
        color: $green;
      }
    }
  }

  .footer-txt,
  .email-link {
    transition: ease all 0.3s;
    @include font-description;
  }

  @include respond-width($w768) {
    flex-direction: column;
  }
}

//
.footer-right {
  @include respond-width($w768) {
    padding-top: 6vh;
  }
}
.logo-wrapper {
  margin-left: -12px;
  img {
    max-height: 100%;
    width: 27vmax;
    position: relative;
    @include respond-width($w550){
      bottom: 0px;
      right: 15px;
      width: 50%;
    }
  }
    @include respond-width($w768) {
      padding-bottom: 6vh;
  }
}

.email-wrapper {
  .email-link {
    display: block;
    padding-bottom: 6vh;
    text-decoration: none;
  }
}
.social-wrapper {
  p {
    padding-bottom: 23px;
  }
  a {
    display: inline-block;
    color: $white;
    text-decoration: none;
    text-transform: uppercase;
    padding: 5px 15px 15px 0px;
    margin-right: 70px;
    @include respond-width($w550) {
       margin-right: 39px;
     }
    &:hover{
      svg path{
        fill: $green;
      }
    }
    svg path{
      transition: ease all 0.3s;
      fill: $white;
    }
  }
}
</style>
