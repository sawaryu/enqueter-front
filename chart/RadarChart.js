import { Radar } from "vue-chartjs";
export default {
  extends: Radar,
  props: {
    radar_data: {
      type: Array,
      default: [0, 0, 0]
    }
  },
  data() {
    return {
      chartData: {
        labels: [
          'Responses',
          'Questions',
          'Answers',
        ],
        datasets: [{
          data: this.radar_data,
          fill: true,
          backgroundColor: 'rgba(128, 128, 128, 0.2)',
          borderColor: '#616161',
          pointBackgroundColor: '#616161',
          pointBorderColor: '#616161',
          pointHoverBackgroundColor: '#616161',
          pointHoverBorderColor: '#616161'
        }]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        elements: {
          line: {
            borderWidth: 2
          }
        },
        // show name when hover tip.
        tooltips: {
          callbacks: {
            title: (tooltipItem, data) => data.labels[tooltipItem[0].index]
          }
        },
        // ng: scales, ok: scale
        scale: {
          ticks: {
            // stepSize: 10
            beginAtZero: true,
            userCallback: function (label, index, labels) {
              if (Math.floor(label) === label) {
                return label;
              } else {
                return "";
              }
            }

          },
        },
      },
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};


