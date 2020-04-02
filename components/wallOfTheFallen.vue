<template>
  <div class="wall-of-the-fallen">
    <h1 class="text-center">{{ state }} Wall of the Fallen</h1>

    <h2 class="text-center">{{ deaths ? deaths.toLocaleString() : 0 }}</h2>

    <div
      v-for="i in deaths"
      :key="i"
      class="inline-block h-8 w-4 bg-black shadow-lg m-2 text-center"
    >
      <div class="sr-only2">x</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    deaths: {
      type: Number,
      default: 100
    },
    state: {
      type: String,
      default: null
    }
  }
}
</script>
