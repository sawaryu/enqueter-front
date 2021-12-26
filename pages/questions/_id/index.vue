<template>
  <div>
    <v-row class="justify-center">
      <!-- NO -->
      <v-card
        class="d-flex justify-center align-center ma-6"
        :width="size"
        :height="size"
        link
        @click="$router.push(`/questions/${$route.params.id}/answered`)"
      >
        <v-icon color="red" size="100">mdi-circle-outline</v-icon>
      </v-card>

      <!-- YES -->
      <v-card
        class="d-flex justify-center align-center ma-6"
        :width="size"
        :height="size"
        link
        @click="$router.push(`/questions/${$route.params.id}/answered`)"
      >
        <v-icon color="blue" size="100">mdi-close</v-icon>
      </v-card>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  computed: {
    size() {
      const breakpointName = this.$vuetify.breakpoint.name;
      if (breakpointName == "xs") {
        return 130;
      } else {
        return 300;
      }
    },
  },
});
</script>

<style>
</style>