<template>
  <div>
    <nuxt-link to="/" class="state-link">United States of America</nuxt-link>

    <Wall :deaths="stats.death" state="USA" />
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
  async asyncData() {
    const { data: stats } = await axios.get(
      'https://api.covidtracking.com/api/v1/us/current.json'
    )

    return {
      stats: stats[0]
    }
  }
}
</script>
