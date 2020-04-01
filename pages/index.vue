<template>
  <div>
    <h2 class="text-center">Available Countries</h2>

    <div class="flex flex-wrap">
      <div
        v-for="state in countries"
        :key="state.abbreviation + '-' + state.name"
        class="w-full sm:w-1/2 md:w-1/4 lg:w-1/5"
      >
        <nuxt-link :to="'/' + state.abbreviation" class="state-link">{{
          state.name
        }}</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardCovid19',
  data() {
    return {
      countries: [
        {
          abbreviation: 'us',
          name: 'United States of America'
        }
      ]
    }
  },
  head() {
    return {
      title: 'Dashboard'
    }
  }
}
</script>
