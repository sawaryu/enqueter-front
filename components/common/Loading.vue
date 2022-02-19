<template>
  <VueLoading type="bars" color="#333" :size="size" />
</template>

<script>
import { VueLoading } from "vue-loading-template";
export default {
  components: {
    VueLoading,
  },
  props: {
    size: {
      type: Object,
      default: { width: "30px", height: "30px" },
    },
  },
};
</script>

<style>
</style>