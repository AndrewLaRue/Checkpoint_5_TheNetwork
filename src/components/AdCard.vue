<template>
  <div class="ad-card bg-dark">

    <img class="img-fluid mt-2 bg-dark rounded" :src="ad.tall" :title="ad.title" alt="">

  </div>
</template>


<script>
// import { Ad } from '../models/Ad.js';

export default {

  props: {
    ad: { type: Object, required: true }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.ad-card {
  max-height: 48vh;
}
</style>