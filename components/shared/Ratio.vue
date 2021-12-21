<template>
  <RatioGraph :chartData="chartItems" :options="chartOptions"/>
</template>

<script lang="ts">
import Vue from "vue";
import RatioGraph from "@/plugins/RatioGraph.js";
export default Vue.extend({
  components: { RatioGraph },
  data() {
    return {
      chartItems: {
        labels: [
          "12月",
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
        ],
        datasets: [
          {
            label: "月ごとの点数",
            data: [95, 70, 80, 65, 69, 80, 100, 100, 72, 81, 45, 70],
            backgroundColor: "lightblue",
          },
        ],
      },
      // 後程オプションを記述
    };
  },
});
</script>

<style>
</style>