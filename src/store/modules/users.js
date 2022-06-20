import axios from 'axios';

export default {
  namespaced: true,
  state: {
    user: null,
    foo: 'users-foo',
  },
  mutations: {
    updateCurrentUser(state, user) {
      state.user = user;
    },
    // if we didn't namespace the store, all of the actions will get called
    // addRobotToCart(state, robot) {
    //   console.log('AddRobotToCart in Users was called');
    // },
  },
  getters: {
    // we can get access to the root state by passing it in here
    // foo(state, getters, rootState) {
    //   return `users-getter/${rootState.foo}`;
    // },
    foo(state) {
      return `users-getter/${state.foo}`;
    },
  },
  actions: {
    signIn({ commit }) {
      axios.post('/api/sign-in')
        .then((result) => commit('updateCurrentUser', result.data))
        .catch(console.error);
    },
  },
};
