<template>
  <div>
    <nuxt-link to="/" class="state-link">United States of America</nuxt-link>

    <Wall :deaths="stats.death" :state="stats.state" />
  </div>
</template>

<script>
import axios from 'axios'

import Wall from '~/components/wallOfTheFallen'

export default {
  name: 'WallOfTheFallen',
  components: {
    Wall
  },
  async asyncData({ params }) {
    const { data: stats } = await axios.get(
      `https://api.covidtracking.com/api/v1/states/${params.state.toLowerCase()}/current.json`
    )

    return {
      stats
    }
  },
  head() {
    return {
      title: `${this.stats.state} Wall of the Fallen`
    }
  }
}
</script>
