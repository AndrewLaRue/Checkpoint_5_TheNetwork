<template>
  <section class="row justify-content-between align-items-center">
    <div class="col-12 col-md-12 nav-bar">
      <router-link class="" :to="{ name: 'Home' }">
        <div @click="getPosts" class="d-flex align-items-end" title="Home Page">
          <img alt="logo" src="../assets/img/network-logo.png" height="80" />
          <!-- <h1>ETᗯOᖇK</h1> -->
        </div>
      </router-link>
    </div>
  </section>
</template>

<script>
import { postsService } from '../services/PostsService.js';
export default {
  setup() {
    async function getPosts() {
      try {
        await postsService.getPosts();
      }
      catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    }
    return {
      getPosts
    };
  },
};
</script>

<style scoped>
.clear {
  background-color: transparent !important;
}
</style>
