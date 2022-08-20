<template>
  <form class="post-form" @submit.prevent="handleSubmit">
    <div class="d-flex card p-1">
      <span class="p-1">
        <input class="form-control" type="text" placeholder="New Post..." v-model="editable.body" />
        <input class="form-control" type="url" placeholder="Image url..." v-model="editable.imgUrl" />
      </span>
      <button class="btn btn-primary">{{ editable.id ? 'Save' : 'Create' }}</button>
    </div>
  </form>
</template>


<script>
import { ref, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const editable = ref({})
    watchEffect(() => {
      if (!AppState.activePost) { return }
      editable.value = { ...AppState.activePost }
    })
    return {
      editable,
      async handleSubmit() {
        try {
          if (editable.value.id) {
            await postsService.editPost(editable.value)
            Pop.success('Post Edited')
          } else {
            await postsService.createPost(editable.value)
            Pop.success('Great Job... You created a post!!!')
          }
          editable.value = {}
        } catch (error) {
          logger.error('[Handle submit Post ]', error)
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>
