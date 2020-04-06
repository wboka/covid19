<template>
  <div>
    <div class="text-center">
      <h1>{{ country }}</h1>

      <p>
        Last checked:
        <em>{{ format(new Date(stats.dt + 'Z'), 'MMMM dd, yyyy p') }}</em>
      </p>
    </div>

    <Stats
      :active="countryStats.active"
      :confirmed="countryStats.confirmed"
      :deaths="countryStats.deaths"
      :recovered="countryStats.recovered"
    />

    <BarChart
      :id="'tracking-chart'"
      :chart-type="'line'"
      :title="'New COVID-19 Cases / Day'"
      :datasets="[
        {
          label: 'Confirmed',
          data: getChartConfirmedData,
          backgroundColor: '#2a4365aa'
        },
        {
          label: 'Deaths',
          data: getChartDeathData,
          backgroundColor: '#000000aa'
        }
      ]"
    />
  </div>
</template>

<script>
import axios from 'axios'
import { format } from 'date-fns'

import BarChart from '~/components/BarChart'
import Stats from '~/components/CountryStatsSummary'

export default {
  name: `CountryDashboard`,
  components: {
    BarChart,
    Stats
  },
  async asyncData({ params }) {
    const { data: stats } = await axios.get(
      `https://covid2019-api.herokuapp.com/v2/current`
    )
    const { data: confirmed } = await axios.get(
      `https://covid2019-api.herokuapp.com/v2/timeseries/confirmed`
    )
    const { data: deaths } = await axios.get(
      `https://covid2019-api.herokuapp.com/v2/timeseries/deaths`
    )

    return {
      confirmed,
      country: params.country.replace(/-+/gi, ' '),
      deaths,
      stats
    }
  },
  data() {
    return {
      format
    }
  },
  computed: {
    countryStats() {
      const that = this

      return this.stats.data.filter((country) => {
        return country.location === that.country
      })[0]
    },
    getChartConfirmedData() {
      const that = this

      return this.confirmed.data
        .filter((country) => {
          return country['Country/Region'] === that.country
        })[0]
        .TimeSeries.map((stat) => {
          return {
            t: stat.date,
            y: stat.value
          }
        })
    },
    getChartDeathData() {
      const that = this

      return this.deaths.data
        .filter((country) => {
          return country['Country/Region'] === that.country
        })[0]
        .TimeSeries.map((stat) => {
          return {
            t: stat.date,
            y: stat.value
          }
        })
    }
  }
}
</script>
