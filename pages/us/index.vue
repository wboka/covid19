<template>
  <div>
    <h2>USA</h2>

    <ul>
      <li v-for="state in states" :key="state.state">
        <nuxt-link :to="'/us/' + state.state">{{ state.name }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData({ params }) {
    const { data: availableStates } = await axios.get(
      'https://covidtracking.com/api/states/info'
    )

    return {
      states: availableStates
    }
  },
  head() {
    return {
      title: 'USA'
    }
  }
}
</script>
