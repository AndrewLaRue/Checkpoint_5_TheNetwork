<template>
  <div class="home-page">
    <div class="row justify-content-center">
      <div v-if="account.id" class="col-md-10">
        <PostForm />
      </div>
      <div class="col-md-10 pb-5" v-for="p in posts" :key="p.id">
        <PostCard :post="p" />
      </div>
      <div class="col-12 text-center">
        <button class="btn btn-light me-5" :disabled="!previousPage" title="Previous Page"> <i
            class="mdi mdi-chevron-double-left" @click="changePage(previousPage)"></i>
        </button>

        <button class="btn btn-light ms-5" :disabled="!nextPage" title="Next Page" @click="changePage(nextPage)"> <i
            class="mdi mdi-chevron-double-right"></i> </button>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
// import PostCard from '../components/PostCard.vue';
// import PostForm from '../components/PostForm.vue';

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
    async function changePage(url) {
      try {
        await postsService.changePage(url);
      } catch (error) { }
    }
    onMounted(async () => {
      try {
        getPosts();
      }
      catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      changePage,
      account: computed(() => AppState.account),
      posts: computed(() => AppState.posts),
      nextPage: computed(() => AppState.older),
      previousPage: computed(() => AppState.newer)
    };
  },
}
</script>


<style lang="scss" scoped>
</style>