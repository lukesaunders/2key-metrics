<template>
  <div>
    <span class="value">{{ numeral($store.state.issuance.currentSupply).format('0,0') }}</span>
  </div>
</template>

<script>
import numeral from 'numeral';

export default {
  data() {
    return {
      numeral,
    };
  },
};
</script>

<style scoped lang="scss">
  @import "../styles/global.scss";
  .value {
    font-size: 1.5rem;
    font-weight: 700;
  }
</style>
