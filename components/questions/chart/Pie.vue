<script>
import { Pie } from 'vue-chartjs'

export default {
    extends: Pie,
    data () {
        return {
            chartData: {
                labels: ['Yes', 'No'],
                datasets: [{
                    backgroundColor: [
                        '#FFCDD2',
                        '#BBDEFB'
                    ],
                    data: [100, 120]
                }],
            },
            options: {
                title: {
                    display: false,
                    text: 'Ratio'
                },
            }
        }
    },
    mounted: function() {
        this.renderChart(this.chartData, this.options)
    }
}
</script>
