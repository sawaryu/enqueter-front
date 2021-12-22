<template>
  <div class="sizing">
    <RatioGraph :chartData="chartItems" :options="options" />
  </div>
</template>

<script lang="ts">
// TODO: グラフ出現時ホバーすると読み込みが停止する。その他にも気になる挙動
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
            data: [89, 31],
            backgroundColor: ["#E57373", "#64B5F6"],
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          callbacks: {
            title: function (tooltipItem: any, data: any) {
              return data["labels"][tooltipItem[0]["index"]];
            },
            label: function (tooltipItem: any, data: any) {
              return data["datasets"][0]["data"][tooltipItem["index"]];
            },
            afterLabel: function (tooltipItem: any, data: any) {
              var dataset = data["datasets"][0];
              var percent = Math.round(
                (dataset["data"][tooltipItem["index"]] /
                  dataset["_meta"][0]["total"]) *
                  100
              );
              return "(" + percent + "%)";
            },
          },
          // backgroundColor: "#FFF",
          // titleFontSize: 16,
          // titleFontColor: "#0066ff",
          // bodyFontColor: "#000",
          // bodyFontSize: 14,
          // displayColors: false,
        },
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