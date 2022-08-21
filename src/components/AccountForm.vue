<template>
  <form class="account-form" @submit.prevent="handleSubmit">
    <div class="">
      <span class="d-flex flex-column flex-md-row justify-content-around">
        <div class="col-md-5">
          <label for="name">Name:</label>
          <input type="text" class="form-control" v-model="editable.name" required name="name">
        </div>
        <div class="col-md-5">
          <label for="name">Email:</label>
          <input type="text" class="form-control" v-model="editable.email" required name="email">
        </div>
      </span>

      <span class="d-flex flex-column flex-md-row justify-content-around">
        <div class="col-md-5">
          <label for="picture">Picture:</label>
          <input type="url" class="form-control" v-model="editable.picture" required name="picture"
            placeholder="picture">
        </div>
        <div class="col-md-5">
          <label for="coverImg">Cover Image:</label>
          <input type="url" class="form-control" v-model="editable.coverImg" required name="coverImg">
        </div>
      </span>
      <span class="d-flex flex-column flex-md-row justify-content-around">

        <div class="col-md-5">
          <label for="name">GitHub:</label>
          <input type="text" class="form-control" v-model="editable.github" required name="github">
        </div>
        <div class="col-md-5">
          <label for="name">LinkedIn:</label>
          <input type="text" class="form-control" v-model="editable.linkedin" required name="linkedin">
        </div>
      </span>
      <span class="d-flex flex-column flex-md-row justify-content-around">

        <div class="col-md-5">
          <label for="name">Resume:</label>
          <input type="text" class="form-control" v-model="editable.resume" required name="resume">
        </div>
        <div class="col-md-5">
          <div class="row">
            <div class="col-9">
              <label for="name">Class:</label>
              <input type="text" class="form-control" v-model="editable.class" required name="class">
            </div>
            <div class="col-3 d-flex flex-column justify-content-center">
              <label for="name">Graduated</label>
              <input class="fs-2" type="checkbox" v-model="editable.graduated" name="graduated" id="">
            </div>
          </div>
        </div>
      </span>
      <span class=" d-flex flex-column flex-md-row flex-column justify-content-around">
        <div class="col-12">
          <label for=" bio">Bio:</label>
          <textarea type="text" class="form-control" v-model="editable.bio" required name="bio" rows="8"
            style="resize:none"></textarea>
        </div>
      </span>
      <div class="text-center">
        <button type="submit" class="btn btn-primary mt-2 selectable">Save</button>
      </div>
    </div>
  </form>
</template>


<script>
import { ref, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import { router } from '../router.js';
import { accountService } from '../services/AccountService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
export default {
  setup() {
    const editable = ref({})
    watchEffect(() => {
      if (!AppState.account) { return }
      editable.value = { ...AppState.account }
    })
    return {
      editable,
      async handleSubmit() {
        try {
          await accountService.editAccount(editable.value)
          router.push({ name: 'Profile', params: { profileId: editable.value.id } })
        } catch (error) {
          logger.error('[Editing Account]', error)
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>