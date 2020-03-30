<template>
  <div>
    <div class="text-center">
      <nuxt-link to="/us" class="state-link"
        >United States of America</nuxt-link
      >

      <h2>{{ info.name }}</h2>

      <p>
        Last checked:
        <em>{{ format(new Date(stats.dateChecked), dateFormat) }}</em>
      </p>

      <p>
        Last modified:
        <em>{{ format(new Date(stats.dateModified), dateFormat) }}</em>
      </p>

      <h3>Data Quality - {{ stats.grade ? stats.grade : 'NA' }}</h3>

      <p class="text-gray-600 text-center">
        Percentages calculated from total test results
      </p>
    </div>

    <div class="flex flex-wrap text-center">
      <div class="w-full sm:w-1/3 md:w-1/3 lg:w-1/5">
        <div class="m-2 text-white bg-green-900 shadow-lg">
          <h3>
            Positive Tests
          </h3>
          <div class="text-4xl">
            {{ stats.positive ? stats.positive.toLocaleString() : '-' }}
          </div>
          <div class="text-2xl">
            {{ makePercentage(stats.positive, stats.totalTestResults) }}%
          </div>
        </div>
      </div>

      <div class="w-full sm:w-1/3 md:w-1/3 lg:w-1/5">
        <div class="m-2 text-white bg-red-800 shadow-lg">
          <h3>
            Negative Tests
          </h3>
          <div class="text-4xl">
            {{ stats.negative ? stats.negative.toLocaleString() : '-' }}
          </div>
          <div class="text-2xl">
            {{ makePercentage(stats.negative, stats.totalTestResults) }}%
          </div>
        </div>
      </div>

      <div class="w-full sm:w-1/3 md:w-1/3 lg:w-1/5">
        <div class="m-2 text-white bg-blue-900 shadow-lg">
          <h3>
            Total Tests
          </h3>
          <div class="text-4xl">
            {{
              stats.totalTestResults
                ? stats.totalTestResults.toLocaleString()
                : '-'
            }}
          </div>
          <div class="text-2xl">
            -
          </div>
        </div>
      </div>

      <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/5">
        <div class="m-2 text-white bg-black shadow-lg">
          <h3>
            Deaths
          </h3>
          <div class="text-4xl">
            {{ stats.death ? stats.death.toLocaleString() : '-' }}
          </div>
          <div class="text-2xl">
            {{ makePercentage(stats.death, stats.totalTestResults) }}%
          </div>
        </div>
      </div>

      <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/5">
        <div class="m-2 text-white bg-blue-600 shadow-lg">
          <h3>
            Hospitalized
          </h3>
          <div class="text-4xl">
            {{ stats.hospitalized ? stats.hospitalized.toLocaleString() : '-' }}
          </div>
          <div class="text-2xl">
            {{ makePercentage(stats.hospitalized, stats.totalTestResults) }}%
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap">
      <div class="w-full sm:w-1/2 text-center">
        <button
          type="button"
          class="text-white font-bold py-2 px-4 m-4 rounded-full"
          :class="{
            'bg-teal-700 hover:bg-teal-500': showCaseData,
            'bg-blue-700 hover:bg-blue-500': !showCaseData
          }"
          @click="showCaseData = !showCaseData"
        >
          Show {{ showCaseData ? 'Daily Changes' : ' Patient Data' }}
        </button>
        <canvas
          v-show="showCaseData"
          id="tracking-chart"
          width="400"
          height="300"
        ></canvas>
        <canvas
          v-show="!showCaseData"
          id="tracking-increases-chart"
          width="400"
          height="300"
        ></canvas>
      </div>
      <div class="w-full sm:w-1/2 text-center">
        <button
          type="button"
          class="text-white font-bold py-2 px-4 m-4 rounded-full"
          :class="{
            'bg-teal-700 hover:bg-teal-500': showPatientData,
            'bg-blue-700 hover:bg-blue-500': !showPatientData
          }"
          @click="showPatientData = !showPatientData"
        >
          Show {{ showPatientData ? 'Daily Changes' : ' Patient Data' }}
        </button>
        <canvas
          v-show="showPatientData"
          id="care-chart"
          width="400"
          height="300"
        ></canvas>
        <canvas
          v-show="!showPatientData"
          id="care-increases-chart"
          width="400"
          height="300"
        ></canvas>
      </div>
    </div>

    <h3>Daily</h3>

    <div v-for="stat in dailyStats" :key="stat.date">
      <h4>{{ format(makeISODate(stat.date), dailyDateFormat) }}</h4>

      <p>
        Last checked:
        <em>{{ format(new Date(stat.dateChecked), dateFormat) }}</em>
      </p>

      <div class="flex flex-wrap text-center">
        <div class="w-full sm:w-1/3 md:w-1/3 lg:w-1/5">
          <div class="m-2 text-white bg-green-900 shadow-lg">
            <h3>
              Positive Tests
            </h3>
            <div class="text-4xl">
              {{ stat.positive ? stat.positive.toLocaleString() : '-' }}
            </div>
            <div class="text-2xl">
              {{ makePercentage(stat.positive, stat.totalTestResults) }}%
            </div>
          </div>
        </div>

        <div class="w-full sm:w-1/3 md:w-1/3 lg:w-1/5">
          <div class="m-2 text-white bg-red-800 shadow-lg">
            <h3>
              Negative Tests
            </h3>
            <div class="text-4xl">
              {{ stat.negative ? stat.negative.toLocaleString() : '-' }}
            </div>
            <div class="text-2xl">
              {{ makePercentage(stat.negative, stat.totalTestResults) }}%
            </div>
          </div>
        </div>

        <div class="w-full sm:w-1/3 md:w-1/3 lg:w-1/5">
          <div class="m-2 text-white bg-blue-900 shadow-lg">
            <h3>
              Total Tests
            </h3>
            <div class="text-4xl">
              {{
                stat.totalTestResults
                  ? stat.totalTestResults.toLocaleString()
                  : '-'
              }}
            </div>
            <div class="text-2xl">
              -%
            </div>
          </div>
        </div>

        <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/5">
          <div class="m-2 text-white bg-black shadow-lg">
            <h3>
              Deaths
            </h3>
            <div class="text-4xl">
              {{ stat.death ? stat.death.toLocaleString() : '-' }}
            </div>
            <div class="text-2xl">
              {{ makePercentage(stat.death, stat.totalTestResults) }}%
            </div>
          </div>
        </div>

        <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/5">
          <div class="m-2 text-white bg-blue-600 shadow-lg">
            <h3>
              Hospitalized
            </h3>
            <div class="text-4xl">
              {{ stat.hospitalized ? stat.hospitalized.toLocaleString() : '-' }}
            </div>
            <div class="text-2xl">
              {{ makePercentage(stat.hospitalized, stat.totalTestResults) }}%
            </div>
          </div>
        </div>
      </div>

      <hr />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Chart from 'chart.js'
