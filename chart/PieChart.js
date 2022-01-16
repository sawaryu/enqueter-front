import { Pie } from "vue-chartjs";
import chartjsPluginDatalabels from "chartjs-plugin-datalabels";
export default {
  extends: Pie,
  props: {
    chartData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      options: {
        legend: {
          // when click, no actions occur.
          onClick: this.legendItem,
          reverse: true,
        },
        title: {
          display: false,
          text: "Ratio",
        },
        plugins: {
          datalabels: {
            formatter: (value, ctx) => {
              let sum = 0;
              let dataArr = ctx.chart.data.datasets[0].data;
              dataArr.map((data) => {
                sum += data;
              });
              let percentage = ((value * 100) / sum).toFixed(2) + "%";
              return percentage;
            },
            color: "black",
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
