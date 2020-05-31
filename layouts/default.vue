<template>
  <div class="container relative">
    <nuxt />
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
  padding-bottom: 10em;
  margin-top: 15rem;
  margin-bottom: 15rem;
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


*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
