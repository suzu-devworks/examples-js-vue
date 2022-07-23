import { createStore } from "vuex";

export default createStore({
  // state : {
  //     globalCount: 0
  // },
  state() {
    return {
      globalCount: 0,
      profile: null,
    };
  },
  getters: {},
  mutations: {
    IncrementGlobal(state) {
      state.globalCount++;
    },
    setGithubProfile(state, payload) {
      state.profile = payload;
    },
  },
  actions: {
    async fetchGithubProfile(store, payload) {
      if (store.state.profile != null) {
        return;
      }

      const response = await fetch(
        `https://api.github.com/users/${payload.user_id}`
      ).then((res) => {
        return res.json();
      });

      store.commit("setGithubProfile", response);
    },
  },
  modules: {},
});
