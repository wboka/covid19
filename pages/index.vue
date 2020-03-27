<template>
  <div>
    <h2>Available Countries</h2>

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
  head() {
    return {
      title: 'Dashboard'
    }
  },
  data() {
    return {
      countries: [
        {
          abbreviation: 'us',
          name: 'United States of America'
        }
      ]
    }
  }
}
</script>
