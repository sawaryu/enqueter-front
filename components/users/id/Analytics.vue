<template>
  <v-card class="mt-2 mx-auto" max-width="400">
    <v-card-text>
      <div class="text-h6 font-weight-medium">User Stats</div>
      <div class="subheading font-weight-light text--secondary">2nd / 67pt</div>
      <v-divider class="my-2"></v-divider>
      <v-icon class="mr-2" small> mdi-clock </v-icon>
      <span class="text-caption grey--text font-weight-light"
        >In a week stats.</span
      >
    </v-card-text>
    <div class="mx-auto" style="width: 90%; height: 60%">
      <RadarChart />
    </div>
  </v-card>
</template>

<script lang="ts">
import RadarChart from "~/chart/RadarChart";
import Vue from "vue";
export default Vue.extend({
  components: {
    RadarChart,
  },
  data() {
    return {};
  },
});
</script>