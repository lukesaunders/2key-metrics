/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import { firstYearIssuance, subsequentIssuance } from '../data/circulating_supply.mjs';


export const state = () => ({
  currentSupply: null,
  firstYearIssuance,
  subsequentIssuance,
  loaded: false,
});

export const getters = {
};

export const mutations = {
  setCurrentSupply(state, currentSupply) {
    state.currentSupply = currentSupply;
    state.loaded = true;
  },
};

async function refreshCurrentSupply({ axios, commit }) {
  const { data } = await axios.get('https://api.2key.network/2key/supply', {
    params: {
      decimals: 1,
    },
  });
  commit('setCurrentSupply', data);
}
export const actions = {
  async loadSupply(context) {
    await refreshCurrentSupply({
      axios: this.$axios,
      ...context,
    });
  },
};
