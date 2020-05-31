<template>
  <div>
    <section class="shadow-xl rounded issuance">
      <div class="currently-circulating">
        <CurrentSupply />
      </div>
    </section>
    <section class="shadow-xl rounded">
      23
    </section>
    <section class="shadow-xl rounded">
      34
    </section>
  </div>
</template>

<script>
import CurrentSupply from '../components/current_supply.vue';

export default {
  components: {
    CurrentSupply,
  },
  // load data here
  async fetch() {
    this.$store.dispatch('issuance/loadSupply');
  },
};
</script>

<style lang="scss" scoped>
  @import "../styles/global.scss";

  section {
    background-color: white;
    margin-bottom: 10rem;
    min-height: 10rem;
    padding: 1rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>
