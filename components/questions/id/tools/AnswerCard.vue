<template>
  <v-card
    class="d-flex justify-center align-center ma-6"
    rounded="circle"
    :width="size"
    :height="size"
    link
    @click="$emit('answer', type)"
  >
    <!-- <v-icon color="#EF9A9A" size="100">mdi-circle-outline</v-icon> -->
    <div v-if="type" class="text-h4 red--text font-weight-bold">Yes</div>
    <div v-else class="text-h4 blue--text font-weight-bold">No</div>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    type: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    size() {
      const breakpointName = this.$vuetify.breakpoint.name;
      if (breakpointName == "xs") {
        return 130;
      } else {
        return 250;
      }
    },
  },
});
</script>

<style>
</style>