<template>
  <div class="p-2">
    <h1 class="title text-center">
      <nuxt-link to="/">
        COVID-19 Dashboard
      </nuxt-link>
    </h1>

    <nuxt />

    <hr />

    <p class="text-center text-lg my-4">
      Web development by
      <a href="https://wayneboka.com/" target="_blank" rel="noopener"
        ><strong>Wayne Boka</strong></a
      >
    </p>

    <p class="text-center text-lg my-4">
      Data from
      <a href="https://covidtracking.com/" target="_blank" rel="noopener"
        ><strong>The COVID Tracking Project</strong></a
      >
    </p>

    <hr />

    <p class="text-center text-lg my-4">
      Copyright &copy; 2020. Wayne Boka. All rights reserved.
    </p>
  </div>
</template>

<style>
html {
  font-family: 'Titillium Web', 'Source Sans Pro', -apple-system,
    BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
