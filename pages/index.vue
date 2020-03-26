<template>
  <div>
    <h2>Latest Numbers</h2>

    <div class="flex flex-wrap text-center">
      <div class="w-full sm:w-1/3 md:w-1/3 lg:w-1/5">
        <div class="border-2 m-2 text-white bg-green-900 shadow-lg">
          <h3>
            Positive
          </h3>
          <div class="text-4xl">
            {{ stats.positive.toLocaleString() }}
          </div>
        </div>
      </div>

      <div class="w-full sm:w-1/3 md:w-1/3 lg:w-1/5">
        <div class="border-2 m-2 text-white bg-red-800 shadow-lg">
          <h3>
            Negative
          </h3>
          <div class="text-4xl">
            {{ stats.negative.toLocaleString() }}
          </div>
        </div>
      </div>

      <div class="w-full sm:w-1/3 md:w-1/3 lg:w-1/5">
        <div class="border-2 m-2 text-white bg-blue-900 shadow-lg">
          <h3>
            Total
          </h3>
          <div class="text-4xl">
            {{ stats.totalTestResults.toLocaleString() }}
          </div>
        </div>
      </div>

      <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/5">
        <div class="border-2 m-2 text-white bg-black shadow-lg">
          <h3>
            Deaths
          </h3>
          <div class="text-4xl">
            {{ stats.death.toLocaleString() }}
          </div>
        </div>
      </div>

      <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/5">
        <div class="border-2 m-2 text-white bg-blue-600 shadow-lg">
          <h3>
            Hospitalized
          </h3>
          <div class="text-4xl">
            {{ stats.hospitalized.toLocaleString() }}
          </div>
        </div>
      </div>
    </div>

    <h2>Available Countries</h2>

    <nuxt-link to="/us">USA</nuxt-link>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData({ params }) {
    const { data: stats } = await axios.get('https://covidtracking.com/api/us')

    return {
      stats: stats[0]
    }
  },
  head() {
    return {
      title: 'Dashboard'
    }
  }
}
</script>
