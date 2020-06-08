<template>
  <div class="text-center">
    <h2 v-if="error.statusCode === 404">Page not found</h2>
    <h2 v-else>
      Something went wrong, sorry about that. Please try again later.
    </h2>

    <p class="text-center">
      <nuxt-link to="/">Home page</nuxt-link>
    </p>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'default'
}
</script>
