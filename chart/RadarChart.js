import { Radar } from "vue-chartjs";
export default {
  extends: Radar,
  data() {
    return {
      chartData: {
        labels: [
          'Responses',
          'Questions',
          'Answers',
        ],
        datasets: [{
          data: [65, 59, 90],
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
      },
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};


