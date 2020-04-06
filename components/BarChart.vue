<template>
  <canvas :id="id" width="400" height="300"></canvas>
</template>

<script>
import Chart from 'chart.js'

export default {
  name: 'BarChart',
  props: {
    chartType: {
      type: String,
      default: null
    },
    id: {
      type: String,
      default: null
    },
    datasets: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      showCaseData: true
    }
  },
  mounted() {
    this.createChart(this.id, this.chartType, this.title, this.datasets)
  },
  methods: {
    createChart(chartID, chartType, title, datasets) {
      const ctx = document.getElementById(chartID)
      // eslint-disable-next-line
      const chart = new Chart(ctx, {
        type: chartType,
        data: {
          datasets
        },
        options: {
          scales: {
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'Date',
                  fontStyle: 'bold',
                  fontSize: 16
                },
                type: 'time',
                time: {
                  unit: 'day'
                }
              }
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'Cases',
                  fontStyle: 'bold',
                  fontSize: 16
                },
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          },
          title: {
            display: true,
            text: title,
            fontSize: 18
          },
          tooltips: {
            mode: 'index',
            intersect: false
          },
          hover: {
            mode: 'nearest',
            intersect: true
          }
        }
      })
    },
    getChartData(field) {
      const that = this

      return this.stats.map((stat) => {
        return {
          t: that.makeISODate(stat.date),
          y: stat[field]
        }
      })
    },
    makeISODate(date) {
      if (!date) return 'Unknown Date'

      const dateAsString = date.toString()

      // YYYYMMDD to YYYY-MM-DD
      return new Date(
        dateAsString.substring(0, 4),
        dateAsString.substring(4, 6) - 1,
        dateAsString.substring(6, 8),
        0,
        0
      )
    }
  }
}
</script>
