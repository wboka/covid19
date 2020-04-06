<template>
  <p class="text-center">
    This page has moved. Click <nuxt-link to="/">here</nuxt-link> to go to the
    new page.
  </p>
</template>

<script>
export default {
  head() {
    return {
      meta: [{ 'http-equiv': 'refresh', content: '5;url=/' }]
    }
  }
}
</script>
