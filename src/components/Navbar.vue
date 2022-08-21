<template>
  <section class="row bg-dark justify-content-between align-items-center py-1">
    <div class="col-12 col-md-5">
      <router-link class="" :to="{ name: 'Home' }">
        <div @click="getPosts" class="d-flex align-items-end">
          <img alt="logo" src="../assets/img/n-letter.png" height="60" />
          <h1>ETᗯOᖇK</h1>
        </div>
      </router-link>
    </div>
    <div class="col-12 col-md-4 mt-1">
      <SearchForm />
    </div>
    <div class="col-md-2 clear"></div>
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
