<template>
  <div class="ad-card ">

    <img class="img-fluid my-2  rounded" :src="ad.tall" :title="ad.title" alt="">

  </div>
</template>


<script>

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
  max-height: 100vh;
}
</style>