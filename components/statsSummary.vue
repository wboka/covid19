<template>
  <div class="stats">
    <div class="flex flex-wrap text-center">
      <div
        class="w-full sm:w-1/2"
        :class="{ 'lg:w-1/5': isState, 'lg:w-1/4': !isState }"
      >
        <div class="m-2 text-white bg-green-900 shadow-lg">
          <h3>
            Positive Tests
          </h3>
          <div class="text-4xl">
            {{ positive ? positive.toLocaleString() : '-' }}
          </div>
          <div class="text-2xl">
            {{ ((positive / total) * 100).toFixed(2) }}%
            <span class="label">of total tests</span>
          </div>
        </div>
      </div>

      <div
        class="w-full sm:w-1/2"
        :class="{ 'lg:w-1/5': isState, 'lg:w-1/4': !isState }"
      >
        <div class="m-2 text-white bg-red-800 shadow-lg">
          <h3>
            Negative Tests
          </h3>
          <div class="text-4xl">
            {{ negative ? negative.toLocaleString() : '-' }}
          </div>
          <div class="text-2xl">
            {{ ((negative / total) * 100).toFixed(2) }}%
            <span class="label">of total tests</span>
          </div>
        </div>
      </div>

      <div
        class="w-full sm:w-1/2"
        :class="{ 'lg:w-1/5': isState, 'lg:w-1/4': !isState }"
      >
        <div class="m-2 text-white bg-blue-900 shadow-lg">
          <h3>
            Total Tests
          </h3>
          <div class="text-4xl">
            {{ total ? total.toLocaleString() : '-' }}
          </div>
          <div class="text-2xl">
            -
          </div>
        </div>
      </div>

      <div
        class="w-full sm:w-1/2"
        :class="{ 'lg:w-1/5': isState, 'lg:w-1/4': !isState }"
      >
        <div class="m-2 text-white bg-black shadow-lg">
          <h3>
            Deaths
          </h3>
          <div class="text-4xl">
            {{ deaths ? deaths.toLocaleString() : '-' }}
          </div>
          <div class="text-2xl">
            {{
              (
                (deaths / (showPercentFromTotal ? total : positive)) *
                100
              ).toFixed(2)
            }}%
            <span class="label"
              >of {{ showPercentFromTotal ? 'total' : 'positive' }} tests</span
            >
          </div>
        </div>
      </div>
      <div
        v-if="isState"
        class="w-full sm:w-1/2"
        :class="{ 'lg:w-1/5': isState, 'lg:w-1/4': !isState }"
      >
        <div class="m-2 text-white bg-blue-700 shadow-lg">
          <h3>
            Hospitalized
          </h3>
          <div class="text-4xl">
            {{ hospitalized ? hospitalized.toLocaleString() : '-' }}
          </div>
          <div class="text-2xl">
            {{
              (
                (hospitalized / (showPercentFromTotal ? total : positive)) *
                100
              ).toFixed(2)
            }}%
            <span class="label"
              >of {{ showPercentFromTotal ? 'total' : 'positive' }} tests</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns'

export default {
  props: {
    positive: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    },
    deaths: {
      type: Number,
      default: 0
    },
    negative: {
      type: Number,
      default: 0
    },
    hospitalized: {
      type: Number,
      default: 0
    },
    showPercentFromTotal: {
      type: Boolean,
      default: false
    },
    isState: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dateFormat: 'MMMM dd, yyyy p',
      format
    }
  }
}
</script>
