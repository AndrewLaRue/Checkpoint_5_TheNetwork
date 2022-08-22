<template>
  <form v-if="posts" @submit.prevent="searchPosts" class=" search-form nav-bar py-1 mt-3 mt-md-0">
    <input v-model="query" required type="text" class="form-control" placeholder="Search All Posts..."
      aria-label="Search" aria-describedby="button-addon2">
    <button class="btn btn-outline-secondary ms-2" type="submit" id="button-addon2"> <i class="mdi mdi-magnify "></i>
    </button>
  </form>
</template>


<script>
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';


export default {
  setup() {
    const query = ref('')


    return {
      query,
      posts: computed(() => AppState.posts),
      async searchPosts() {
        try {
          await postsService.getPostsByQuery(query.value)
          query.value = ''
        } catch (error) {
          logger.error('[searching posts]', error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.search-form {
  z-index: 10000;
  display: flex;
}
</style>