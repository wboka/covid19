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
      :in-icu="stats.inIcuCumulative"
      :negative="stats.negative"
      :on-ventilator="stats.onVentilatorCumulative"
      :positive="stats.positive"
      :show-percent-from-total="showPercentFromTotal"
      :total="stats.totalTestResults"
    />

    <div class="flex flex-wrap">
      <div class="w-full lg:w-1/3 text-center">
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
      <div class="w-full md:w-1/2 lg:w-1/3 text-center">
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
              data: getChartData('hospitalizedCurrently'),
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
      <div class="w-full md:w-1/2 lg:w-1/3 text-center">
        <button
          type="button"
          class="text-white font-bold py-2 px-4 m-4 rounded-full"
          :class="{
            'bg-teal-700 hover:bg-teal-500': showICUData,
            'bg-blue-700 hover:bg-blue-500': !showICUData
          }"
          @click="showICUData = !showICUData"
        >
          Show {{ showICUData ? 'Daily' : 'Cumulative' }} Data
        </button>
        <BarChart
          v-show="showICUData"
          :id="'icu-chart'"
          :chart-type="'line'"
          :title="'COVID-19 ICU Patients'"
          :datasets="[
            {
              label: 'In ICU',
              data: getChartData('inIcuCumulative'),
              backgroundColor: '#c05621aa'
            },
            {
              label: 'On Ventilator',
              data: getChartData('onVentilatorCumulative'),
              backgroundColor: '#6b46c1aa'
            }
          ]"
        />
        <BarChart
          v-show="!showICUData"
          :id="'icu-cumulative-chart'"
          :chart-type="'line'"
          :title="'COVID-19 ICU Patients (Daily Cases)'"
          :datasets="[
            {
              label: 'In ICU',
              data: getChartData('inIcuCurrently'),
              backgroundColor: '#c05621aa'
            },
            {
              label: 'On Ventilator',
              data: getChartData('onVentilatorCurrently'),
              backgroundColor: '#6b46c1aa'
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
        :in-icu="stat.inIcuCurrently"
        :negative="stat.negative"
        :on-ventilator="stat.onVentilatorCurrently"
        :positive="stat.positive"
        :show-percent-from-total="showPercentFromTotal"
        :total="stat.totalTestResults"
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
      `https://covidtracking.com/api/states.json?state=${params.state}`
    )
    const { data: info } = await axios.get(
      `https://covidtracking.com/api/states/info.json?state=${params.state}`
    )
    const { data: dailyStats } = await axios.get(
      `https://covidtracking.com/api/states/daily.json?state=${params.state}`
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
      showICUData: true,
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
