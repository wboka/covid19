<template>
  <div>
    <h2 class="text-center">United States of America</h2>

    <p class="text-gray-600 text-center">
      Percentages calculated from total test results
    </p>

    <div class="flex flex-wrap text-center">
      <div class="w-full sm:w-1/3 md:w-1/3 lg:w-1/5">
        <div class="m-2 text-white bg-green-900 shadow-lg">
          <h3>
            Positive Tests
          </h3>
          <div class="text-4xl">
            {{ stats.positive.toLocaleString() }}
          </div>
          <div class="text-2xl">
            {{ ((stats.positive / stats.totalTestResults) * 100).toFixed(2) }}%
          </div>
        </div>
      </div>

      <div class="w-full sm:w-1/3 md:w-1/3 lg:w-1/5">
        <div class="m-2 text-white bg-red-800 shadow-lg">
          <h3>
            Negative Tests
          </h3>
          <div class="text-4xl">
            {{ stats.negative.toLocaleString() }}
          </div>
          <div class="text-2xl">
            {{ ((stats.negative / stats.totalTestResults) * 100).toFixed(2) }}%
          </div>
        </div>
      </div>

      <div class="w-full sm:w-1/3 md:w-1/3 lg:w-1/5">
        <div class="m-2 text-white bg-blue-900 shadow-lg">
          <h3>
            Total Tests
          </h3>
          <div class="text-4xl">
            {{ stats.totalTestResults.toLocaleString() }}
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
            {{ stats.death.toLocaleString() }}
          </div>
          <div class="text-2xl">
            {{ ((stats.death / stats.totalTestResults) * 100).toFixed(2) }}%
          </div>
        </div>
      </div>

      <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/5">
        <div class="m-2 text-white bg-blue-600 shadow-lg">
          <h3>
            Hospitalized
          </h3>
          <div class="text-4xl">
            {{ stats.hospitalized.toLocaleString() }}
          </div>
          <div class="text-2xl">
            {{
              ((stats.hospitalized / stats.totalTestResults) * 100).toFixed(2)
            }}%
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap">
      <div class="w-full sm:w-1/2">
        <canvas id="tracking-chart" width="400" height="300"></canvas>
      </div>
      <div class="w-full sm:w-1/2">
        <canvas id="care-chart" width="400" height="300"></canvas>
      </div>
    </div>

    <div class="text-center">
      <button
        type="button"
        class="text-white font-bold py-2 px-4 m-4 rounded-full"
        :class="{
          'bg-green-500 hover:bg-green-700': !showDailyStats,
          'bg-red-500 hover:bg-red-700': showDailyStats
        }"
        @click="showDailyStats = !showDailyStats"
      >
        {{ showDailyStats ? 'Hide' : 'Show' }} Daily Stats
      </button>
    </div>

    <div v-show="showDailyStats">
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
                {{
                  stat.hospitalized ? stat.hospitalized.toLocaleString() : '-'
                }}
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

    <div class="flex flex-wrap">
      <div class="w-full md:w-2/5 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="state-search"
        >
          Search State
        </label>
        <input
          id="state-search"
          v-model="stateFilter"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
          placeholder="Search states..."
        />
      </div>
    </div>

    <div class="flex flex-wrap">
      <div
        v-for="state in filteredStates"
        :key="state.state"
        class="w-full sm:w-1/2 md:w-1/4 lg:w-1/5"
      >
        <nuxt-link :to="'/us/' + state.state" class="state-link">{{
          state.name
        }}</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Chart from 'chart.js'
import { format } from 'date-fns'

export default {
  name: 'USDashboard',
  async asyncData({ params }) {
    const { data: availableStates } = await axios.get(
      'https://covidtracking.com/api/states/info'
    )
    const { data: stats } = await axios.get('https://covidtracking.com/api/us')
    const { data: dailyStats } = await axios.get(
      'https://covidtracking.com/api/us/daily'
    )

    availableStates.sort((a, b) => {
      const state1 = a.name.toLowerCase()
      const state2 = b.name.toLowerCase()

      if (state1 < state2) return -1
      if (state1 > state2) return 1

      return 0
    })

    return {
      dailyStats,
      stats: stats[0],
      states: availableStates
    }
  },
  data() {
    return {
      dateFormat: 'MM/dd/yyyy p',
      dailyDateFormat: 'MMMM d, yyyy',
      format,
      showDailyStats: false,
      stateFilter: ''
    }
  },
  computed: {
    filteredStates() {
      return this.states.filter((state) => {
        return new RegExp(`.*${this.stateFilter}.*`, `i`).test(
          state.name + '' + state.state
        )
      })
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
          title: {
            display: true,
            text: title
          },
          scales: {
            xAxes: [
              {
                type: 'time',
                time: {
                  unit: 'day'
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
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
      if (!top || !bottom || bottom === 0) return '-'

      return ((top / bottom) * 100).toFixed(2)
    }
  },
  head() {
    return {
      title: 'USA'
    }
  }
}
</script>
