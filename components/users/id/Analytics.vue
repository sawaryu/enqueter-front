<template>
  <v-card class="mt-2 mx-auto" max-width="400">
    <v-card-text>
      <div class="text-h6 font-weight-medium">User Stats</div>
      <div class="subheading font-weight-light grey--text">
        Lorem ileniti optvoluptatum.
      </div>
      <v-divider class="my-2"></v-divider>
      <v-icon class="mr-2" small> mdi-clock </v-icon>
      <span class="text-caption grey--text font-weight-light"
        >last registration 26 minutes ago</span
      >
    </v-card-text>
    <RadarChart />
  </v-card>
</template>

<script lang="ts">
import RadarChart from "~/chart/RadarChart";
import Vue from "vue";
export default Vue.extend({
  components: {
    RadarChart
  },
  data() {
    return {};
  },
});
</script>