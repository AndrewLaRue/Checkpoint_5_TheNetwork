<template>
  <span class="navbar-text">
    <button class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0" @click="login"
      v-if="!user.isAuthenticated">
      Login
    </button>

    <div class="dropdown my-2 my-lg-0" v-else>
      <div v-if="account.name || user.name" class="d-flex flex-column align-items-center">
        <span class="mx-3 text-success lighten-30">{{ account.name || user.name }}</span>
      </div>
      <div class="dropdown-toggle selectable" data-bs-toggle="dropdown" aria-expanded="false" id="authDropdown">
        <div v-if="account.picture || user.picture" class="d-flex flex-column align-items-center">
          <img :src="account.picture || user.picture" alt="account photo" class="mt-2 rounded img-fluid" />
        </div>
      </div>

      <div v-if="account.class || user.class" class="d-flex flex-column align-items-center">
        <span class="mx-3 text-success lighten-30">
          {{ account.class || user.class }}
          <i v-if="!profile.graduated" class="mdi mdi-school text-danger"></i>
          <i v-else class="mdi mdi-school text-success"></i>
        </span>

      </div>



      <div class="dropdown-menu p-0 list-group w-100" aria-labelledby="authDropdown">
        <div @click="myProfile(account.id)" class="list-group-item list-group-item-action hoverable">
          My Profile
        </div>
        <router-link :to="{ name: 'Account' }">
          <div class="list-group-item list-group-item-action hoverable">
            Manage Account
          </div>
        </router-link>
        <div class="list-group-item list-group-item-action hoverable text-danger" @click="logout">
          <i class="mdi mdi-logout"></i>
          logout
        </div>
      </div>
    </div>
  </span>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { router } from '../router.js';
import { AuthService } from "../services/AuthService";
import { postsService } from "../services/PostsService.js";
import { profilesService } from "../services/ProfilesService.js";

export default {
  setup() {

    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      profile: computed(() => AppState.activeProfile),

      async login() {
        AuthService.loginWithPopup();
      },

      myProfile(id) {
        router.push({ name: 'Profile', params: { profileId: id } })
        profilesService.getProfileById(id)
        postsService.getPostsByCreatorId(id)
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin });
      },
    };
  },
};
</script>


<style lang="scss" scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}

.dropdown-menu.show {
  transform: scale(1);
}

.hoverable {
  cursor: pointer;
}
</style>
