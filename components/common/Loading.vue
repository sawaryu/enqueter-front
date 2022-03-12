<template>
  <VueLoading type="bars" color="#333" :size="size" />
</template>

<script>
import { VueLoading } from "vue-loading-template";
export default {
  props: {
    width: {
      type: String,
      default: "30px",
    },
    height: {
      type: String,
      default: "30px",
    },
  },
  computed: {
    size() {
      return { width: this.width, height: this.height };
    },
  },
  components: {
    VueLoading,
  },
};
</script>