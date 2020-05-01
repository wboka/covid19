<template>
  <div>
    <div class="text-center">
      <nuxt-link to="/" class="state-link">United States of America</nuxt-link>

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

      <p>
        <nuxt-link :to="'/us/' + stats.state + '/fallen'"
          >Visit the Tribute to the Fallen</nuxt-link
        >
      </p>

      <p>
        <button
          type="button"
          class="text-white font-bold py-2 px-4 m-4 rounded-full"
          :class="{
            'bg-teal-700 hover:bg-teal-500': showPercentFromTotal,
            'bg-blue-700 hover:bg-blue-500': !showPercentFromTotal
          }"
          @click="showPercentFromTotal = !showPercentFromTotal"
        >
          Show Death and Hospitalized as Percentage of
          {{ showPercentFromTotal ? 'Positive' : 'Total' }} Tests
        </button>
      </p>
    </div>

    <Stats
      :deaths="stats.death"
      :hospitalized="stats.hospitalized"
      :negative="stats.negative"
      :positive="stats.positive"
      :show-percent-from-total="showPercentFromTotal"
      :total="stats.totalTestResults"
      :is-state="true"
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
            },
            {
              label: 'Hospitalized',
              data: getChartData('hospitalized'),
              backgroundColor: '#3182ceaa'
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
            },
            {
              label: 'Hospitalized',
              data: getChartData('hospitalizedIncrease'),
              backgroundColor: '#3182ceaa'
            }
          ]"
        />
      </div>
    </div>

    <h3>Daily</h3>

    <div v-for="stat in dailyStats" :key="stat.date">
      <h4>{{ format(makeISODate(stat.date), dailyDateFormat) }}</h4>

      <p>
        Last checked:
        <em>{{ format(new Date(stat.dateChecked), dateFormat) }}</em>
      </p>

      <Stats
        :deaths="stat.death"
        :hospitalized="stat.hospitalized"
        :negative="stat.negative"
        :positive="stat.positive"
        :show-percent-from-total="showPercentFromTotal"
        :total="stat.totalTestResults"
        :is-state="true"
      />

      <hr />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { format } from 'date-fns'

import Stats from '~/components/statsSummary'
import BarChart from '~/components/BarChart'

export default {
  name: 'StateDashboard',
  components: {
    BarChart,
    Stats
  },
  async asyncData({ params }) {
    const { data: stats } = await axios.get(
      `https://covidtracking.com/api/v1/states/${params.state}/current.json`
    )
    const { data: info } = await axios.get(
      `https://covidtracking.com/api/v1/states/${params.state}/info.json`
    )
    const { data: dailyStats } = await axios.get(
      `https://covidtracking.com/api/v1/states/${params.state}/daily.json`
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
      showPatientData: true,
      showPercentFromTotal: false
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
