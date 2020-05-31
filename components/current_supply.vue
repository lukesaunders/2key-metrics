<template>
  <div>
    <span class="label">Current circulating supply:</span>
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

  .label {
    color: $light-grey;
    display: block;
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: 700;
  }
  .value {
    font-size: 1.5rem;
    font-weight: 700;
  }
</style>
