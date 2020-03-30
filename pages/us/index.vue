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

export default {
  async asyncData({ params }) {
    const { data: availableStates } = await axios.get(
      'https://covidtracking.com/api/states/info'
    )
    const { data: stats } = await axios.get('https://covidtracking.com/api/us')

    availableStates.sort((a, b) => {
      const state1 = a.name.toLowerCase()
      const state2 = b.name.toLowerCase()

      if (state1 < state2) return -1
      if (state1 > state2) return 1

      return 0
    })

    return {
      stats: stats[0],
      states: availableStates
    }
  },
  data() {
    return {
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
  head() {
    return {
      title: 'USA'
    }
  }
}
</script>
