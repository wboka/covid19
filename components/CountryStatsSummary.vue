<template>
  <div class="stats">
    <div class="flex flex-wrap text-center">
      <div class="w-full sm:w-1/2 lg:w-1/4">
        <div class="m-2 text-white bg-red-900 shadow-lg">
          <h3>
            Active
          </h3>
          <div class="text-4xl">
            {{ active ? active.toLocaleString() : '-' }}
          </div>
          <div class="text-2xl">
            {{ ((active / confirmed) * 100).toFixed(2) }}%
            <span class="label">of confirmed cases</span>
          </div>
        </div>
      </div>

      <div class="w-full sm:w-1/2 lg:w-1/4">
        <div class="m-2 text-white bg-green-700 shadow-lg">
          <h3>
            Recovered
          </h3>
          <div class="text-4xl">
            {{ recovered ? recovered.toLocaleString() : '-' }}
          </div>
          <div class="text-2xl">
            {{ ((recovered / confirmed) * 100).toFixed(2) }}%
            <span class="label">of confirmed cases</span>
          </div>
        </div>
      </div>

      <div class="w-full sm:w-1/2 lg:w-1/4">
        <div class="m-2 text-white bg-black shadow-lg">
          <h3>
            Deaths
          </h3>
          <div class="text-4xl">
            {{ deaths ? deaths.toLocaleString() : '-' }}
          </div>
          <div class="text-2xl">
            {{ ((deaths / confirmed) * 100).toFixed(2) }}%
            <span class="label">of confirmed cases</span>
          </div>
        </div>
      </div>

      <div class="w-full sm:w-1/2 lg:w-1/4">
        <div class="m-2 text-white bg-blue-700 shadow-lg">
          <h3>
            Confirmed
          </h3>
          <div class="text-4xl">
            {{ confirmed ? confirmed.toLocaleString() : '-' }}
          </div>
          <div class="text-2xl">
            -
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Number,
      default: 0
    },
    confirmed: {
      type: Number,
      default: 0
    },
    deaths: {
      type: Number,
      default: 0
    },
    recovered: {
      type: Number,
      default: 0
    }
  }
}
</script>
