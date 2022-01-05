<script>
import { Line } from "vue-chartjs";
import chartjsPluginDatalabels from "chartjs-plugin-datalabels";

export default {
  extends: Line,
  data() {
    return {
      chartData: {
        labels: ["1day", "2day", "3day", "4day", "5day", "6day", "7day"],
        datasets: [
          {
            label: "Total",
            data: [2, 5, 8, 12, 31, 33, 41],
            fill: false,
            borderColor: "grey",
            tension: 0.0,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        plugins: {
          datalabels: {
            formatter: value => value+ "\n\n",
            font: {
              size: "19",
            },
          },
        },
      },
    };
  },
  mounted: function () {
    this.addPlugin(chartjsPluginDatalabels);
    this.renderChart(this.chartData, this.options);
  },
};
</script>
