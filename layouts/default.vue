<template>
  <div class="container relative">
    <nuxt />
    <div class="explainer">
      2key Metrics is a community developed and maintained project which shows fundamental
      performance data sourced from 2key's Plasma chain, Ethereum chain and API in order
      to allow non-technical community members to monitor the performance of 2key.
    </div>
  </div>
</template>

<style lang="scss">
@import "../styles/global.scss";

html {
  font-family: 'Helvetica', -apple-system, BlinkMacSystemFont, Arial, sans-serif;
  font-size: 14px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

a {
  text-decoration: underline;
}

body {
  color: $dark-grey;
  background: linear-gradient(270deg, $brand-light, $brand-mid, $brand-dark);
}
.container {
  margin-top: 5rem;
  margin-bottom: 5rem;
}

h1 {
  display: block;
  font-weight: 700;
  font-size: 1.6rem;
  padding-top: 30px;
  letter-spacing: 1px;
}

h2 {
  display: block;
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: 1px;
}

.explainer {
  color: white;
  text-align: center;
  font-size: 0.8rem;
  margin-top: 5rem;
  padding: 0 10rem;
}


*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
