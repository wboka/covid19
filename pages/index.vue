<template>
  <div>
    <h2 class="text-center">United States of America</h2>

    <p class="text-center">
      <nuxt-link to="/fallen">Visit the Tribute to the Fallen</nuxt-link>
    </p>

    <p class="text-center">
      <button
        type="button"
        class="text-white font-bold py-2 px-4 m-4 rounded-full"
        :class="{
          'bg-teal-700 hover:bg-teal-500': showPercentFromTotal,
          'bg-blue-700 hover:bg-blue-500': !showPercentFromTotal
        }"
        @click="showPercentFromTotal = !showPercentFromTotal"
      >
        Show Death as Percentage of
        {{ showPercentFromTotal ? 'Positive' : 'Total' }} Tests
      </button>
    </p>

    <Stats
      :deaths="stats.death"
      :negative="stats.negative"
      :positive="stats.positive"
      :show-percent-from-total="showPercentFromTotal"
      :total="stats.totalTestResults"
    />

    <div class="flex flex-wrap">
      <div class="w-full md:w-1/2 text-center">
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
        <BarChart
          v-show="showCaseData"
          :id="'tracking-chart'"
          :chart-type="'line'"
          :title="'COVID-19 Cases Reported'"
          :datasets="[
            {
              label: 'Positive',
              data: getChartData('positive'),
              backgroundColor: '#22543daa'
            },
            {
              label: 'Negative',
              data: getChartData('negative'),
              backgroundColor: '#9b2c2caa'
            },
            {
              label: 'Total',
              data: getChartData('totalTestResults'),
              backgroundColor: '#2a4365aa'
            }
          ]"
        />
        <BarChart
          v-show="!showCaseData"
          :id="'tracking-increases-chart'"
          :chart-type="'line'"
          :title="'COVID-19 Cases Reported (Daily Change)'"
          :datasets="[
            {
              label: 'Positive',
              data: getChartData('positiveIncrease'),
              backgroundColor: '#22543daa'
            },
            {
              label: 'Negative',
              data: getChartData('negativeIncrease'),
              backgroundColor: '#9b2c2caa'
            },
            {
              label: 'Total',
              data: getChartData('totalTestResultsIncrease'),
              backgroundColor: '#2a4365aa'
            }
          ]"
        />
      </div>
      <div class="w-full md:w-1/2 text-center">
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
        <BarChart
          v-show="showPatientData"
          :id="'care-chart'"
          :chart-type="'line'"
          :title="'COVID-19 Patients'"
          :datasets="[
            {
              label: 'Death',
              data: getChartData('death'),
              backgroundColor: '#000000aa'
            }
          ]"
        />
        <BarChart
          v-show="!showPatientData"
          :id="'care-increases-chart'"
          :chart-type="'line'"
          :title="'COVID-19 Patients (Daily Change)'"
          :datasets="[
            {
              label: 'Death',
              data: getChartData('deathIncrease'),
              backgroundColor: '#000000aa'
            }
          ]"
        />
      </div>
    </div>

    <div class="text-center">
      <button
        type="button"
        class="text-white font-bold py-2 px-4 m-4 rounded-full"
        :class="{
          'bg-green-700 hover:bg-green-500': !showDailyStats,
          'bg-red-700 hover:bg-red-500': showDailyStats
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

        <Stats
          :deaths="stat.death"
          :negative="stat.negative"
          :positive="stat.positive"
          :show-percent-from-total="showPercentFromTotal"
          :total="stat.totalTestResults"
        />

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
import { format } from 'date-fns'

import BarChart from '~/components/BarChart'
import Stats from '~/components/statsSummary'

export default {
  name: 'USDashboard',
  components: {
    BarChart,
    Stats
  },
  async asyncData({ params }) {
    const { data: availableStates } = await axios.get(
      'https://covidtracking.com/api/v1/states/info.json'
    )
    const { data: stats } = await axios.get(
      'https://covidtracking.com/api/v1/us.json'
    )
    const { data: dailyStats } = await axios.get(
      'https://covidtracking.com/api/v1/us/daily.json'
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
      showCaseData: true,
      showDailyStats: false,
      showPatientData: true,
      showPercentFromTotal: false,
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
  methods: {
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