import { format } from 'date-fns'

export default {
  name: 'StateDashboard',
  async asyncData({ params }) {
    const { data: stats } = await axios.get(
      `https://covidtracking.com/api/states?state=${params.state}`
    )
    const { data: info } = await axios.get(
      `https://covidtracking.com/api/states/info?state=${params.state}`
    )
    const { data: dailyStats } = await axios.get(
      `https://covidtracking.com/api/states/daily?state=${params.state}`
    )

    return {
      dailyStats,
      stats,
      info
    }
  },
  data() {
    return {
      dateFormat: 'MM/dd/yyyy p',
      dailyDateFormat: 'MMMM d, yyyy',
      format,
      showCaseData: true,
      showPatientData: true
    }
  },
  mounted() {
    this.createChart('tracking-chart', 'line', 'COVID-19 Cases Reported', [
      {
        label: 'Positive',
        data: this.getChartData('positive'),
        backgroundColor: '#22543daa'
      },
      {
        label: 'Negative',
        data: this.getChartData('negative'),
        backgroundColor: '#9b2c2caa'
      },
      {
        label: 'Total',
        data: this.getChartData('totalTestResults'),
        backgroundColor: '#2a4365aa'
      }
    ])
    this.createChart(
      'tracking-increases-chart',
      'line',
      'COVID-19 Cases Reported (Daily Changes)',
      [
        {
          label: 'Positive',
          data: this.getChartData('positiveIncrease'),
          backgroundColor: '#22543daa'
        },
        {
          label: 'Negative',
          data: this.getChartData('negativeIncrease'),
          backgroundColor: '#9b2c2caa'
        },
        {
          label: 'Total',
          data: this.getChartData('totalTestResultsIncrease'),
          backgroundColor: '#2a4365aa'
        }
      ]
    )
    this.createChart('care-chart', 'line', 'COVID-19 Patients', [
      {
        label: 'Death',
        data: this.getChartData('death'),
        backgroundColor: '#000000aa'
      },
      {
        label: 'Hospitalized',
        data: this.getChartData('hospitalized'),
        backgroundColor: '#3182ceaa'
      }
    ])
    this.createChart(
      'care-increases-chart',
      'line',
      'COVID-19 Patients (Daily Changes)',
      [
        {
          label: 'Death',
          data: this.getChartData('deathIncrease'),
          backgroundColor: '#000000aa'
        },
        {
          label: 'Hospitalized',
          data: this.getChartData('hospitalizedIncrease'),
          backgroundColor: '#3182ceaa'
        }
      ]
    )
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

      return this.dailyStats.map((stat) => {
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
    },
    makePercentage(top, bottom) {
      if (!top || !bottom) return '-'

      return ((top / bottom) * 100).toFixed(2)
    }
  },
  head() {
    return {
      title: this.info.name
    }
  }
}
</script>
