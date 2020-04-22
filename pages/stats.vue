<template>
  <div>
    <div class="text-center mb-4">
      <h1>Page Statistics</h1>

      <span class="px-2 bg-blue-900 text-white rounded-lg text-2xl">
        {{ pageHits.length }} hits
      </span>
    </div>

    <div class="flex-wrap hidden md:flex lg:flex bg-teal-800 text-white">
      <div
        class="w-full sm:w-1/2 md:w-1/4 font-bold border-b-2 border-gray-900 p-1"
      >
        Visited On
      </div>
      <div
        class="w-full sm:w-1/2 md:w-1/4 font-bold border-b-2 border-gray-900 p-1"
      >
        Page
      </div>
      <div class="w-full md:w-1/2 font-bold border-b-2 border-gray-900 p-1">
        Browser
      </div>
    </div>

    <div
      v-for="(hit, i) in pageHits"
      :key="'hit' + hit._id"
      class="flex flex-wrap hover:bg-teal-400"
      :class="{ 'bg-gray-300': i % 2 === 0 }"
    >
      <div class="w-full sm:w-1/2 md:w-1/4 p-1">
        <span class="font-bold md:hidden lg:hidden">Visited On: </span
        >{{ format(new Date(hit.when), 'yyyy-MM-dd HH:mm:ss') }}
      </div>
      <div class="w-full sm:w-1/2 md:w-1/4 p-1">
        <span class="font-bold md:hidden lg:hidden">Page: </span
        >{{ hit.page }} ({{ hit.pageName }})
      </div>
      <div class="w-full md:w-1/2 p-1">
        <span class="font-bold md:hidden lg:hidden">Browser: </span
        >{{ hit.userAgent }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { format } from 'date-fns'

export default {
  name: 'Stats',
  async asyncData() {
    const { data: pageHits } = await axios.get(
      `api/stats?host=${location.host ? location.host : 'Unknown'}`
    )

    return {
      pageHits
    }
  },
  data() {
    return {
      format
    }
  },
  head() {
    return {
      title: 'Statistics'
    }
  }
}
</script>
