<template>
  <div>
    <div class="text-center">
      <nuxt-link to="/us">USA</nuxt-link>

      <h2>{{ state }}</h2>

      <p>
        Last checked: <em>{{ stats.dateChecked }}</em>
      </p>

      <p>
        Last modified: <em>{{ stats.dateModified }}</em>
      </p>

      <h3>Data Quality - {{ stats.grade }}</h3>
    </div>

    <div class="flex flex-wrap text-center">
      <div class="w-full sm:w-1/3 md:w-1/3 lg:w-1/5">
        <div class="border-2 m-2 text-white bg-green-900 shadow-lg">
          <h3>
            Positive
          </h3>
          <div class="text-4xl">
            {{ stats.positive ? stats.positive.toLocaleString() : '-' }}
          </div>
        </div>
      </div>

      <div class="w-full sm:w-1/3 md:w-1/3 lg:w-1/5">
        <div class="border-2 m-2 text-white bg-red-800 shadow-lg">
          <h3>
            Negative
          </h3>
          <div class="text-4xl">
            {{ stats.negative ? stats.negative.toLocaleString() : '-' }}
          </div>
        </div>
      </div>

      <div class="w-full sm:w-1/3 md:w-1/3 lg:w-1/5">
        <div class="border-2 m-2 text-white bg-blue-900 shadow-lg">
          <h3>
            Total
          </h3>
          <div class="text-4xl">
            {{
              stats.totalTestResults
                ? stats.totalTestResults.toLocaleString()
                : '-'
            }}
          </div>
        </div>
      </div>

      <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/5">
        <div class="border-2 m-2 text-white bg-black shadow-lg">
          <h3>
            Deaths
          </h3>
          <div class="text-4xl">
            {{ stats.death ? stats.death.toLocaleString() : '-' }}
          </div>
        </div>
      </div>

      <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/5">
        <div class="border-2 m-2 text-white bg-blue-600 shadow-lg">
          <h3>
            Hospitalized
          </h3>
          <div class="text-4xl">
            {{ stats.hospitalized ? stats.hospitalized.toLocaleString() : '-' }}
          </div>
        </div>
      </div>
    </div>

    <h3>Daily</h3>

    <div v-for="stat in dailyStats" :key="stat.date">
      <h4>{{ makeDate(stat.date) }}</h4>

      <p>
        Last checked: <em>{{ stat.dateChecked }}</em>
      </p>

      <div class="flex flex-wrap text-center">
        <div class="w-full sm:w-1/3 md:w-1/3 lg:w-1/5">
          <div class="border-2 m-2 text-white bg-green-900 shadow-lg">
            <h3>
              Positive
            </h3>
            <div class="text-4xl">
              {{ stat.positive ? stat.positive.toLocaleString() : '-' }}
            </div>
          </div>
        </div>

        <div class="w-full sm:w-1/3 md:w-1/3 lg:w-1/5">
          <div class="border-2 m-2 text-white bg-red-800 shadow-lg">
            <h3>
              Negative
            </h3>
            <div class="text-4xl">
              {{ stat.negative ? stat.negative.toLocaleString() : '-' }}
            </div>
          </div>
        </div>

        <div class="w-full sm:w-1/3 md:w-1/3 lg:w-1/5">
          <div class="border-2 m-2 text-white bg-blue-900 shadow-lg">
            <h3>
              Total
            </h3>
            <div class="text-4xl">
              {{
                stat.totalTestResults
                  ? stat.totalTestResults.toLocaleString()
                  : '-'
              }}
            </div>
          </div>
        </div>

        <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/5">
          <div class="border-2 m-2 text-white bg-black shadow-lg">
            <h3>
              Deaths
            </h3>
            <div class="text-4xl">
              {{ stat.death ? stat.death.toLocaleString() : '-' }}
            </div>
          </div>
        </div>

        <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/5">
          <div class="border-2 m-2 text-white bg-blue-600 shadow-lg">
            <h3>
              Hospitalized
            </h3>
            <div class="text-4xl">
              {{ stat.hospitalized ? stat.hospitalized.toLocaleString() : '-' }}
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

export default {
  async asyncData({ params }) {
    const { data: stats } = await axios.get(
      `https://covidtracking.com/api/states?state=${params.state}`
    )
    const { data: dailyStats } = await axios.get(
      `https://covidtracking.com/api/states/daily?state=${params.state}`
    )

    return {
      dailyStats,
      state: params.state,
      stats
    }
  },
  methods: {
    makeDate(date) {
      const dateAsString = date.toString()

      // 20200325
      return `${dateAsString.substring(4, 6)}-${dateAsString.substring(
        6,
        8
      )}-${dateAsString.substring(0, 4)}`
    }
  },
  head() {
    return {
      title: this.state
    }
  }
}
</script>
