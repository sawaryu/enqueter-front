<template>
  <VueLoading
    type="bars"
    color="#333"
    :size="{ width: '30px', height: '30px' }"
  />
</template>

<script>
import { VueLoading } from "vue-loading-template";
export default {
  components: {
    VueLoading,
  },
};
</script>

<style>
</style>