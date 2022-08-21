<template>
  <header class="container-fluid fixed-top">
    <div class="row">
      <div class="col-12 col-md-8 offset-md-2">
        <Navbar />
      </div>
    </div>
  </header>
  <main class="container-fluid">
    <section class="row bg-dark">
      <div class="col-12 col-md-2 bg-dark left-bar sticky-md-top ">
        <Login />
      </div>
      <div class="col-12 col-md-8 view-port bg-dark">
        <router-view />
      </div>
      <div class="col-12 col-md-2 sticky-md-top d-flex flex-column align-items-center bg-dark right-bar">
        <!--TODO look into why this didn't work the same as posts in the above div -->
        <AdCard v-for="a in ads" :key="a.id" :ad="a" />
      </div>
    </section>
  </main>

</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from './AppState';
import Login from './components/Login.vue';
import { adsService } from './services/AdsService.js';
import { logger } from './utils/Logger.js';
import Pop from './utils/Pop.js';
import AdCard from './components/AdCard.vue';
import { Ad } from './models/Ad.js';

export default {
  // VVV this says your receiving the prop
  // props: {
  //   ad: { type: Ad, required: true }
  // },
  setup() {
    async function getAds() {
      try {
        await adsService.getAds();
      }
      catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    }
    onMounted(() => {
      getAds()
    })
    return {
      appState: computed(() => AppState),
      ads: computed(() => AppState.ads)
    };
  },
  components: { Login, AdCard }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

main {
  height: 85vh;
}

*::-webkit-scrollbar {
  display: none;
}

.left-bar {
  height: fit-content;
  // position: fixed;
  padding-top: 12vh;

}

.right-bar {
  // position: fixed;
  height: 100vh;
}

.view-port {
  overflow-y: scroll;
  // padding-top: 10vh;
}
</style>
