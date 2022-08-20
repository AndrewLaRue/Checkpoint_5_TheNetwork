<template>
  <section class="row bg-dark justify-content-between align-items-center" style="height:10vh">
    <div class="col-md-3">
      <router-link class="" :to="{ name: 'Home' }">
        <div class="d-flex align-items-end pb-2">
          <img alt="logo" src="../assets/img/big_n.png" height="75" />
          <h1>ETWORK</h1>
        </div>
      </router-link>
    </div>
    <div class="col-md-4 my-4 d-flex">
      <input type="text" class="form-control" placeholder="Search Profiles..." aria-label="Search Posts"
        aria-describedby="button-addon2">
      <button class="btn btn-outline-secondary ms-2" type="button" id="button-addon2"> <i class="mdi mdi-magnify "></i>
      </button>
    </div>
  </section>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
</style>
