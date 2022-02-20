import { Pie } from "vue-chartjs";
import chartjsPluginDatalabels from "chartjs-plugin-datalabels";
export default {
  extends: Pie,
  props: {
    options_data: {
      type: Array, // String[]
      required: true
    },
    count_data: {
      type: Array,
      default: [0, 0], // Number[]
    },
  },
  data() {
    return {
      chartData: {
        labels: this.options_data,
        datasets: [
          {
            backgroundColor: ["#BBDEFB", "#FFCDD2"],
            data: this.count_data,
          },
        ],
      },
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
