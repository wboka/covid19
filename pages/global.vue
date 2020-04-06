<template>
  <div>
    <h2 class="text-center">Available Countries</h2>

    <div class="flex flex-wrap">
      <div
        v-for="country in stats.data"
        :key="country.location"
        class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
      >
        <nuxt-link
          :to="'/' + country.location.replace(/\s+/gi, '-')"
          class="state-link"
        >
          <h3>
            {{ country.location }}
          </h3>

          <div class="flex flex-wrap">
            <strong class="w-full sm:w-1/2">Active</strong>
            <span
              class="w-full sm:w-1/2 bg-red-700 text-white rounded px-2 text-center sm:text-right"
              >{{ country.active.toLocaleString() }}</span
            >
          </div>
          <div class="flex flex-wrap">
            <strong class="w-full sm:w-1/2">Deaths</strong>
            <span
              class="w-full sm:w-1/2 bg-black text-white rounded px-2 text-center sm:text-right"
              >{{ country.deaths.toLocaleString() }}</span
            >
          </div>
          <div class="flex flex-wrap">
            <strong class="w-full sm:w-1/2">Recovered</strong>
            <span
              class="w-full sm:w-1/2 bg-green-700 text-white rounded px-2 text-center sm:text-right"
              >{{ country.recovered.toLocaleString() }}</span
            >
          </div>
          <div class="flex flex-wrap">
            <strong class="w-full sm:w-1/2">Confirmed</strong>
            <span
              class="w-full sm:w-1/2 bg-blue-700 text-white rounded px-2 text-center sm:text-right"
              >{{ country.confirmed.toLocaleString() }}</span
            >
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DashboardCovid19',
  async asyncData({ params }) {
    const { data: stats } = await axios.get(
      `https://covid2019-api.herokuapp.com/v2/current`
    )

    stats.data.sort((a, b) => {
      if (a.location.toLowerCase() < b.location.toLowerCase()) return -1
      if (a.location.toLowerCase() > b.location.toLowerCase()) return 1

      return 0
    })

    return {
      stats
    }
  },
  head() {
    return {
      title: 'Dashboard'
    }
  }
}
</script>
