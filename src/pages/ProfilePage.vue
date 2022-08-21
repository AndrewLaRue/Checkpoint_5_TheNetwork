<template>
  <div class="row justify-contents-center align-items-center mt-md-5">
    <div class="col-12 profile-page cover-img rounded  mt-md-2" v-if="profile">
      <div class=" pt-3">
        <img class="profile-portrait" :src="profile.picture" alt="">
        <h3 class="text-img">
          {{ profile.name }}
        </h3>
      </div>
    </div>

    <div class="col-4 col-md-4 order-md-1">
      <a v-if="profile.github" :href="profile.github"> <i class="fs-1 selectable mdi mdi-github"></i></a>
      <a v-if="profile.linkedin" :href="profile.linkedin"> <i class="fs-1 mx-2 selectable mdi mdi-linkedin"></i></a>
      <a v-if="profile.resume" :href="profile.resume"> <i class="fs-1 selectable mdi mdi-passport"></i></a>
    </div>

    <div class="col-8 col-md-4 order-md-3 text-end">
      <h5 v-if="profile.email"> {{ profile.email }}</h5>
    </div>

    <div class="col-12 col-md-4 order-md-1 text-center">
      <h5 v-if="profile.class">
        <i data-bs-toggle="collapse" data-bs-target="#collapseBio"
          class="mdi mdi-chevron-double-down text-warning selectable" title="Bio"></i>
        {{ profile.class }}
        <i v-if="!profile.graduated" class="mdi mdi-school text-danger"></i>
        <i v-else class="mdi mdi-school text-success"></i>
      </h5>
      <h5 v-else>
        <i data-bs-toggle="collapse" data-bs-target="#collapseBio"
          class="mdi mdi-chevron-double-down text-warning selectable" title="Bio"></i>
      </h5>
    </div>


    <div class="collapse order-md-3" id="collapseBio">
      <div class="card p-1 card-body text-dark">
        <strong class="mt-0 fs-5">Bio:</strong>
        {{ profile.bio }}
      </div>
    </div>

    <div v-if="profile.id == account.id" class="col-md-10 offset-md-1 order-md-3 pt-3">
      <PostForm />
    </div>
    <div class="col-md-10 offset-md-1 order-md-4" v-for="p in posts" :key="p.id">
      <PostCard :post="p" />
    </div>
    <div class="col-12 text-center pb-5 order-md-5">
      <button class="btn btn-light me-5" :disabled="!previousProPage" title="Previous Page"> <i
          class="mdi mdi-chevron-double-left" @click="changeProfilePage(previousProPage)"></i>
      </button>

      <button class="btn btn-light ms-5" :disabled="!nextProPage" title="Next Page"
        @click="changeProfilePage(nextProPage)">
        <i class="mdi mdi-chevron-double-right"></i> </button>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { router } from '../router.js';
import { profilesService } from '../services/ProfilesService.js';
import { postsService } from '../services/PostsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
// import PostForm from '../components/PostForm.vue';
export default {
  setup() {
    const route = useRoute();
    async function getPostsByCreatorId() {
      try {
        await postsService.getPostsByCreatorId(route.params.profileId);

      }
      catch (error) {
        logger.error("[GettingProfilePosts]", error);
        Pop.error(error);
      }
    }
    async function changeProfilePage(url) {
      try {
        await postsService.changeProfilePage(url);
      } catch (error) { }
    }
    async function getProfileById() {
      try {
        await profilesService.getProfileById(route.params.profileId);
      }
      catch (error) {
        logger.error("[GettingProfile]", error);
        Pop.error(error);
        router.push({ name: "Home" });
      }
    }
    onMounted(() => {
      getProfileById();
      getPostsByCreatorId();
    });
    return {
      changeProfilePage,
      account: computed(() => AppState.account),
      profile: computed(() => AppState.activeProfile),
      cover: computed(() => `url(${AppState.activeProfile?.coverImg || "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fed888f0-441a-4b50-84c6-33c1f8220017/d29tcyp-5ee4c144-a38a-4ac6-9f37-bd67c7485cd9.jpg/v1/fill/w_900,h_317,q_75,strp/illusion_of_mist_hellscape_by_nathanmarciniak_d29tcyp-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MzE3IiwicGF0aCI6IlwvZlwvZmVkODg4ZjAtNDQxYS00YjUwLTg0YzYtMzNjMWY4MjIwMDE3XC9kMjl0Y3lwLTVlZTRjMTQ0LWEzOGEtNGFjNi05ZjM3LWJkNjdjNzQ4NWNkOS5qcGciLCJ3aWR0aCI6Ijw9OTAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.MLvLx5O7dIYWASCLr8-hNWjUKc3VQtz5bjjmnAD7HzU"})`),
      posts: computed(() => AppState.profilePosts),
      nextProPage: computed(() => AppState.olderPro),
      previousProPage: computed(() => AppState.newerPro)
    };
  },

}
</script>


<style lang="scss" scoped>
.profile-portrait {
  border-radius: 5%;
  height: 150px;
  width: 150px;
}

.cover-img {
  height: 300px;
  background-position: center;
  // background-attachment: fixed;
  background-size: cover;
  background-image: v-bind(cover);
}

.text-img {
  color: whitesmoke;
  text-shadow: 2px 2px 2px black;
}

.codeworks {
  height: 35px;
  width: 55px;
}
</style>