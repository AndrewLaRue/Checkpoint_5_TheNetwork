<template>
  <div class="post-card my-2">
    <div class="card">
      <div class="card-body row d-flex align-items-center justify-content-between py-1">
        <div class="col-2 d-flex fs-3 align-items-center">
          <router-link :to="{ name: 'Profile', params: { profileId: post.creator.id } }">
            <img @click="scrollBehavior" class="profile-img me-3 selectable" :src="post.creator.picture" alt="">
          </router-link>



        </div>


        <div class="col-2 text-dark text-center">
          <span :title="new Date(post.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })
          ">
            {{ new Date(post.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })
            }}
          </span>
        </div>
        <div class="col-2 text-dark text-end">
          <h6 @click="judgePost(post.id)" class="selectable fs-3" title="Likes">
            {{ post.likes.length }}
          </h6>
        </div>
      </div>
      <h5 class="text-dark ps-2">
        {{ post.creator.name }}
        <i v-if="!profile.graduated" class="mdi mdi-school text-danger fs-6"></i>
        <i v-else class="mdi mdi-school text-success fs-6"></i>
      </h5>
      <img class="img-fluid px-3" :src="post.imgUrl" alt="">
      <div class="card-body">
        <p class="card-text text-dark">{{ post.body }}</p>
        <div v-if="account.id == post.creator.id" class="text-end">
          <i @click="deletePost(post.id)" class="mdi mdi-delete text-danger me-3 selectable" title="Delete Post"></i>
        </div>
      </div>

    </div>

  </div>
</template>


<script>
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

      scrollBehavior() {
        window.scrollTo(0, 0);
      },

      async deletePost(postId) {
        try {
          const yes = await Pop.confirm('Delete the post?')
          if (!yes) { return }
          await postsService.deletePost(postId)
        } catch (error) {
          logger.error('[Deleting Post]', error)
          Pop.error(error)
        }
      },

      async judgePost(postId) {
        try {
          if (!this.account.id) {
            Pop.toast('Log in first!')
            return
          }
          await postsService.judgePost(postId)
        } catch (error) {
          logger.error('[judge post]', error)
          Pop.toast(error.message, 'error')
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