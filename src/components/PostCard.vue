<template>
  <div class="post-card my-3">
    <div class="card">
      <div class="card-body d-flex align-items-center justify-content-between">
        <span class="d-flex fs-3 align-items-center">
          <router-link :to="{ name: 'Profile', params: { profileId: post.creator.id } }">
            <img class="profile-img me-3 selectable" :src="post.creator.picture" alt="" :title="post.creator.name">
          </router-link>

        </span>

        <div class="text-dark d-flex flex-column text-center">
          <span>
            {{ new Date(post.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })
            }}
          </span>
          <span>
            {{ new Date(post.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })
            }}
          </span>
        </div>
        <div class="text-dark">
          <h6 class="selectable fs-3">👍{{ post.likes.length }}👎</h6>
        </div>
      </div>
      <img class="img-fluid px-3" :src="post.imgUrl" alt="">
      <div class="card-body">
        <p class="card-text text-dark">{{ post.body }}</p>
        <div v-if="account.id == post.creator.id" class="text-end">
          <i @click="deletePost" class="mdi mdi-delete text-danger me-3 selectable" title="Delete Post"></i>
          <i class="mdi mdi-pen text-info selectable" title="Edit Post"></i>
        </div>
      </div>

    </div>

  </div>
</template>


<script>
// import { Post } from '../models/Post.js';

import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  props: {
    post: { type: Object, required: true }
  },

  setup() {
    return {
      account: computed(() => AppState.account),
      profile: computed(() => AppState.activeProfile),
      // post: computed(() => AppState.activePost),

      // TODO finish and debug the deletes
      async deletePost(postId) {
        try {
          const yes = await Pop.confirm('Delete the post?')
          if (!yes) { return }
          await postsService.deletePost(postId)
        } catch (error) {
          logger.error('[Deleting Post]', error)
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.profile-img {
  border-radius: 50%;
  height: 40px;
  width: 40px;
}
</style>