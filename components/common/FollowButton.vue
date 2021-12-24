<template>
  <v-btn
    small
    :outlined="relationshipBtn.outlined"
    @click="isFollowing = !isFollowing"
    >{{ relationshipBtn.text }}</v-btn
  >
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      isFollowing: false,
    };
  },
  computed: {
    relationshipBtn() {
      if (this.isFollowing) {
        return {
          outlined: true as boolean,
          text: "following" as string,
        };
      } else {
        return {
          outlined: false as boolean,
          text: "follow" as string,
        };
      }
    },
  },
});
</script>

<style>
</style>