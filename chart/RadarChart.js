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
          pointBackgroundColor: '#424242',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#212121',
          pointHoverBorderColor: '#212121'
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
        }
      },
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};


