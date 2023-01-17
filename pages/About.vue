<template>
  <div class="article-wrapper">
    <section class="about">
      <h1 class="about-title">About</h1>
      <h2 class="about-header">Equations Of The Matrix is a platform for sharing knowledge, inspirations and art projects.</h2>
      <p>
        The purpose of EOTM.info is to help One recognize the inner strength, accept One's individuality and find the connection to the world around us.
      </p>
      <p>
        Our goal is to share documentaries, lectures, interviews and create new art projects. Inspirations are gathered from the field of geometry, symbolism, philosophy, physics, self knowledge, biology, alchemy or ancient cultures.
      </p>
    </section>

    <div class="about-img-wrapper">
      <img class="about-img" src="/assets/img/about-image.png" alt v-imgloader />
    </div>


    <section class="contact">
      <h1 class="about-title">Contact</h1>
      <h2 class="about-header">
        Don't hesitate to send us interesting links to share, lectures, films, documentaries, artists, paintings or graphics to share
      </h2>
      <p>
        For all inquires please send email to:
        <a href="mailto:hello@eotm.info" class="contact-email" target="_blank"  :data-cursorsize="$store.state.cursorHover.size" :data-cursoropacity="$store.state.cursorHover.opacity" >hello@eotm.info</a>
        or contact us on our social media.
      </p>
    </section>
  </div>


  <!-- <p>
  70% of profit is going to these organizations.
  <br>
  https://billionsinchange.com/film/
  hans foundation
  savori institute
  hearth math institute
</p> -->

<!-- <article class="support">
<h1 class="about-title">Support</h1>
<h2 class="about-header">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h2>
<p>You can also support our goals with</p>
<div class="wallets-wrapper">
<div class="wallet">
<p>Ethereum</p>
<p>0xB86c349A4C861A0730DE632E0e449B3E54350a83</p>
<img src="/assets/img/common/eth.png" alt  @load="$store.commit('scrollupdateheight')" />
</div>
<div class="wallet">
<p>Bitcoin</p>
<p>1BZPXVjFkWBLBSMWkFF8dexyZ3yhApFLjF</p>
<img src="/assets/img/common/bitcoin.png" alt  @load="$store.commit('scrollupdateheight')" />
</div>
</div>
</article> -->

</template>

<script>

import {gsap} from 'gsap';

export default {
  name: "About",
  data() {
    return {};
  },
  created: function () {},
  methods: {
    copyCryptoAddress(_val) {
      // https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
      /* Get the text field */
      var copyText = document.getElementById("myInput");

      /* Select the text field */
      copyText.select();
      copyText.setSelectionRange(0, 99999); /*For mobile devices*/

      /* Copy the text inside the text field */
      document.execCommand("copy");
    },
  },
  mounted(){
    gsap.fromTo( '.article-wrapper' , { opacity: 0 , y: '-25px' } , { duration: 1,  opacity: 1 , y: '0px'}  )
  }
};
</script>

<style scoped lang="scss" >

.article-wrapper {
    @include article-wrapper;

  .about-title {
    @include font-title;
    padding-bottom: 20px;
  }

  .about-header {
    @include font-subtitle;
    max-width: 70%;
    display: inline-block;
    padding-bottom: 52px;
  }

  p {
    @include font-description;
  }

  .about-img-wrapper {
    width: 100%;
    padding: 130px 0px;
    text-align: center;
    @include respond-width($w991) {
      padding: 65px 0px;
    }
    img{
      max-width: 100%;
    }
  }
}

.contact{
  .contact-email{
      color: $white;
      // text-decoration: none;
      transition: ease all 0.3s;
      &:hover{
        color: $green;
      }
  }
}

.support {
  //margin: 30px auto;

  &-title {
    margin: 0px 0px 20px;
  }

  & > p {
    padding-bottom: 20px;
  }

  .wallets-wrapper {
    //text-align: center;
    display: flex;
    justify-content: space-between;

    @include respond-width($w991) {
      flex-direction: column;
    }
  }

  .wallet {
    display: block;
    p:last-of-type {
      @include respond-width($w1370) {
        font-size: 16px;
      }
    }
    img {
      border: 1px solid white;
      border-radius: 10px;
      margin: 133px 0px;
      width: 264px;

      @include respond-width($w1370) {
        margin: 60px 0px 80px 0px;
        max-width: 200px;
      }

      @include respond-width($w991) {
        margin: 45px 0px 80px 0px;
        width: 30%;
      }
    }
  }
}
</style>
