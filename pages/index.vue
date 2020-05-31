<template>
  <div>
    <div class="logo">
      <img src="/2keylogo.svg" />
      <span class="metrics">metrics</span>
    </div>
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
            plasma chain data via GraphQL API
          </a>)
        </div>
      </div>
    </section>
    <section class="shadow-xl rounded user_registrations">
      <div class="label">
        User registrations:
      </div>
      <div v-if="$store.state.user_registrations.loaded">
        <UserRegistrationChart />
        <div class="data-source">
          (source: <a href="http://prod.api.graph.plasma.2key.net/subgraphs/name/plasma" target="_blank">
            plasma chain data via GraphQL API
          </a>)
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CurrentSupply from '../components/current_supply.vue';
import ProjectedSupply from '../components/charts/projected_supply.vue';
import LinkClickthroughChart from '../components/charts/link_clickthroughs.vue';
import UserRegistrationChart from '../components/charts/user_registrations.vue';

export default {
  components: {
    CurrentSupply,
    ProjectedSupply,
    LinkClickthroughChart,
    UserRegistrationChart,
  },
  // load data here
  async fetch() {
    this.$store.dispatch('issuance/loadSupply');
    this.$store.dispatch('link_clickthroughs/load');
    this.$store.dispatch('user_registrations/load');
  },
};
</script>

<style lang="scss" scoped>
  @import "../styles/global.scss";

  .logo {
    position: relative;
    width: 180px;
    margin: 5rem auto;
    img {
      height: 6rem;
    }
    .metrics {
      color: white;
      font-weight: bold;
      font-size: 1.5rem;
      position: absolute;
      bottom: 0px;
      right: 0px;
      text-shadow: 1px 1px 3px black;
    }
  }
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
  .link_clickthroughs, .issuance, .user_registrations {
    .label {
      margin-bottom: 1rem;
    }
  }
</style>
