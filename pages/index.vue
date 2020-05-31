<template>
  <div>
    <section class="shadow-xl rounded issuance">
      <div class="currently-circulating">
        <span class="label">Current circulating supply:</span>
        <CurrentSupply />
      </div>
      <div class="issuance-chart">
        <span class="label">First year release schedule:</span>
        <ProjectedSupply v-if="$store.state.issuance.loaded" />
        <div class="data-source">
          (source: <a href="https://docs.google.com/spreadsheets/d/16811qzLL_R6nQ4_4Bc4Fn2gEAUITxAGDbaapDE8xS0o/edit#gid=0" target="_blank">
            https://docs.google.com/spreadsheets/d/16811qzLL_R6nQ4_4Bc4Fn2gEAUITxAGDbaapDE8xS0o/edit#gid=0
          </a>)
        </div>
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
import ProjectedSupply from '../components/charts/projected_supply.vue';

export default {
  components: {
    CurrentSupply,
    ProjectedSupply,
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
    margin-bottom: 8rem;
    min-height: 10rem;
    padding: 1rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .issuance {
    .label {
      color: $light-grey;
      display: block;
      text-transform: uppercase;
      font-size: 1rem;
      font-weight: 700;
    }
    .issuance-chart {
      margin-top: 2rem;
      .label {
        margin-bottom: 1rem;
      }
    }
    .data-source {
      font-size: 0.7rem;
      color: $light-grey;
      text-align: right;
    }
  }
</style>
