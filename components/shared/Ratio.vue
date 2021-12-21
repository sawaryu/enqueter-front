<template>
  <div class="sizing">
    <RatioGraph :chartData="chartItems" :options="options" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import RatioGraph from "@/plugins/RatioGraph.js";
export default Vue.extend({
  components: { RatioGraph },
  data() {
    return {
      chartItems: {
        labels: ["Yes", "No"],
        datasets: [
          {
            label: "ratio",
            data: [30, 70],
            backgroundColor: ["#E57373", "#64B5F6"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
});
</script>

<style scoped>
.sizing {
  max-width: 400px;
  max-height: 400px;
}
</style>