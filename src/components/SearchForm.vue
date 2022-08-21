<template>
  <form @submit.prevent="searchPosts" class=" search-form">
    <input v-model="query" required type="text" class="form-control" placeholder="Search All Posts..."
      aria-label="Search" aria-describedby="button-addon2">
    <button class="btn btn-outline-secondary ms-2" type="submit" id="button-addon2"> <i class="mdi mdi-magnify "></i>
    </button>
  </form>
</template>


<script>
import { ref } from 'vue';
import { postsService } from '../services/PostsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';


export default {
  setup() {
    const query = ref('')


    return {
      query,
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