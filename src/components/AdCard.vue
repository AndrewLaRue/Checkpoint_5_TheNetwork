<template>
  <div class="ad-card">

    <img class="img-fluid mt-2" :src="ad.tall" :title="ad.title" alt="">

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
img {
  max-height: 48vh;
}
</style>