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
          (D.D. May 12th 2020; source: <a href="https://docs.google.com/spreadsheets/d/16811qzLL_R6nQ4_4Bc4Fn2gEAUITxAGDbaapDE8xS0o/edit#gid=0" target="_blank">
            https://docs.google.com/spreadsheets/d/16811qzLL_R6nQ4_4Bc4Fn2gEAUITxAGDbaapDE8xS0o/edit#gid=0
          </a>)
        </div>
      </div>
    </section>
    <section class="shadow-xl rounded link_clickthroughs">
      <div class="label">
        Daily link clickthroughs:
      </div>
      <div v-if="$store.state.link_clickthroughs.loaded">
        <LinkClickthroughChart />
        <div class="data-source">
          (source: <a href="http://prod.api.graph.plasma.2key.net/subgraphs/name/plasma" target="_blank">
            Direct plasma chain data via GraphQL API
          </a>)
        </div>
      </div>
    </section>
    <section class="shadow-xl rounded">
      34
    </section>
  </div>
</template>

<script>
import CurrentSupply from '../components/current_supply.vue';
import ProjectedSupply from '../components/charts/projected_supply.vue';
import LinkClickthroughChart from '../components/charts/link_clickthroughs.vue';

export default {
  components: {
    CurrentSupply,
    ProjectedSupply,
    LinkClickthroughChart,
  },
  // load data here
  async fetch() {
    this.$store.dispatch('issuance/loadSupply');
    this.$store.dispatch('link_clickthroughs/load');
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
  .label {
    color: $light-grey;
    display: block;
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: 700;
  }
  .data-source {
    font-size: 0.7rem;
    color: $light-grey;
    text-align: right;
  }
  .issuance {
    .issuance-chart {
      margin-top: 2rem;
      .label {
        margin-bottom: 1rem;
      }
    }
  }
  .link_clickthroughs {
    .label {
      margin-bottom: 1rem;
    }
  }
</style>
