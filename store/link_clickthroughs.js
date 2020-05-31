/* eslint no-shadow: ["error", { "allow": ["state"] }] */
export const state = () => ({
  entries: null,
  loaded: false,
});

export const getters = {
};

export const mutations = {
  setEntries(state, entries) {
    state.entries = entries;
    state.loaded = true;
  },
};

async function refresh({ axios, commit }) {
  const { data } = await axios.get('/api/data/link_clickthroughs');
  console.log('data', data);
  commit('setEntries', data.entries);
}
export const actions = {
  async load(context) {
    await refresh({
      axios: this.$axios,
      ...context,
    });
  },
};
